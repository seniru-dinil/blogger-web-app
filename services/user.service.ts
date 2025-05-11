import api from "@/api/api";
import { URL } from "@/api/api.config";
import User from "@/model/user.model";

export const createUser = (user: User) =>
  api.post(URL.USERS.CREATE_USER, {
    ...user,
    roles: ["ROLE_VISITOR", "ROLE_PUBLISHER"],
  });
