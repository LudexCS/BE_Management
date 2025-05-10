import { Request, Response} from "express";
import { getGameDetail } from "../service/getGameDetail.service"

export const getGameDetailControl = async (gameId: number) =>{
   try{
      return await getGameDetail(gameId);
   } catch(err){
      throw err;
   }
}
