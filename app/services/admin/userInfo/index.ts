import type * as rrn from "react-router";

import { joseJwt } from "@/libs/jose";
import { userDAL } from "@/dals/system/UserDAL";
import { userPermsDAL } from "@/dals/system/UserPermsDAL";

class UserInfoService {
  /**
   * 获取用户信息
   * @param args
   * @returns
   */
  async getUserInfo(args: rrn.LoaderFunctionArgs) {
    const { userId } = await joseJwt.getTokenUserIdByArgs(args);
    if (!userId) {
      return null;
    }
    const menu = await userPermsDAL.getFlatMenuByUserId(userId!);
    const userInfo = await userDAL.getById(userId!);

    const result = {
      menu,
      userInfo,
    };
    return result;
  }
}

export const userInfoService = new UserInfoService();
