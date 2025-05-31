import * as grpc from '@grpc/grpc-js';
import { AuthServiceClient } from '../generated/auth_grpc_pb';
import { AuthRequest, EmailRequest } from '../generated/auth_pb';

const SERVICE_NAME = process.env.USERACCOUNT_INNER as string || "default";

const client = new AuthServiceClient(
    SERVICE_NAME,
    grpc.credentials.createInsecure()
);

export const authAccount = (jwt: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const request = new AuthRequest();
        request.setJwt(jwt);

        client.authByJWT(request, (err, res) => {
            if (err) {
                console.error('gRPC Error:', err);
                return reject(err);
            }
            resolve(res.getEmail());
        });
    });
};

export const getUserIdByEmail = (email: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const request = new EmailRequest();
        request.setEmail(email);

        client.getUserIdByEmail(request, (err, res) => {
            if (err) {
                console.error('gRPC Error:', err);
                return reject(err);
            }
            resolve(res.getUserId());
        });
    });
};

export const adminAuthAccount = (jwt: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const request = new AuthRequest();
        request.setJwt(jwt);

        client.adminAuthByJWT(request, (err, res) => {
            if (err) {
                console.error('gRPC Error:', err);
                return reject(err);
            }
            resolve(res.getUserId());
        });
    });
};
