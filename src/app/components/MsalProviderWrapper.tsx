"use client";

import { useEffect, useRef, useState } from "react";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
  EventType,
  InteractionStatus,
  PublicClientApplication,
} from "@azure/msal-browser";
import { msalConfig, loginRequest } from "@/app/lib/authConfig";
import { setAccessTokenGetter } from "@/app/lib/clientApi";
import useAccessToken from "@/app/hooks/useAccessToken";
import AuthLoading from "@/app/components/AuthLoading";

let msalInstance: PublicClientApplication | undefined;

function getMsalInstance(): PublicClientApplication {
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
  }
  return msalInstance;
}

function ClientApiAuthBridge({ children }: { children: React.ReactNode }) {
  const { getAccessToken } = useAccessToken();
  setAccessTokenGetter(getAccessToken);
  return <>{children}</>;
}

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [initialized, setInitialized] = useState(false);
  const loginStarted = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const callbackId = instance.addEventCallback((event) => {
      if (
        event.eventType === EventType.LOGIN_SUCCESS &&
        event.payload &&
        "account" in event.payload &&
        event.payload.account
      ) {
        instance.setActiveAccount(event.payload.account);
      }
    });

    void (async () => {
      await instance.initialize();

      try {
        const response = await instance.handleRedirectPromise();
        if (response?.account) {
          instance.setActiveAccount(response.account);
        }
      } catch (error) {
        console.error("MSAL redirect handling failed:", error);
      }

      const existing = instance.getAllAccounts();
      if (existing.length > 0 && !instance.getActiveAccount()) {
        instance.setActiveAccount(existing[0]);
      }

      if (!cancelled) {
        setInitialized(true);
      }
    })();

    return () => {
      cancelled = true;
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  useEffect(() => {
    if (!initialized) return;
    if (inProgress !== InteractionStatus.None) return;
    if (isAuthenticated || instance.getActiveAccount()) return;
    if (loginStarted.current) return;

    loginStarted.current = true;

    void instance.loginRedirect(loginRequest).catch((error: unknown) => {
      loginStarted.current = false;
      if (
        typeof error === "object" &&
        error !== null &&
        "errorCode" in error &&
        error.errorCode === "interaction_in_progress"
      ) {
        return;
      }
      console.error("MSAL login redirect failed:", error);
    });
  }, [initialized, inProgress, isAuthenticated, instance]);

  if (!initialized || inProgress !== InteractionStatus.None) {
    return <AuthLoading message="Signing you in…" />;
  }

  if (!isAuthenticated && !instance.getActiveAccount()) {
    return <AuthLoading message="Redirecting to sign in…" />;
  }

  return <ClientApiAuthBridge>{children}</ClientApiAuthBridge>;
}

export default function MsalProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [instance] = useState(() => getMsalInstance());

  return (
    <MsalProvider instance={instance}>
      <AuthBootstrap>{children}</AuthBootstrap>
    </MsalProvider>
  );
}
