// package: ResourceInfo
// file: resource.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class resourceRequest extends jspb.Message { 
    getResourceid(): number;
    setResourceid(value: number): resourceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): resourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: resourceRequest): resourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: resourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): resourceRequest;
    static deserializeBinaryFromReader(message: resourceRequest, reader: jspb.BinaryReader): resourceRequest;
}

export namespace resourceRequest {
    export type AsObject = {
        resourceid: number,
    }
}

export class userIdResponse extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): userIdResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): userIdResponse.AsObject;
    static toObject(includeInstance: boolean, msg: userIdResponse): userIdResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: userIdResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): userIdResponse;
    static deserializeBinaryFromReader(message: userIdResponse, reader: jspb.BinaryReader): userIdResponse;
}

export namespace userIdResponse {
    export type AsObject = {
        userid: number,
    }
}
