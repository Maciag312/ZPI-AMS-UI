import { useToast } from "@chakra-ui/react";
import React from "react";
import Creds from "../../common/Creds";
import managerClientInstance from "../api/ManagerClientImpl";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"

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
          cookies.set('jwt_token', res.data, {sameSite: 'lax'})
          history.push("/dashboard")
          showSuccessfulLogin();
        }
      })
      .catch((error) => {
        console.log(error);
        cookies.remove("jwt_token")
        history.push("/dashboard/signin")
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
