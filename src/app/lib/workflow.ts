export const WORKFLOW_API_URL =
  "https://gainsco-workflow-orchestrator.azurewebsites.net/test";

export interface WorkflowStatus {
  IsMvr: boolean;
  IsClue: boolean;
  QuoteNumber: string;
}

export async function fetchWorkflowStatus(
  signal?: AbortSignal,
): Promise<WorkflowStatus> {
  const response = await fetch(WORKFLOW_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}
