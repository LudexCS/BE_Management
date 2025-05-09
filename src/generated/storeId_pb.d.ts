// package: storeweb3id
// file: storeId.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class storeIdRequest extends jspb.Message { 
    getGameid(): number;
    setGameid(value: number): storeIdRequest;
    getItemid(): string;
    setItemid(value: string): storeIdRequest;
    clearShareridsList(): void;
    getShareridsList(): Array<string>;
    setShareridsList(value: Array<string>): storeIdRequest;
    addSharerids(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): storeIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: storeIdRequest): storeIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: storeIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): storeIdRequest;
    static deserializeBinaryFromReader(message: storeIdRequest, reader: jspb.BinaryReader): storeIdRequest;
}

export namespace storeIdRequest {
    export type AsObject = {
        gameid: number,
        itemid: string,
        shareridsList: Array<string>,
    }
}

export class BoolResult extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): BoolResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BoolResult.AsObject;
    static toObject(includeInstance: boolean, msg: BoolResult): BoolResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BoolResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BoolResult;
    static deserializeBinaryFromReader(message: BoolResult, reader: jspb.BinaryReader): BoolResult;
}

export namespace BoolResult {
    export type AsObject = {
        success: boolean,
    }
}
