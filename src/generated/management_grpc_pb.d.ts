// package: management
// file: management.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as management_pb from "./management_pb";

interface IValidationServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    isValidGameId: IValidationServiceService_IIsValidGameId;
    isValidResourceId: IValidationServiceService_IIsValidResourceId;
}

interface IValidationServiceService_IIsValidGameId extends grpc.MethodDefinition<management_pb.IdRequest, management_pb.IdResponse> {
    path: "/management.ValidationService/IsValidGameId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<management_pb.IdRequest>;
    requestDeserialize: grpc.deserialize<management_pb.IdRequest>;
    responseSerialize: grpc.serialize<management_pb.IdResponse>;
    responseDeserialize: grpc.deserialize<management_pb.IdResponse>;
}
interface IValidationServiceService_IIsValidResourceId extends grpc.MethodDefinition<management_pb.IdRequest, management_pb.IdResponse> {
    path: "/management.ValidationService/IsValidResourceId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<management_pb.IdRequest>;
    requestDeserialize: grpc.deserialize<management_pb.IdRequest>;
    responseSerialize: grpc.serialize<management_pb.IdResponse>;
    responseDeserialize: grpc.deserialize<management_pb.IdResponse>;
}

export const ValidationServiceService: IValidationServiceService;

export interface IValidationServiceServer extends grpc.UntypedServiceImplementation {
    isValidGameId: grpc.handleUnaryCall<management_pb.IdRequest, management_pb.IdResponse>;
    isValidResourceId: grpc.handleUnaryCall<management_pb.IdRequest, management_pb.IdResponse>;
}

export interface IValidationServiceClient {
    isValidGameId(request: management_pb.IdRequest, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    isValidGameId(request: management_pb.IdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    isValidGameId(request: management_pb.IdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    isValidResourceId(request: management_pb.IdRequest, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    isValidResourceId(request: management_pb.IdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    isValidResourceId(request: management_pb.IdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
}

export class ValidationServiceClient extends grpc.Client implements IValidationServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public isValidGameId(request: management_pb.IdRequest, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    public isValidGameId(request: management_pb.IdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    public isValidGameId(request: management_pb.IdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    public isValidResourceId(request: management_pb.IdRequest, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    public isValidResourceId(request: management_pb.IdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
    public isValidResourceId(request: management_pb.IdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: management_pb.IdResponse) => void): grpc.ClientUnaryCall;
}
