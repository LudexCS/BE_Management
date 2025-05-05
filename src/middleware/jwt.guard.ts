declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import {authAccount} from "../grpc/auth.client";

const jwtGuard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwtHeader: string | undefined = req.headers.authorization;

    if (!jwtHeader || !jwtHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
        return;
    }
    try {
        const email = await authAccount(jwtHeader);
        req.user = email;

        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
        return;
    }
};

export default jwtGuard;