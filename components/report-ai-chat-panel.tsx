"use client";

import { ChatInput, ChatMessage, Spinner } from "@alocare/design-system";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ReportChatMeta } from "@/lib/report-chat-context";
import { streamReportChat } from "@/lib/api/chat-stream";
import { createAISession } from "@/lib/api/chat";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ReportAiChatPanelProps = {
  reportId: string;
  locale: Locale;
  sessionId: string | null | undefined;
  chatMeta: ReportChatMeta;
  disabled?: boolean;
  variant?: "embedded" | "floating";
  hideHeader?: boolean;
};

const SUGGESTED = [
  { en: "Explain this result", id: "Jelaskan hasil ini" },
  { en: "What should I do next?", id: "Apa yang harus saya lakukan selanjutnya?" },
  { en: "Should I be worried?", id: "Apakah saya perlu khawatir?" },
];

function sessionStorageKey(reportId: string) {
  return `alocare_report_chat_${reportId}`;
}

export function ReportAiChatPanel({
  reportId,
  locale,
  sessionId: reportSessionId,
  chatMeta,
  disabled = false,
  variant = "embedded",
  hideHeader = false,
}: ReportAiChatPanelProps) {
  const [sessionId, setSessionId] = useState<string | null>(
    reportSessionId ?? null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const accumulatedRef = useRef("");

  useEffect(() => {
    if (reportSessionId) {
      setSessionId(reportSessionId);
      return;
    }
    const stored = localStorage.getItem(sessionStorageKey(reportId));
    if (stored) setSessionId(stored);
  }, [reportId, reportSessionId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streamingText]);

  const ensureSession = useCallback(async (): Promise<string | null> => {
    if (sessionId) return sessionId;
    try {
      const session = await createAISession({ preferred_language: locale });
      setSessionId(session.id);
      localStorage.setItem(sessionStorageKey(reportId), session.id);
      return session.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start chat session");
      return null;
    }
  }, [sessionId, locale, reportId]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (disabled || isStreaming) return;
      setError(null);
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      setStreamingText("");
      accumulatedRef.current = "";
      setIsStreaming(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const sid = await ensureSession();
        if (!sid) {
          setIsStreaming(false);
          return;
        }

        await streamReportChat(
          {
            sessionId: sid,
            reportId,
            message,
            locale,
          },
          {
            onEvent: () => {},
            onToken: (_delta, accumulated) => {
              accumulatedRef.current = accumulated;
              setStreamingText(accumulated);
            },
            onComplete: (event) => {
              const reply =
                event.reply?.trim() ||
                accumulatedRef.current ||
                (locale === "id"
                  ? "Tidak ada respons."
                  : "No response received.");
              accumulatedRef.current = "";
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: reply },
              ]);
              setStreamingText("");
            },
            onError: (msg) => setError(msg),
          },
          controller.signal,
        );
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Chat failed");
        setStreamingText("");
      } finally {
        setIsStreaming(false);
      }
    },
    [disabled, isStreaming, ensureSession, reportId, locale],
  );

  const handleSuggested = (text: string) => {
    void sendMessage(text);
  };

  const heading = locale === "id" ? "Chat AI" : "AI Chat";
  const subtitle = disabled
    ? locale === "id"
      ? "Tersedia setelah analisis selesai."
      : "Available after analysis completes."
    : chatMeta.contextHint;

  const displayMessages: Message[] = [...messages];
  if (streamingText) {
    displayMessages.push({ role: "assistant", content: streamingText });
  }

  const shellClass =
    variant === "floating"
      ? "flex h-[min(60vh,28rem)] flex-col bg-white"
      : "flex min-h-[36rem] flex-col rounded-xl border border-slate-200 bg-white lg:min-h-[calc(100vh-12rem)]";

  const messagesClass =
    variant === "floating"
      ? "min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
      : "min-h-[28rem] flex-1 space-y-3 overflow-y-auto p-4";

  return (
    <div className={shellClass}>
      {!hideHeader ? (
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">{heading}</h3>
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
          {!disabled ? (
            <p className="mt-1 text-xs text-slate-400">
              {locale === "id" ? "Bahasa: Indonesia" : "Language: English"}
            </p>
          ) : null}
        </div>
      ) : null}

      <div ref={scrollRef} className={messagesClass}>
        {displayMessages.length === 0 && !isStreaming ? (
          <p className="text-center text-sm text-slate-500">
            {locale === "id"
              ? "Mulai percakapan tentang hasil analisis."
              : "Start a conversation about the analysis."}
          </p>
        ) : (
          displayMessages.map((msg, i) => (
            <ChatMessage
              key={`${i}-${msg.role}-${msg.content.slice(0, 24)}`}
              role={msg.role}
              content={msg.content}
            />
          ))
        )}
        {isStreaming && !streamingText ? (
          <div className="flex justify-center py-2">
            <Spinner size="sm" />
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-800">
          {error}
        </p>
      ) : null}

      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button
              key={s.en}
              type="button"
              disabled={disabled || isStreaming}
              onClick={() =>
                handleSuggested(locale === "id" ? s.id : s.en)
              }
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              {locale === "id" ? s.id : s.en}
            </button>
          ))}
        </div>
        <ChatInput
          lang={locale}
          onSend={(msg) => void sendMessage(msg)}
          disabled={disabled || isStreaming}
        />
      </div>
    </div>
  );
}
