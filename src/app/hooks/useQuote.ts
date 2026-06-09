import { useState, useCallback, useRef } from "react";
import clientApi from "../lib/clientApi";
import { type QuoteJourney } from "../lib/quote";
import {
  fetchWorkflowStatus,
  type WorkflowStatus,
} from "../lib/workflow";

type Field = {
  type: string;
  name: string;
  label: string;
  required: boolean;
  options?: string[];
};

type Schema = {
  stepId: string;
  title: string;
  fields: Field[];
};

type QuoteResult = {
  premium: number;
};

export default function useQuote() {
  const [schema, setSchema] = useState<Schema | null>(null);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [journey, setJourney] = useState<QuoteJourney>("Undecided");
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus | null>(
    null,
  );
  const [workflowLoading, setWorkflowLoading] = useState(false);
  const [workflowError, setWorkflowError] = useState<string | null>(null);
  const workflowAbortRef = useRef<AbortController | null>(null);
  const workflowPromiseRef = useRef<Promise<void> | null>(null);
  const workflowStatusRef = useRef<WorkflowStatus | null>(null);

  const resetWorkflowStatus = useCallback(() => {
    workflowAbortRef.current?.abort();
    workflowAbortRef.current = null;
    workflowPromiseRef.current = null;
    workflowStatusRef.current = null;
    setWorkflowStatus(null);
    setWorkflowError(null);
    setWorkflowLoading(false);
  }, []);

  const loadWorkflowStatus = useCallback((): Promise<void> => {
    if (workflowStatusRef.current) {
      return Promise.resolve();
    }

    if (workflowPromiseRef.current) {
      return workflowPromiseRef.current;
    }

    const controller = new AbortController();
    workflowAbortRef.current = controller;

    const promise = (async () => {
      try {
        setWorkflowLoading(true);
        setWorkflowError(null);

        const data = await fetchWorkflowStatus(controller.signal);
        if (!controller.signal.aborted) {
          workflowStatusRef.current = data;
          setWorkflowStatus(data);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        if (!controller.signal.aborted) {
          setWorkflowError(
            err instanceof Error
              ? err.message
              : "Failed to load workflow status",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setWorkflowLoading(false);
        }
        workflowPromiseRef.current = null;
      }
    })();

    workflowPromiseRef.current = promise;
    return promise;
  }, []);

  const start = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      setJourney("Undecided");
      resetWorkflowStatus();
      void loadWorkflowStatus();

      const { data } = await clientApi.post("/start", {
        driverAge: null,
        accidentHistory: null,
      });

      setQuoteId(data.quoteId);
      setSchema(data.schema);
      setProgress(data.progress);
      if (data.journey) {
        setJourney(data.journey);
      }
    } catch (err) {
      console.error("START ERROR:", err);
      setError("Unable to start your quote. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loadWorkflowStatus, resetWorkflowStatus]);

  const next = useCallback(
    async (answers: Record<string, string>): Promise<void> => {
      try {
        if (!schema) return;

        setLoading(true);
        setError(null);
        setSchema(null);

        const [{ data }] = await Promise.all([
          clientApi.post("/next", {
            quoteId,
            stepId: schema.stepId,
            answers,
          }),
          loadWorkflowStatus(),
        ]);

        setProgress(data.progress);
        if (data.journey) {
          setJourney(data.journey);
        }

        if (data.schema === null) {
          setResult(data.quote);
        } else {
          setSchema(data.schema);
        }
      } catch (err) {
        console.error("NEXT ERROR:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [schema, quoteId, loadWorkflowStatus],
  );

  return {
    schema,
    result,
    progress,
    loading,
    error,
    journey,
    workflowStatus,
    workflowLoading,
    workflowError,
    start,
    next,
  };
}
