import { useToast } from "@chakra-ui/react";
import React from "react";
import Creds from "../../common/Creds";
import managerClientInstance from "../api/ManagerClientImpl";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"
import { CLIENTS } from "../../Routes";
import { isSecurityEnabled } from "../../common/Security";

export const useSignIn = (orgnization: string) => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const cookies = new Cookies();
  const history = useHistory()

  const handleSubmit = (creds: Creds) => {
    managerClientInstance
      .signIn(creds)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          cookies.set('jwt_token', res.data, {sameSite: true})
          history.push(CLIENTS)
          showSuccessfulLogin();
        }
      })
      .catch((error) => {
        console.log(error);
        cookies.remove("jwt_token")
        if(isSecurityEnabled) {
          history.push("/dashboard/signin")
        }
        showSigningInFailure();
      });
  };

  const showSuccessfulLogin = () => {
    toastIdRef.current = toast({
      description: "Signed in successfully.",
      status: "success",
    }) as undefined;
  };

  const showSigningInFailure = () => {
    toastIdRef.current = toast({
      description: "Error!",
      status: "error",
    }) as undefined;
  };

  return handleSubmit;
};
