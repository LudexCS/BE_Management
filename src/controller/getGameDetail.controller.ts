import { Request, Response} from "express";
import { getGameDetail } from "../service/getGameDetail.service"

export const getGameDetailControl = async (req: Request) =>{
   try{
      const { gameId } = req.body;
      return await getGameDetail(gameId);
   } catch(err){
      throw err;
   }
}
