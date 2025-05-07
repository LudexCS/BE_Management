import * as grpc from '@grpc/grpc-js';
import { IdResponse } from '../generated/management_pb';
import { ValidationServiceService, IValidationServiceServer } from '../generated/management_grpc_pb';
import {isGameExist} from "../repository/game.repository";
import {isResourceExist} from "../repository/resource.repository";

const validationServiceImpl: IValidationServiceServer = {
    isValidGameId: async (call, callback) => {
        const id = call.request.getId();
        console.log(`Validating game ID: ${id}`);

        const response = new IdResponse();
        response.setIsvalid(await isGameExist(id));
        callback(null, response);
    },
    isValidResourceId: async (call, callback) => {
        const id = call.request.getId();
        console.log(`Validating resource ID: ${id}`);

        const response = new IdResponse();
        response.setIsvalid(await isResourceExist(id));
        callback(null, response);
    }
};

export async function startGrpcServer() {
    const server = new grpc.Server();

    server.addService(ValidationServiceService, validationServiceImpl);

    await new Promise<void>((resolve, reject) => {
        server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                return reject(err);
            }
            console.log(`gRPC Service running on port ${port}`);
            resolve();
        });
    });
}