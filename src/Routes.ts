class Api {
  private API_ENDPOINT = "/api";
  private MANAGER_ENDPOINT = "/manager";
  private USERS_ENDPOINT = this.API_ENDPOINT + "/users";
  private CLIENT_ENDPOINT = "/client"

  SIGN_IN = this.API_ENDPOINT + "/authenticate";
  SIGN_UP = this.USERS_ENDPOINT + "/signup";

  ADD_CLIENT = () => 
      this.API_ENDPOINT +
      this.CLIENT_ENDPOINT 
  
  MANAGER_SIGN_IN = () =>
    this.API_ENDPOINT +
    this.MANAGER_ENDPOINT +
    "/signin";
}

export const DASHBOARD = "/dashboard";
export const DASHBOARD_SIGNIN = DASHBOARD + "/signin";

export const API = new Api();
