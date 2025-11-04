import type { Request, Response } from "express";
import { asyncHandler } from "../utils/handler.utils.js";
import { ApiResponse } from "../utils/response.utils.js";


export const testController = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    return ApiResponse(res, 200, true, "Test controller is working fine!", null);
});