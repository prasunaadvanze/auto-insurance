import { useState, useCallback } from "react";
import clientApi from "../lib/clientApi";

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

  const start = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const { data } = await clientApi.post("/start", {
        driverAge: null,
        accidentHistory: null,
      });

      setQuoteId(data.quoteId);
      setSchema(data.schema);
      setProgress(data.progress);
    } catch (err) {
      console.error("START ERROR:", err);
      setError("Unable to start your quote. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const next = useCallback(
    async (answers: Record<string, string>): Promise<void> => {
      try {
        if (!schema) return;

        setLoading(true);
        setError(null);
        setSchema(null);

        const { data } = await clientApi.post("/next", {
          quoteId,
          stepId: schema.stepId,
          answers,
        });

        setProgress(data.progress);

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
    [schema, quoteId],
  );

  return { schema, result, progress, loading, error, start, next };
}
