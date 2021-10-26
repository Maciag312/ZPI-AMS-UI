import { useToast } from "@chakra-ui/react";
import React from "react";
import clientClientInstance from "./api/ClientClientImpl"
import Client from "../common/Client";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom"


export const useClientAddition = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const cookies = new Cookies()
  const history = useHistory()

  const handleSubmit = (client: Client) => {
    clientClientInstance
    .add(client)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
            showSuccessAddingClient();            
        }
        
      })
      .catch((error) => {
        console.log(error);
        showClientAddingFailure();
        cookies.remove("jwt_token")
        history.push("/dashboard/signin")
      });
  };

  const showSuccessAddingClient = () => {
    toastIdRef.current = toast({
      description: "Added client successfully.",
      status: "success",
    }) as undefined;
  };

  const showClientAddingFailure = () => {
    toastIdRef.current = toast({
      description: "Could not add client!",
      status: "error",
    }) as undefined;
  };

  return handleSubmit;
};


export const useFetchClients = () => {
  
    const handleSubmit = () => {
      return clientClientInstance
      .fetchClients()
    };
  
    return handleSubmit;
};

export const useRemoveClient = () => {

  const handleSubmit = (id: string) => {
    return clientClientInstance
    .removeClient(id)
  };

  return handleSubmit;

}

export const useRemoveURIFromClient = () => {

  const handleSubmit = (id: string, uri: string) => {
    return clientClientInstance
    .removeURIFromClient(id, uri)
  };

  return handleSubmit;

}

export const useURIAddition = () => {
  const handleSubmit = (id: string, uri: string) => {
    return clientClientInstance
    .addURIToClient(id, uri)
  };

  return handleSubmit;
}