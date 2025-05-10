// package: ResourceInfo
// file: resource.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as resource_pb from "./resource_pb";

interface IResourceServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUserIdByResource: IResourceServiceService_IgetUserIdByResource;
}

interface IResourceServiceService_IgetUserIdByResource extends grpc.MethodDefinition<resource_pb.resourceRequest, resource_pb.userIdResponse> {
    path: "/ResourceInfo.ResourceService/getUserIdByResource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<resource_pb.resourceRequest>;
    requestDeserialize: grpc.deserialize<resource_pb.resourceRequest>;
    responseSerialize: grpc.serialize<resource_pb.userIdResponse>;
    responseDeserialize: grpc.deserialize<resource_pb.userIdResponse>;
}

export const ResourceServiceService: IResourceServiceService;

export interface IResourceServiceServer extends grpc.UntypedServiceImplementation {
    getUserIdByResource: grpc.handleUnaryCall<resource_pb.resourceRequest, resource_pb.userIdResponse>;
}

export interface IResourceServiceClient {
    getUserIdByResource(request: resource_pb.resourceRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.userIdResponse) => void): grpc.ClientUnaryCall;
    getUserIdByResource(request: resource_pb.resourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.userIdResponse) => void): grpc.ClientUnaryCall;
    getUserIdByResource(request: resource_pb.resourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.userIdResponse) => void): grpc.ClientUnaryCall;
}

export class ResourceServiceClient extends grpc.Client implements IResourceServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getUserIdByResource(request: resource_pb.resourceRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.userIdResponse) => void): grpc.ClientUnaryCall;
    public getUserIdByResource(request: resource_pb.resourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.userIdResponse) => void): grpc.ClientUnaryCall;
    public getUserIdByResource(request: resource_pb.resourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.userIdResponse) => void): grpc.ClientUnaryCall;
}
