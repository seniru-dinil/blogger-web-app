import api from "@/api/api";
import { URL } from "@/api/api.config";
import Login from "@/model/login.model";

export const login = async (credentials: Login) =>
  await api.post(URL.USERS.LOGIN, credentials);
