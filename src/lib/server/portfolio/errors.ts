import { EnvironmentError } from "~/lib/server/env";
import { NotionPayloadError, NotionRequestError } from "~/lib/server/notion/errors";

export class PortfolioValidationError extends Error {
  constructor(source: string, options?: ErrorOptions) {
    super(`Portfolio data validation failed for ${source}`, options);
    this.name = "PortfolioValidationError";
  }
}

export function getSectionErrorMessage(error: unknown): string {
  if (
    error instanceof EnvironmentError ||
    error instanceof PortfolioValidationError ||
    error instanceof NotionPayloadError ||
    (error instanceof NotionRequestError && error.configurationError)
  ) {
    return "설정을 확인해 주세요.";
  }

  return "일시적으로 데이터를 불러올 수 없습니다.";
}

export function getSectionErrorDetails(error: unknown) {
  if (error instanceof NotionRequestError) {
    return {
      kind: "notion-request",
      status: error.status,
      retryable: error.retryable,
      cause:
        error.status !== null
          ? "http"
          : error.cause instanceof Error && ["AbortError", "TimeoutError"].includes(error.cause.name)
            ? "timeout"
            : "network",
    };
  }
  if (error instanceof EnvironmentError) return { kind: "environment" };
  if (error instanceof PortfolioValidationError) return { kind: "portfolio-validation" };
  if (error instanceof NotionPayloadError) return { kind: "notion-payload" };
  return { kind: "unexpected" };
}
