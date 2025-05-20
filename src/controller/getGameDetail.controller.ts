import { getGameDetail } from "../service/getGameDetail.service"

export const getGameDetailControl = async (gameId: number) =>{
   return await getGameDetail(gameId);
}
