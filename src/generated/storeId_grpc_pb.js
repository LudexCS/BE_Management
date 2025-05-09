// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var storeId_pb = require('./storeId_pb.js');

function serialize_storeweb3id_BoolResult(arg) {
  if (!(arg instanceof storeId_pb.BoolResult)) {
    throw new Error('Expected argument of type storeweb3id.BoolResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storeweb3id_BoolResult(buffer_arg) {
  return storeId_pb.BoolResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storeweb3id_storeIdRequest(arg) {
  if (!(arg instanceof storeId_pb.storeIdRequest)) {
    throw new Error('Expected argument of type storeweb3id.storeIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storeweb3id_storeIdRequest(buffer_arg) {
  return storeId_pb.storeIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var StoreIdServiceService = exports.StoreIdServiceService = {
  storeWeb3Id: {
    path: '/storeweb3id.StoreIdService/storeWeb3Id',
    requestStream: false,
    responseStream: false,
    requestType: storeId_pb.storeIdRequest,
    responseType: storeId_pb.BoolResult,
    requestSerialize: serialize_storeweb3id_storeIdRequest,
    requestDeserialize: deserialize_storeweb3id_storeIdRequest,
    responseSerialize: serialize_storeweb3id_BoolResult,
    responseDeserialize: deserialize_storeweb3id_BoolResult,
  },
};

exports.StoreIdServiceClient = grpc.makeGenericClientConstructor(StoreIdServiceService, 'StoreIdService');
