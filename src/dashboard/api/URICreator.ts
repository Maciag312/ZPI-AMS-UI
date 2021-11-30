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
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
>>>>>>> ZPI-add-groups-ams

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

<<<<<<< HEAD
=======
  renewPassword = () => {
    return this.host + API.USERS() + "/password/renew"
  }

  activateUser = () => {
    return this.host + API.USERS() + "/activate"
  }

  deactivateUser = () => {
    return this.host + API.USERS() + "/deactivate"
  }

  addGroup = () => {
    return this.host + API.GROUPS()
  }

  fetchGroups = () => {
    return this.host + API.GROUPS()

  }

  addPermissionToGroup = (group: string) => {
    return this.host + API.GROUPS() + "/" + group
  }

  removePermissionFromGroup = (group: string) => {
    return this.host + API.GROUPS() + "/" + group

  }

  removeGroup = (group: string) => {
    return this.host + API.GROUPS() + "/" + group
  }

>>>>>>> Stashed changes
>>>>>>> ZPI-add-groups-ams
}

export default new URICreator();
