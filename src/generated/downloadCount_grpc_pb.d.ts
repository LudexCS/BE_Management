// package: purchase
// file: downloadCount.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as downloadCount_pb from "./downloadCount_pb";

interface IPurchaseServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    increaseDownloadCount: IPurchaseServiceService_IIncreaseDownloadCount;
    increaseTransactionCount: IPurchaseServiceService_IIncreaseTransactionCount;
}

interface IPurchaseServiceService_IIncreaseDownloadCount extends grpc.MethodDefinition<downloadCount_pb.IncreaseDownloadCountRequest, downloadCount_pb.IncreaseDownloadCountResponse> {
    path: "/purchase.PurchaseService/IncreaseDownloadCount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<downloadCount_pb.IncreaseDownloadCountRequest>;
    requestDeserialize: grpc.deserialize<downloadCount_pb.IncreaseDownloadCountRequest>;
    responseSerialize: grpc.serialize<downloadCount_pb.IncreaseDownloadCountResponse>;
    responseDeserialize: grpc.deserialize<downloadCount_pb.IncreaseDownloadCountResponse>;
}
interface IPurchaseServiceService_IIncreaseTransactionCount extends grpc.MethodDefinition<downloadCount_pb.IncreaseTransactionCountRequest, downloadCount_pb.IncreaseTransactionCountResponse> {
    path: "/purchase.PurchaseService/IncreaseTransactionCount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<downloadCount_pb.IncreaseTransactionCountRequest>;
    requestDeserialize: grpc.deserialize<downloadCount_pb.IncreaseTransactionCountRequest>;
    responseSerialize: grpc.serialize<downloadCount_pb.IncreaseTransactionCountResponse>;
    responseDeserialize: grpc.deserialize<downloadCount_pb.IncreaseTransactionCountResponse>;
}

export const PurchaseServiceService: IPurchaseServiceService;

export interface IPurchaseServiceServer extends grpc.UntypedServiceImplementation {
    increaseDownloadCount: grpc.handleUnaryCall<downloadCount_pb.IncreaseDownloadCountRequest, downloadCount_pb.IncreaseDownloadCountResponse>;
    increaseTransactionCount: grpc.handleUnaryCall<downloadCount_pb.IncreaseTransactionCountRequest, downloadCount_pb.IncreaseTransactionCountResponse>;
}

export interface IPurchaseServiceClient {
    increaseDownloadCount(request: downloadCount_pb.IncreaseDownloadCountRequest, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseDownloadCountResponse) => void): grpc.ClientUnaryCall;
    increaseDownloadCount(request: downloadCount_pb.IncreaseDownloadCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseDownloadCountResponse) => void): grpc.ClientUnaryCall;
    increaseDownloadCount(request: downloadCount_pb.IncreaseDownloadCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseDownloadCountResponse) => void): grpc.ClientUnaryCall;
    increaseTransactionCount(request: downloadCount_pb.IncreaseTransactionCountRequest, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseTransactionCountResponse) => void): grpc.ClientUnaryCall;
    increaseTransactionCount(request: downloadCount_pb.IncreaseTransactionCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseTransactionCountResponse) => void): grpc.ClientUnaryCall;
    increaseTransactionCount(request: downloadCount_pb.IncreaseTransactionCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseTransactionCountResponse) => void): grpc.ClientUnaryCall;
}

export class PurchaseServiceClient extends grpc.Client implements IPurchaseServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public increaseDownloadCount(request: downloadCount_pb.IncreaseDownloadCountRequest, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseDownloadCountResponse) => void): grpc.ClientUnaryCall;
    public increaseDownloadCount(request: downloadCount_pb.IncreaseDownloadCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseDownloadCountResponse) => void): grpc.ClientUnaryCall;
    public increaseDownloadCount(request: downloadCount_pb.IncreaseDownloadCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseDownloadCountResponse) => void): grpc.ClientUnaryCall;
    public increaseTransactionCount(request: downloadCount_pb.IncreaseTransactionCountRequest, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseTransactionCountResponse) => void): grpc.ClientUnaryCall;
    public increaseTransactionCount(request: downloadCount_pb.IncreaseTransactionCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseTransactionCountResponse) => void): grpc.ClientUnaryCall;
    public increaseTransactionCount(request: downloadCount_pb.IncreaseTransactionCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: downloadCount_pb.IncreaseTransactionCountResponse) => void): grpc.ClientUnaryCall;
}
