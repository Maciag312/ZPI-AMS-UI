import { isSecurityEnabled } from "../../common/Security";
import roleClient from "../api/RolesClient"

export const useFetchRoles = () => {
  
  const handleSubmit = () => {
    if(isSecurityEnabled) {
      return roleClient.fetchRoles()
    } else {
      return roleClient.fetchStubRoles()
    }
  }

  return handleSubmit
};

export const useRemoveRole = () => {

  const handleSubmit = (role: string) => {
    return roleClient
    .removeRole(role)
  };

  return handleSubmit;
}

export const useAddRole = () => {

  const handleSubmit = (role: string, color: string) => {
    return roleClient
      .addRole({role: role, color: color})
  };

  return handleSubmit;
}

export const useAssignPermissionToRole = () => {
  const handleSubmit = (role: string, permission: string) => {
    return roleClient.assignPermissionToRole(permission, role)
  }
  return handleSubmit
}

export const useRemovePermissionFromRole = () => {
  const handleSubmit = (role: string, permission: string) => {
    return roleClient.removePermissionFromRole(permission, role)
  }
  return handleSubmit
}

