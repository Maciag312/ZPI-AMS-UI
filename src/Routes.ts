class Api {
  private API_ENDPOINT = "/api";
  private MANAGER_ENDPOINT = "/manager";
  private USERS_ENDPOINT = this.API_ENDPOINT + "/users";
  private ORGANIZATION = (organization: string) =>
    "/orgnization/" + organization;

  SIGN_IN = this.API_ENDPOINT + "/authenticate";
  SIGN_UP = this.USERS_ENDPOINT + "/signup";
  CONSENT = this.API_ENDPOINT + "/consent";

  MANAGER_SIGN_IN = (organization: string) =>
    this.API_ENDPOINT +
    this.ORGANIZATION(organization) +
    this.MANAGER_ENDPOINT +
    "/signin";
}

export const AUTH = "/allow";
export const SIGN_IN = "/organization/:organization/signin";
export const SIGN_UP = "/organization/:organization/signup";
export const DASHBOARD = "/organization/:organization/dashboard";
export const DASHBOARD_SIGNIN = DASHBOARD + "/signin";

export const API = new Api();
