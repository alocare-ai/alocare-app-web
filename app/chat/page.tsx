"use client";

import {
  Button,
  ChatInput,
  ChatMessage,
  Spinner,
} from "@alocare/design-system";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useLocale } from "@/hooks/use-locale";
import {
  createAISession,
  getAISession,
  sendChatMessage,
} from "@/lib/api/chat";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SESSION_KEY = "alocare_chat_session";

const SUGGESTED = [
  { en: "Explain this result", id: "Jelaskan hasil ini" },
  { en: "Apa arti platelet rendah?", id: "Apa arti platelet rendah?" },
  { en: "Should I be worried?", id: "Apakah saya perlu khawatir?" },
];

export default function ChatPage() {
  const { locale } = useLocale();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) setSessionId(stored);
  }, []);

  const { isLoading: sessionLoading } = useQuery({
    queryKey: ["ai-session", sessionId],
    queryFn: () => getAISession(sessionId!),
    enabled: Boolean(sessionId),
  });

  const initSession = useMutation({
    mutationFn: () =>
      createAISession({ preferred_language: locale }),
    onSuccess: (session) => {
      setSessionId(session.id);
      localStorage.setItem(SESSION_KEY, session.id);
      setHistory((prev) => [
        { id: session.id, label: new Date().toLocaleString() },
        ...prev,
      ]);
      setMessages([]);
    },
  });

  const chatMutation = useMutation({
    mutationFn: (message: string) =>
      sendChatMessage(sessionId!, message),
    onMutate: (message) => {
      setMessages((prev) => [...prev, { role: "user", content: message }]);
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    },
  });

  const handleSend = (message: string) => {
    if (!sessionId) {
      initSession.mutate(undefined, {
        onSuccess: (session) => {
          sendChatMessage(session.id, message).then((data) => {
            setMessages([
              { role: "user", content: message },
              { role: "assistant", content: data.reply },
            ]);
          });
        },
      });
      return;
    }
    chatMutation.mutate(message);
  };

  const handleSuggested = (text: string) => handleSend(text);

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {locale === "id" ? "Riwayat" : "History"}
            </h2>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3 w-full"
              onClick={() => initSession.mutate()}
            >
              {locale === "id" ? "Sesi baru" : "New session"}
            </Button>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              {sessionId ? (
                <li className="rounded-lg bg-blue-50 px-2 py-1.5 font-medium text-blue-800">
                  {sessionId}
                </li>
              ) : null}
              {history.map((h) => (
                <li key={h.id} className="truncate px-2 py-1">
                  {h.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex min-h-[32rem] flex-col rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-4 py-3">
            <h1 className="font-heading text-lg font-bold text-slate-900">
              {locale === "id" ? "Chat AI Kesehatan" : "AI Health Chat"}
            </h1>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {sessionLoading ? (
              <Spinner />
            ) : messages.length === 0 ? (
              <p className="text-center text-sm text-slate-500">
                {locale === "id"
                  ? "Ajukan pertanyaan tentang laporan atau kesehatan Anda."
                  : "Ask questions about your report or health."}
              </p>
            ) : (
              messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))
            )}
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s.en}
                  type="button"
                  onClick={() =>
                    handleSuggested(locale === "id" ? s.id : s.en)
                  }
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100"
                >
                  {locale === "id" ? s.id : s.en}
                </button>
              ))}
            </div>
            <ChatInput
              lang={locale}
              onSend={handleSend}
              disabled={chatMutation.isPending || initSession.isPending}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
