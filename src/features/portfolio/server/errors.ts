import { EnvironmentError } from "@/server/env";
import { NotionPayloadError, NotionRequestError } from "@/server/notion/errors";

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
