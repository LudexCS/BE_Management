// package: management
// file: management.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class IdRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): IdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: IdRequest): IdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IdRequest;
    static deserializeBinaryFromReader(message: IdRequest, reader: jspb.BinaryReader): IdRequest;
}

export namespace IdRequest {
    export type AsObject = {
        id: number,
    }
}

export class IdResponse extends jspb.Message { 
    getIsvalid(): boolean;
    setIsvalid(value: boolean): IdResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IdResponse.AsObject;
    static toObject(includeInstance: boolean, msg: IdResponse): IdResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IdResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IdResponse;
    static deserializeBinaryFromReader(message: IdResponse, reader: jspb.BinaryReader): IdResponse;
}

export namespace IdResponse {
    export type AsObject = {
        isvalid: boolean,
    }
}
