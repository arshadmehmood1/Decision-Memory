import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
    statusCode?: number;
    code?: string;
}

export function errorHandler(
    err: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    // Log detailed error for debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        code: err.code,
        statusCode: err.statusCode
    });

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let code = err.code || 'INTERNAL_ERROR';

    // Handle Prisma specific errors
    // @ts-ignore - PrismaClientKnownRequestError checking without importing the full class to keep middleware lightweight
    if (err.code === 'P2002') {
        statusCode = 409;
        message = 'A record with this identifier already exists.';
        code = 'CONFLICT';
    } else if (err.code === 'P2025') {
        statusCode = 404;
        message = 'Record not found.';
        code = 'NOT_FOUND';
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            code,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
}

export function createError(message: string, statusCode: number, code?: string): ApiError {
    const error: ApiError = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    return error;
}

export function notFound(message = 'Resource not found'): ApiError {
    return createError(message, 404, 'NOT_FOUND');
}

export function badRequest(message = 'Bad request'): ApiError {
    return createError(message, 400, 'BAD_REQUEST');
}

export function paymentRequired(message = 'Payment Required'): ApiError {
    return createError(message, 402, 'PAYMENT_REQUIRED');
}

export function unauthorized(message = 'Unauthorized'): ApiError {
    return createError(message, 401, 'UNAUTHORIZED');
}

export function forbidden(message = 'Forbidden'): ApiError {
    return createError(message, 403, 'FORBIDDEN');
}
