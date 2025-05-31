import { Request, Response, NextFunction } from 'express';
import {adminAuthAccount} from "../grpc/auth.client";

const adminGuard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwtHeader: string | undefined = req.headers.authorization;

    if (!jwtHeader || !jwtHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
        return;
    }
    try {
        const userId = await adminAuthAccount(jwtHeader);
        req.userId = userId;

        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
        return;
    }
};

export default adminGuard;