// package: purchase
// file: downloadCount.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class IncreaseDownloadCountRequest extends jspb.Message { 
    getGameid(): number;
    setGameid(value: number): IncreaseDownloadCountRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IncreaseDownloadCountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: IncreaseDownloadCountRequest): IncreaseDownloadCountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IncreaseDownloadCountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IncreaseDownloadCountRequest;
    static deserializeBinaryFromReader(message: IncreaseDownloadCountRequest, reader: jspb.BinaryReader): IncreaseDownloadCountRequest;
}

export namespace IncreaseDownloadCountRequest {
    export type AsObject = {
        gameid: number,
    }
}

export class IncreaseDownloadCountResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): IncreaseDownloadCountResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IncreaseDownloadCountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: IncreaseDownloadCountResponse): IncreaseDownloadCountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IncreaseDownloadCountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IncreaseDownloadCountResponse;
    static deserializeBinaryFromReader(message: IncreaseDownloadCountResponse, reader: jspb.BinaryReader): IncreaseDownloadCountResponse;
}

export namespace IncreaseDownloadCountResponse {
    export type AsObject = {
        success: boolean,
    }
}
