class Api {
  private API_ENDPOINT = "/api";
  private MANAGER_ENDPOINT = "/manager";
  private USERS_ENDPOINT = this.API_ENDPOINT + "/users";
  private CLIENT_ENDPOINT = "/clients"
  private TOKEN_ENDPOINT = "/token"

  SIGN_IN = this.API_ENDPOINT + "/authenticate";
  SIGN_UP = this.USERS_ENDPOINT + "/signup";

  ADD_CLIENT = () => 
      this.API_ENDPOINT +
      this.CLIENT_ENDPOINT 
  
  FETCH_CLIENTS = () =>
    this.API_ENDPOINT +
    this.CLIENT_ENDPOINT

  REMOVE_CLIENT = (id: string) => 
    this.API_ENDPOINT +
    this.CLIENT_ENDPOINT
    + "/" + id
    
  MANAGER_SIGN_IN = () =>
    this.API_ENDPOINT +
    this.MANAGER_ENDPOINT +
    "/signin";

  VALIDATE_TOKEN = (token: string) => 
    this.API_ENDPOINT +
    this.TOKEN_ENDPOINT + 
    "/" + token + "/isvalid"

  REMOVE_URI_FROM_CLIENT = (id: string) =>
    this.API_ENDPOINT +
    this.CLIENT_ENDPOINT + 
    "/" + id + "/redirection_uris"
}

export const DASHBOARD = "/dashboard";
export const DASHBOARD_SIGNIN = DASHBOARD + "/signin";

export const API = new Api();
