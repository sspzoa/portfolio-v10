export class NotionRequestError extends Error {
  constructor(
    public readonly status: number | null,
    options?: ErrorOptions,
  ) {
    super(status === null ? "Notion request failed" : `Notion request failed with status ${status}`, options);
    this.name = "NotionRequestError";
  }

  get retryable(): boolean {
    return this.status === null || this.status === 429 || this.status >= 500;
  }

  get configurationError(): boolean {
    return this.status !== null && this.status >= 400 && this.status < 500 && this.status !== 429;
  }
}

export class NotionPayloadError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "NotionPayloadError";
  }
}
