import express from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import { healthRouter } from '../../apps/api/src/routes/health.js';

describe('Health Check API', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/health', healthRouter);
  });

  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        memory: expect.objectContaining({
          used: expect.any(Number),
          total: expect.any(Number),
          external: expect.any(Number),
        }),
        environment: expect.any(String),
        nodeVersion: expect.any(String),
        features: expect.objectContaining({
          traditionalAutocomplete: true,
          aiAssistance: false,
          typescriptLsp: true,
          eslintSupport: true,
        }),
        responseTime: expect.any(Number),
      });
    });

    it('should have correct feature flags', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.features.traditionalAutocomplete).toBe(true);
      expect(response.body.features.aiAssistance).toBe(false);
    });
  });

  describe('GET /health/detailed', () => {
    it('should return detailed health information', async () => {
      const response = await request(app)
        .get('/health/detailed')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
        system: expect.objectContaining({
          uptime: expect.any(Number),
          platform: expect.any(String),
          arch: expect.any(String),
          nodeVersion: expect.any(String),
          pid: expect.any(Number),
        }),
        memory: expect.objectContaining({
          rss: expect.any(Number),
          heapTotal: expect.any(Number),
          heapUsed: expect.any(Number),
          external: expect.any(Number),
        }),
        environment: expect.objectContaining({
          nodeEnv: expect.any(String),
          port: expect.any(String),
          timezone: expect.any(String),
        }),
        features: expect.objectContaining({
          traditionalAutocomplete: expect.objectContaining({
            enabled: true,
            description: expect.any(String),
          }),
          aiAssistance: expect.objectContaining({
            enabled: false,
            description: expect.stringContaining('disabled'),
          }),
          development: expect.objectContaining({
            typescript: true,
            eslint: true,
            prettier: true,
            vitest: true,
          }),
        }),
        responseTime: expect.any(Number),
      });
    });

    it('should explicitly disable AI assistance', async () => {
      const response = await request(app)
        .get('/health/detailed')
        .expect(200);

      expect(response.body.features.aiAssistance.enabled).toBe(false);
      expect(response.body.features.aiAssistance.description)
        .toContain('traditional development only');
    });
  });
});