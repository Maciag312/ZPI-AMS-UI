import { AxiosResponse } from "axios";
import Client from "../../common/Client";

export interface ClientClient {
  add(
    client: Client
  ): Promise<AxiosResponse<any>>;
}
