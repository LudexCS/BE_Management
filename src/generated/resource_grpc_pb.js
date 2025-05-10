// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var resource_pb = require('./resource_pb.js');

function serialize_ResourceInfo_resourceRequest(arg) {
  if (!(arg instanceof resource_pb.resourceRequest)) {
    throw new Error('Expected argument of type ResourceInfo.resourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ResourceInfo_resourceRequest(buffer_arg) {
  return resource_pb.resourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ResourceInfo_userIdResponse(arg) {
  if (!(arg instanceof resource_pb.userIdResponse)) {
    throw new Error('Expected argument of type ResourceInfo.userIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ResourceInfo_userIdResponse(buffer_arg) {
  return resource_pb.userIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ResourceServiceService = exports.ResourceServiceService = {
  getUserIdByResource: {
    path: '/ResourceInfo.ResourceService/getUserIdByResource',
    requestStream: false,
    responseStream: false,
    requestType: resource_pb.resourceRequest,
    responseType: resource_pb.userIdResponse,
    requestSerialize: serialize_ResourceInfo_resourceRequest,
    requestDeserialize: deserialize_ResourceInfo_resourceRequest,
    responseSerialize: serialize_ResourceInfo_userIdResponse,
    responseDeserialize: deserialize_ResourceInfo_userIdResponse,
  },
};

exports.ResourceServiceClient = grpc.makeGenericClientConstructor(ResourceServiceService, 'ResourceService');
