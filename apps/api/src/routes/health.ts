import os from 'os';

import express, { Router } from 'express';

import { logger } from '../utils/logger';

const router: express.Router = Router();

// Health check endpoint
router.get('/', (_req, res) => {
  const startTime = Date.now();
  
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
      },
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      features: {
        traditionalAutocomplete: true,
        aiAssistance: false,
        typescriptLsp: true,
        eslintSupport: true,
      },
      responseTime: Date.now() - startTime,
    };

    logger.info('Health check completed successfully');
    res.status(200).json(healthData);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    });
  }
});

// Detailed health check with dependencies
router.get('/detailed', (_req, res) => {
  const startTime = Date.now();
  
  try {
    const detailedHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      system: {
        uptime: process.uptime(),
        loadavg: os.loadavg(),
        totalmem: Math.round(os.totalmem() / 1024 / 1024),
        freemem: Math.round(os.freemem() / 1024 / 1024),
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        pid: process.pid,
      },
      memory: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
        arrayBuffers: Math.round(process.memoryUsage().arrayBuffers / 1024 / 1024),
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: process.env.PORT || '3001',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      features: {
        traditionalAutocomplete: {
          enabled: true,
          description: 'TypeScript language server autocomplete',
        },
        aiAssistance: {
          enabled: false,
          description: 'Explicitly disabled - traditional development only',
        },
        development: {
          typescript: true,
          eslint: true,
          prettier: true,
          vitest: true,
        },
      },
      responseTime: Date.now() - startTime,
    };

    logger.info('Detailed health check completed successfully');
    res.status(200).json(detailedHealth);
  } catch (error) {
    logger.error('Detailed health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Detailed health check failed',
      responseTime: Date.now() - startTime,
    });
  }
});

export { router as healthRouter };
