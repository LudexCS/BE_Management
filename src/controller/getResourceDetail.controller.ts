import {getResourceDetail} from "../service/getResourceDetail.service";

export const getResourceDetailControl = async (gameId: number) => {
    try{
        return await getResourceDetail(gameId);
    }catch(error){
        throw error;
    }
}