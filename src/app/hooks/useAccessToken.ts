"use client";

import { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "@/app/lib/authConfig";

export default function useAccessToken() {
  const { instance, accounts } = useMsal();

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    const account = accounts[0] ?? instance.getAllAccounts()[0];
    if (!account) {
      return null;
    }

    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect({
          ...loginRequest,
          account,
        });
      } else {
        console.error("Failed to acquire access token:", error);
      }
      return null;
    }
  }, [accounts, instance]);

  return { getAccessToken };
}
