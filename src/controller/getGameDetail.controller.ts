import { Request, Response} from "express";
import { getGameDetail } from "../service/getGameDetail.service"

export const getGameDetailControl = async (req: Request) =>{
   const gameId = Number(req.params.game_id);
   try{
      return await getGameDetail(gameId);
   } catch(err){
      throw err;
   }
}
