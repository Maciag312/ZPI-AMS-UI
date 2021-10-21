import { API } from "../../Routes";

class URICreator {
  addClient(host: string): string {
    return host + API.ADD_CLIENT
  }
  signInURI = (host: string) => {
    return host + API.MANAGER_SIGN_IN();
  };
}

export default new URICreator();
