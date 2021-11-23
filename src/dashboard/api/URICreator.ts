import { API } from "../../Routes";
import { host } from "./AuthorizationServerConfig";

class URICreator {
  userAttributes(): string {
    return this.host + API.USERS() + "/attributes"
  }
  
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

  fetchPermissions = () => {
    return this.host + API.PERMISSIONS()
  }

  removePermission = (permission: string) => {
    return this.host + API.PERMISSIONS() + "/" + permission
  }

  addPermission = () => {
    return this.host + API.PERMISSIONS();
  }

  fetchUsers = () => {
    return this.host + API.USERS()
  }

  removeUser = () => {
    return this.host + API.USERS()
  }

  addUser = () => {
    return this.host + API.USERS();
  }

  assignRoleToUser  = () => {
    return this.host + API.USERS() + "/assign-role"
  }

  removeRoleFromUser = () => {
    return this.host + API.USERS() + "/remove-role"
  }

  addRole = () => {
    return this.host + API.ROLES();
  }

  removeRole = (role: string) => {
    return this.host + API.ROLES() + "/" + role
  }

  fetchRoles = () => {
    return this.host + API.ROLES();
  }

  removePermissionFromRole(role: string): string {
    return this.host + API.ROLES() + "/" + role + "/remove-permission"
  }

  addPermissionToRole(role: string): string {
    return this.host + API.ROLES() + "/" + role + "/assign-permission"
  }

  fetchUserInfo = () => {
    return this.host + API.USERS() + "/info"
  }

}

export default new URICreator();
