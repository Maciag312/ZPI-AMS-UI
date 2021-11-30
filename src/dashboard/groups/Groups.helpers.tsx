import { isSecurityEnabled } from "../../common/Security";
import groupClient from "../api/GroupsClient"

export const useFetchGroups = () => {
  
  const handleSubmit = () => {
    if(isSecurityEnabled) {
      return groupClient.fetchGroups()
    } else {
      return groupClient.fetchStubGroups()
    }
  }

  return handleSubmit
};

export const useRemoveGroup = () => {

  const handleSubmit = (group: string) => {
    return groupClient
    .removeGroup(group)
  };

  return handleSubmit;
}

export const useAddGroup = () => {

  const handleSubmit = (group: string, color: string) => {
    return groupClient
      .addGroup({group: group, color: color})
  };

  return handleSubmit;
}

export const useAssignPermissionToGroup = () => {
  const handleSubmit = (group: string, permission: string) => {
    return groupClient.assignPermissionToGroup(permission, group)
  }
  return handleSubmit
}

export const useRemovePermissionFromGroup = () => {
  const handleSubmit = (group: string, permission: string) => {
    return groupClient.removePermissionFromGroup(permission, group)
  }
  return handleSubmit
}

