import { useToast } from "@chakra-ui/react";
import React from "react";
import Creds from "../../common/Creds";
import managerClientInstance from "../api/ManagerClientImpl";

export const useSignIn = (orgnization: string) => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const handleSubmit = (creds: Creds) => {
    managerClientInstance
      .signIn(creds, orgnization)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          showCreatedAccount();
        }
      })
      .catch((error) => {
        console.log(error);
        showSigningInFailure();
      });
  };

  const showCreatedAccount = () => {
    toastIdRef.current = toast({
      description: "Created account successfully!",
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
