import {getResourceDetail} from "../service/getResourceDetail.service";

export const getResourceDetailControl = async (gameId: number) => {
    return await getResourceDetail(gameId);
}