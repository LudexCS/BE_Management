// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var downloadCount_pb = require('./downloadCount_pb.js');

function serialize_purchase_IncreaseDownloadCountRequest(arg) {
  if (!(arg instanceof downloadCount_pb.IncreaseDownloadCountRequest)) {
    throw new Error('Expected argument of type purchase.IncreaseDownloadCountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_purchase_IncreaseDownloadCountRequest(buffer_arg) {
  return downloadCount_pb.IncreaseDownloadCountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_purchase_IncreaseDownloadCountResponse(arg) {
  if (!(arg instanceof downloadCount_pb.IncreaseDownloadCountResponse)) {
    throw new Error('Expected argument of type purchase.IncreaseDownloadCountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_purchase_IncreaseDownloadCountResponse(buffer_arg) {
  return downloadCount_pb.IncreaseDownloadCountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_purchase_IncreaseTransactionCountRequest(arg) {
  if (!(arg instanceof downloadCount_pb.IncreaseTransactionCountRequest)) {
    throw new Error('Expected argument of type purchase.IncreaseTransactionCountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_purchase_IncreaseTransactionCountRequest(buffer_arg) {
  return downloadCount_pb.IncreaseTransactionCountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_purchase_IncreaseTransactionCountResponse(arg) {
  if (!(arg instanceof downloadCount_pb.IncreaseTransactionCountResponse)) {
    throw new Error('Expected argument of type purchase.IncreaseTransactionCountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_purchase_IncreaseTransactionCountResponse(buffer_arg) {
  return downloadCount_pb.IncreaseTransactionCountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PurchaseServiceService = exports.PurchaseServiceService = {
  increaseDownloadCount: {
    path: '/purchase.PurchaseService/IncreaseDownloadCount',
    requestStream: false,
    responseStream: false,
    requestType: downloadCount_pb.IncreaseDownloadCountRequest,
    responseType: downloadCount_pb.IncreaseDownloadCountResponse,
    requestSerialize: serialize_purchase_IncreaseDownloadCountRequest,
    requestDeserialize: deserialize_purchase_IncreaseDownloadCountRequest,
    responseSerialize: serialize_purchase_IncreaseDownloadCountResponse,
    responseDeserialize: deserialize_purchase_IncreaseDownloadCountResponse,
  },
  increaseTransactionCount: {
    path: '/purchase.PurchaseService/IncreaseTransactionCount',
    requestStream: false,
    responseStream: false,
    requestType: downloadCount_pb.IncreaseTransactionCountRequest,
    responseType: downloadCount_pb.IncreaseTransactionCountResponse,
    requestSerialize: serialize_purchase_IncreaseTransactionCountRequest,
    requestDeserialize: deserialize_purchase_IncreaseTransactionCountRequest,
    responseSerialize: serialize_purchase_IncreaseTransactionCountResponse,
    responseDeserialize: deserialize_purchase_IncreaseTransactionCountResponse,
  },
};

exports.PurchaseServiceClient = grpc.makeGenericClientConstructor(PurchaseServiceService, 'PurchaseService');
