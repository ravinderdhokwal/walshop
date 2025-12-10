import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

/* ---------------------------
   Interfaces & Enums
--------------------------- */

export interface IAddress {
    label?: string;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    isDefault?: boolean;
}

export enum UserRole {
    CUSTOMER = "customer",
    ADMIN = "admin",
    SELLER = "seller"
}

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string | null;
    role: UserRole;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    addresses: IAddress[];
    wishList: mongoose.Types.ObjectId[];
    cart?: mongoose.Types.ObjectId[] | null;
    lastLogin?: Date | null;
    status: UserStatus;
    isDeleted?: boolean;
    createdAt: Date;
    updatedAt: Date;

    validatePassword(password: string): Promise<boolean>;
}

const addressSchema: Schema = new Schema<IAddress>({
    label: {
        type: String,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    zipCode: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
});

const userSchema: Schema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        phone: {
            type: String,
            trim: true,
            default: null
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        isPhoneVerified: {
            type: Boolean,
            default: false
        },
        addresses: {
            type: [addressSchema],
            default: []
        },
        wishList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PRODUCT"
        }],
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PRODUCT",
            default: null
        }],
        lastLogin: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.ACTIVE
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    
    { timestamps: true }
);

/* ---------------------------
   Indexes & performance
   --------------------------- */

// compound index example (email + status) — tweak as needed
userSchema.index({ email: 1, status: 1 });

/* ---------------------------
   Middleware & methods
   --------------------------- */

/**
 * Hash password before save if modified.
 * Using pre('save') so modifications via .save() are captured.
 */

userSchema.pre<IUser>("save", async function (next): Promise<void> {
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            next();
        } catch (error) {
            next(error as Error);
        }
    }
});

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export const USER: Model<IUser> = (mongoose.models.USER as Model<IUser>) || mongoose.model<IUser>("USER", userSchema);
