import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.js';

export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const message = `Route ${req.method} ${req.originalUrl} not found`;
  
  logger.warn('404 Not Found:', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  
  res.status(404).json({
    error: 'Not Found',
    message,
    statusCode: 404,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
    suggestions: {
      availableEndpoints: [
        'GET /',
        'GET /health',
        'GET /health/detailed',
        'GET /api',
        'POST /api/autocomplete',
        'POST /api/typescript',
      ],
      documentation: 'Visit / for API information',
    },
  });
}