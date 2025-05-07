// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var management_pb = require('./management_pb.js');

function serialize_management_IdRequest(arg) {
  if (!(arg instanceof management_pb.IdRequest)) {
    throw new Error('Expected argument of type management.IdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_management_IdRequest(buffer_arg) {
  return management_pb.IdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_management_IdResponse(arg) {
  if (!(arg instanceof management_pb.IdResponse)) {
    throw new Error('Expected argument of type management.IdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_management_IdResponse(buffer_arg) {
  return management_pb.IdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ValidationServiceService = exports.ValidationServiceService = {
  isValidGameId: {
    path: '/management.ValidationService/IsValidGameId',
    requestStream: false,
    responseStream: false,
    requestType: management_pb.IdRequest,
    responseType: management_pb.IdResponse,
    requestSerialize: serialize_management_IdRequest,
    requestDeserialize: deserialize_management_IdRequest,
    responseSerialize: serialize_management_IdResponse,
    responseDeserialize: deserialize_management_IdResponse,
  },
  isValidResourceId: {
    path: '/management.ValidationService/IsValidResourceId',
    requestStream: false,
    responseStream: false,
    requestType: management_pb.IdRequest,
    responseType: management_pb.IdResponse,
    requestSerialize: serialize_management_IdRequest,
    requestDeserialize: deserialize_management_IdRequest,
    responseSerialize: serialize_management_IdResponse,
    responseDeserialize: deserialize_management_IdResponse,
  },
};

exports.ValidationServiceClient = grpc.makeGenericClientConstructor(ValidationServiceService, 'ValidationService');
