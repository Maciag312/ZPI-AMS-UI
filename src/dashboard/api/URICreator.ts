import { API } from "../../Routes";
import { host } from "./AuthorizationServerConfig";

class URICreator {
  private host = host
  addClient(): string {
    return this.host + API.ADD_CLIENT()
  }
  signInURI = () => {
    return this.host + API.MANAGER_SIGN_IN()
  };

  fetchClientsURI = () => {
    return this.host + API.FETCH_CLIENTS();
  }

  removeClient = (id: string) => {
    return this.host + API.REMOVE_CLIENT(id);

  }
  removeURIFromClient = (id: string) => {
    return this.host + API.REMOVE_URI_FROM_CLIENT(id)
  }
  
  addURIToClient = (id: string) => {
    return this.host + API.REMOVE_URI_FROM_CLIENT(id)
  }
}

export default new URICreator();
