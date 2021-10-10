import { AxiosResponse } from "axios";
import Creds from "../../common/Creds";

export interface ManagerClient {
  signIn(
    creds: Creds,
    organization: string,
    role: string
  ): Promise<AxiosResponse<any>>;
}
