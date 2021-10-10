import { API } from "../../Routes";

class URICreator {
  signInURI = (host: string, organization: string) => {
    return host + API.MANAGER_SIGN_IN(organization);
  };
}

export default new URICreator();
