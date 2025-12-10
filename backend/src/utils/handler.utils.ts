import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler =
    <T extends RequestHandler>(handler: T): RequestHandler =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.error("Unhandled Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
  };
