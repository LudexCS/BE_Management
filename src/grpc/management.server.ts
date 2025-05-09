import * as grpc from '@grpc/grpc-js';
import { IdResponse } from '../generated/management_pb';
import { ValidationServiceService, IValidationServiceServer } from '../generated/management_grpc_pb';
import {isGameExist, updateGameFields} from "../repository/game.repository";
import {isResourceExist, updateResourceFields} from "../repository/resource.repository";
import { BoolResult } from '../generated/storeId_pb';
import {IStoreIdServiceServer, StoreIdServiceService} from "../generated/storeId_grpc_pb";

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

const storeIdServiceImpl: IStoreIdServiceServer = {
    storeWeb3Id: async (call, callback) => {
        const result = new BoolResult();
        try {
            const gameId = call.request.getGameid();
            const itemId = BigInt(call.request.getItemid());
            const sharerIds = call.request.getShareridsList().map(id => BigInt(id));
            const sharerId = sharerIds[0];
            console.log(`Storing Web3 ID - gameId: ${gameId}, itemId: ${itemId}, sharerId: ${sharerId}`);

            await updateGameFields(gameId, { itemId });
            await updateResourceFields(gameId, { sharerId });

            result.setSuccess(true);
            callback(null, result);
        } catch (error) {
            console.error("Failed to store Web3 ID:", error);
            result.setSuccess(false);
            callback(null, result);
        }
    }
};

export async function startGrpcServer() {
    const server = new grpc.Server();

    server.addService(ValidationServiceService, validationServiceImpl);
    server.addService(StoreIdServiceService, storeIdServiceImpl);

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