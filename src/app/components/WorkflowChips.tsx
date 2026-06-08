"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

const WORKFLOW_API_URL =
  "https://worklow-deepcth3a6gmg5dz.centralindia-01.azurewebsites.net/test";

interface WorkflowStatus {
  IsMvr: boolean;
  IsClue: boolean;
  QuoteNumber: string;
}

export default function WorkflowChips() {
  const [status, setStatus] = useState<WorkflowStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorkflowStatus() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(WORKFLOW_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data: WorkflowStatus = await response.json();
        setStatus(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load workflow status",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWorkflowStatus();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Loading workflow status...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-red-600">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        {error}
      </div>
    );
  }

  if (!status?.IsMvr && !status?.IsClue) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status.IsMvr && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
          MVR
        </span>
      )}
      {status.IsClue && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
          CLUE
        </span>
      )}
    </div>
  );
}
