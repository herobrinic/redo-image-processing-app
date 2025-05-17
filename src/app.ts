import express from 'express';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder publicly
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount API routes with `/api` prefix
app.use('/api/upload', uploadRoutes);

// Serve your frontend (adjust path if needed)
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all for frontend routes (optional)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
