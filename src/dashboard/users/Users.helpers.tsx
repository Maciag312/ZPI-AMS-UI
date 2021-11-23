import { isSecurityEnabled } from "../../common/Security";
import UserClient from "../api/UsersClient"

export const useFetchUsers = () => {
  
  const handleSubmit = () => {
    if(isSecurityEnabled) {
      return UserClient.fetchUsers()
    } else {
      return UserClient.fetchUserStub()
    }
  }
  return handleSubmit
};

export const useRemoveUser = () => {

  const handleSubmit = (id: string) => {
    return UserClient
    .removeUser(id)
  };

  return handleSubmit;
}

export const useAddUser = () => {

  const handleSubmit = (username: string, email: string) => {
    return UserClient
      .addUser({username: username, email: email})
  };

  return handleSubmit;
}

export const usePutUserAttributes  = () => {
  const handleSubmit = (email: string, attributes: any) => {
    return UserClient.putUserAttributes(email, attributes)
  }
  return handleSubmit
}

export const useFetchUserInfo = () => {
  const handleSubmit = (email: string) => {
    if(isSecurityEnabled) {
      return UserClient.fetchUserInfo(email)
    } else {
      return UserClient.fetchUserInfoStub(email)
    }
  }
  return handleSubmit
}

export const useAssignRoleToUser = () => {
  const handleSubmit = (email: string, role: string) => {
    return UserClient.assignRoleToUser(email, role)
  }
  return handleSubmit
}

export const useRenewPassword = () => {
  const handleSubmit = (email: string) => {
    return UserClient.renewPassword(email)
  }
  return handleSubmit
}


export const useActivateUser = () => {
  const handleSubmit = (email: string) => {
    return UserClient.activateUser(email)
  }
  return handleSubmit
}

export const useDeactivateUser = () => {
  const handleSubmit = (email: string) => {
    return UserClient.deactivateUser(email)
  }
  return handleSubmit
}


export const useRemoveRoleFromUser = () => {
  const handleSubmit = (email: string, role: string) => {
    return UserClient.removeRoleFromUser(email, role)
  }
  return handleSubmit
}