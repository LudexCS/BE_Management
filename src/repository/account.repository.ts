import AppDataSource from "../config/mysql.config";
import { Account } from "../entity/account.entity"
import { Repository } from "typeorm";

const accountRepo: Repository<Account> = AppDataSource.getRepository(Account);

export const findUserIdByEmail = async(email: string) =>{
    const account =  await accountRepo.findOne({ where: { email } });
    if (!account) throw new Error(`No account found for email: ${email}`);
    return await account;
}