export type OcrStreamStep =
  | "started"
  | "loading"
  | "extracting"
  | "page"
  | "ocr"
  | "file_complete"
  | "complete"
  | "identity"
  | "error";

export type IdentityStreamSubstep =
  | "started"
  | "file"
  | "file_result"
  | "selecting"
  | "saving"
  | "cached"
  | "complete";

export type OcrStreamEvent = {
  step: OcrStreamStep;
  progress: number;
  message?: string;
  substep?: IdentityStreamSubstep;
  page?: number;
  totalPages?: number;
  charCount?: number;
  text?: string;
  file?: string;
  fileIndex?: number;
  fileTotal?: number;
  patientIdentity?: Record<string, unknown>;
  patientName?: string;
  medicalRecordNumber?: string;
  overallConfidence?: number;
  found?: boolean;
};

export type OcrStreamHandlers = {
  onEvent: (event: OcrStreamEvent) => void;
  onComplete: (event: OcrStreamEvent) => void;
  onError: (message: string) => void;
};

function isTerminalComplete(event: OcrStreamEvent): boolean {
  return event.step === "complete" && event.fileTotal != null;
}

export function streamReportOcr(
  reportId: string,
  handlers: OcrStreamHandlers,
): () => void {
  const source = new EventSource(`/api/reports/${reportId}/ocr/stream`);

  source.onmessage = (message) => {
    try {
      const event = JSON.parse(message.data) as OcrStreamEvent;
      handlers.onEvent(event);

      if (event.step === "error") {
        handlers.onError(event.message ?? "OCR failed");
        source.close();
        return;
      }

      if (isTerminalComplete(event)) {
        handlers.onComplete(event);
        source.close();
      }
    } catch {
      handlers.onError("Invalid OCR stream response");
      source.close();
    }
  };

  source.onerror = () => {
    if (source.readyState !== EventSource.CLOSED) {
      handlers.onError("OCR stream connection lost");
      source.close();
    }
  };

  return () => source.close();
}

export function runOcrStream(
  reportId: string,
  onEvent: (event: OcrStreamEvent) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const close = streamReportOcr(reportId, {
      onEvent,
      onComplete: (event) => {
        resolve(event.text ?? "");
      },
      onError: (message) => {
        reject(new Error(message));
      },
    });
  });
}
