export type QuoteJourney = "Undecided" | "FAST" | "SLOW";

export function isFastTrackJourney(
  journey: QuoteJourney | null | undefined,
): boolean {
  return journey === "FAST";
}
