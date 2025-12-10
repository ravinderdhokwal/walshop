import { Response } from "express";

interface ApiResponseBody<T> {
  success: boolean;
  message: string;
  data?: T | null;
}

export const ApiResponse = <T>(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: T | null
    ): Response<ApiResponseBody<T>> => {
        return res.status(statusCode).json({
            success,
            message,
            data: data ?? null,
    });
};
