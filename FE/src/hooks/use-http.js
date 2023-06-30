import { useReducer, useCallback, useEffect, useState } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  identifier: null,
};

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...currHttpState,
        loading: false,
        data: action.responseData,
        reqExtra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback(async (requestConfig) => {
    if (!requestConfig) return;
    dispatchHttp({ type: "SEND" });

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        body: requestConfig.body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 500) {
        dispatchHttp({
          type: "ERROR",
          title: "Error 500",
          message: "Something went wrong with server...",
        });
      } else if (response.status === 400) {
        dispatchHttp({
          type: "ERROR",
          title: "Error 400",
          message: "Cannot find data that you requested...!",
        });
      }
      
      const responseData = await response.json();

      dispatchHttp({
        type: "RESPONSE",
        responseData: responseData.data,
        extra: requestConfig.reqExtra,
      });
    } catch (error) {
      console.error("ERROR", error);
      dispatchHttp({ type: "ERROR", message: "Something Went Wrong" });
    }
  }, []);

  return {
    isLoading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    reqIdentifier: httpState.identifier,
    reqExtra: httpState.reqExtra,
    sendRequest: sendRequest,
    clear: clear,
  };
};

export default useHttp;
