import request from 'supertest';
import express from 'express';
import imageRoutes from '../src/routes/imageRoutes';

const app = express();
app.use('/images', imageRoutes);

describe('Image Routes', () => {
  it('should return 400 if required query params are missing', async () => {
    const response = await request(app).get('/images/resize');
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/Missing required parameters/i);
  });

  // Add more tests here...
});
