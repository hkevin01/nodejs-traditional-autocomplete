import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger.js';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements ApiError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Ensure the name of this error is the same as the class name
    Object.setPrototypeOf(this, CustomError.prototype);
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  error: Error | ApiError | ZodError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Default error values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: any[] = [];
  
  // Handle different error types
  if (error instanceof ZodError) {
    // Validation errors
    statusCode = 400;
    message = 'Validation Error';
    errors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));
    logger.warn('Validation error:', { errors, url: req.url, method: req.method });
  } else if (error instanceof CustomError || (error as ApiError).statusCode) {
    // Custom API errors
    statusCode = (error as ApiError).statusCode || 500;
    message = error.message;
    
    if (statusCode >= 500) {
      logger.error('Server error:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });
    } else {
      logger.warn('Client error:', {
        message: error.message,
        url: req.url,
        method: req.method,
        statusCode,
      });
    }
  } else {
    // Unknown errors
    logger.error('Unexpected error:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  }
  
  // Prepare error response
  const errorResponse: any = {
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method,
  };
  
  // Add validation errors if present
  if (errors.length > 0) {
    errorResponse.details = errors;
  }
  
  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = error.stack;
  }
  
  // Add request ID if available
  if (req.headers['x-request-id']) {
    errorResponse.requestId = req.headers['x-request-id'];
  }
  
  res.status(statusCode).json(errorResponse);
}

// Async error handler wrapper
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Create specific error types
export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}

export class TooManyRequestsError extends CustomError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}