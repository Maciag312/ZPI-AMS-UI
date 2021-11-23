import { isSecurityEnabled } from "../../common/Security";
import permissionClient from "../api/PermissionsClient"

export const useFetchPermissions = () => {
  
  const handleSubmit = () => {
    if(isSecurityEnabled) {
      return permissionClient.fetchPermissions()
    } else {
      return permissionClient.fetchStubPermissions()
    }
  }

  return handleSubmit
};

export const useRemovePermission = () => {

  const handleSubmit = (permission: string) => {
    return permissionClient
    .removePermission(permission)
  };

  return handleSubmit;
}

export const useAddPermission = () => {

  const handleSubmit = (permission: string) => {
    return permissionClient
      .addPermission({permission: permission})
  };

  return handleSubmit;
}