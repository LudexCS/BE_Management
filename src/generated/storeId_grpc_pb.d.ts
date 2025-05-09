// package: storeweb3id
// file: storeId.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as storeId_pb from "./storeId_pb";

interface IStoreIdServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    storeWeb3Id: IStoreIdServiceService_IstoreWeb3Id;
}

interface IStoreIdServiceService_IstoreWeb3Id extends grpc.MethodDefinition<storeId_pb.storeIdRequest, storeId_pb.BoolResult> {
    path: "/storeweb3id.StoreIdService/storeWeb3Id";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storeId_pb.storeIdRequest>;
    requestDeserialize: grpc.deserialize<storeId_pb.storeIdRequest>;
    responseSerialize: grpc.serialize<storeId_pb.BoolResult>;
    responseDeserialize: grpc.deserialize<storeId_pb.BoolResult>;
}

export const StoreIdServiceService: IStoreIdServiceService;

export interface IStoreIdServiceServer extends grpc.UntypedServiceImplementation {
    storeWeb3Id: grpc.handleUnaryCall<storeId_pb.storeIdRequest, storeId_pb.BoolResult>;
}

export interface IStoreIdServiceClient {
    storeWeb3Id(request: storeId_pb.storeIdRequest, callback: (error: grpc.ServiceError | null, response: storeId_pb.BoolResult) => void): grpc.ClientUnaryCall;
    storeWeb3Id(request: storeId_pb.storeIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storeId_pb.BoolResult) => void): grpc.ClientUnaryCall;
    storeWeb3Id(request: storeId_pb.storeIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storeId_pb.BoolResult) => void): grpc.ClientUnaryCall;
}

export class StoreIdServiceClient extends grpc.Client implements IStoreIdServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public storeWeb3Id(request: storeId_pb.storeIdRequest, callback: (error: grpc.ServiceError | null, response: storeId_pb.BoolResult) => void): grpc.ClientUnaryCall;
    public storeWeb3Id(request: storeId_pb.storeIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storeId_pb.BoolResult) => void): grpc.ClientUnaryCall;
    public storeWeb3Id(request: storeId_pb.storeIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storeId_pb.BoolResult) => void): grpc.ClientUnaryCall;
}
