import axios from "../config/axios";
import { IGetDataAuthUser, ILoginInput, IRegisterInput } from "../data-type/auth";

class Auth {
  constructor() {}

  register(body: IRegisterInput) {
    return axios.post("/auth/register/", body);
  }

  login(body: ILoginInput) {
    return axios.post("/auth/login/", body);
  }

  getAuthUser(): Promise<IGetDataAuthUser> {
    return axios.get("/auth/get-me/");
  }
}

const authApi = new Auth();

export default authApi;
