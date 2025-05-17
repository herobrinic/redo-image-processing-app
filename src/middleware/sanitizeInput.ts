import { Request, Response, NextFunction } from 'express';
import sanitize from 'sanitize-html';

export function sanitizeQueryParams(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  for (const key in req.query) {
    const value = req.query[key];
    if (typeof value === 'string') {
      req.query[key] = sanitize(value, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  }
  next();
}
