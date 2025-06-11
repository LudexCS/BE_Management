import * as grpc from '@grpc/grpc-js';
import { IdResponse } from '../generated/management_pb';
import { ValidationServiceService, IValidationServiceServer } from '../generated/management_grpc_pb';
import {incrementDownloadTimes, isGameExist, updateGameFields} from "../repository/game.repository";
import {
    findUserId,
    incrementResourceDownloadTimes,
    isResourceExist,
    updateResourceFields
} from "../repository/resource.repository";
import { BoolResult } from '../generated/storeId_pb';
import {IStoreIdServiceServer, StoreIdServiceService} from "../generated/storeId_grpc_pb";
import {IResourceServiceServer, ResourceServiceService} from "../generated/resource_grpc_pb";
import {userIdResponse} from "../generated/resource_pb";
import {IPurchaseServiceServer, PurchaseServiceService} from "../generated/downloadCount_grpc_pb";
import {IncreaseDownloadCountResponse, IncreaseTransactionCountResponse} from "../generated/downloadCount_pb";

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
            const itemId = call.request.getItemid();
            const sharerIds = call.request.getShareridsList();
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

const resourceServiceImpl: IResourceServiceServer = {
    getUserIdByResource: async (call, callback) => {
        const resourceId = call.request.getResourceid();
        console.log(`Getting user ID by resource ID: ${resourceId}`);

        try {
            const userId = await findUserId(resourceId);
            const response = new userIdResponse();
            response.setUserid(userId);
            callback(null, response);
        } catch (error) {
            console.error("Failed to get user ID by resource ID:", error);
            callback({
                code: grpc.status.NOT_FOUND,
                message: error instanceof Error ? error.message : String(error),
            }, null);
        }
    }
};

const purchaseServiceImpl: IPurchaseServiceServer = {
    increaseDownloadCount: async (call, callback) => {
        const gameId = call.request.getGameid();
        console.log(`Increasing download count - gameId: ${gameId}`);

        try {
            const response = new IncreaseDownloadCountResponse();
            await incrementDownloadTimes(gameId);
            response.setSuccess(true);
            callback(null, response);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to increase download count:", error.message);
            }
            else {
                console.error("Failed to increase download count: Unknown Error");
            }
            callback({
                code: grpc.status.INTERNAL,
                message: "Failed to increase download count.",
            }, null);
        }
    },
    increaseTransactionCount: async (call, callback) => {
        const resourceId = call.request.getResourceid();
        console.log(`Increasing transaction count - resourceId: ${resourceId}`);

        try {
            const response = new IncreaseTransactionCountResponse();
            await incrementResourceDownloadTimes(resourceId);
            response.setSuccess(true);
            callback(null, response);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to increase transaction count:", error.message);
            }
            else {
                console.error("Failed to increase transaction count: Unknown Error");
            }
            callback({
                code: grpc.status.INTERNAL,
                message: "Failed to increase transaction count.",
            }, null);
        }
    }
};

export async function startGrpcServer() {
    const server = new grpc.Server();

    server.addService(ValidationServiceService, validationServiceImpl);
    server.addService(StoreIdServiceService, storeIdServiceImpl);
    server.addService(ResourceServiceService, resourceServiceImpl);
    server.addService(PurchaseServiceService, purchaseServiceImpl);

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