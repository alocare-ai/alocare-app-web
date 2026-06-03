"use client";

import { MessageCircle, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ReportChatMeta } from "@/lib/report-chat-context";
import { ReportAiChatPanel } from "@/components/report-ai-chat-panel";

const ROTATING_TOOLTIPS: Record<Locale, string[]> = {
  en: [
    "Ask AI about this report",
    "Click to open AI Chat",
    "Questions about the labs?",
    "Explore findings with AI",
  ],
  id: [
    "Tanya AI tentang laporan ini",
    "Klik untuk buka Chat AI",
    "Ada pertanyaan tentang lab?",
    "Jelajahi temuan dengan AI",
  ],
};

const TOOLTIP_SHOW_MS = 3200;
const TOOLTIP_HIDE_MS = 1400;

type ReportAiChatFabProps = {
  reportId: string;
  locale: Locale;
  sessionId: string | null | undefined;
  chatMeta: ReportChatMeta;
  disabled?: boolean;
};

export function ReportAiChatFab({
  reportId,
  locale,
  sessionId,
  chatMeta,
  disabled = false,
}: ReportAiChatFabProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  const close = useCallback(() => setOpen(false), []);

  const tips = ROTATING_TOOLTIPS[locale];

  useEffect(() => {
    if (disabled || open || hovered) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTipVisible(true);
      return;
    }

    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const runCycle = () => {
      setTipVisible(true);
      showTimer = setTimeout(() => {
        setTipVisible(false);
        hideTimer = setTimeout(() => {
          setTipIndex((i) => (i + 1) % tips.length);
          runCycle();
        }, TOOLTIP_HIDE_MS);
      }, TOOLTIP_SHOW_MS);
    };

    runCycle();
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [disabled, open, hovered, tips.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  const label = locale === "id" ? "Chat AI" : "AI Chat";
  const unavailable =
    locale === "id"
      ? "Tersedia setelah analisis selesai"
      : "Available after analysis completes";
  const closeLabel = locale === "id" ? "Tutup chat" : "Close chat";

  const tooltipText = disabled ? unavailable : tips[tipIndex];
  const tooltipShown = !open && (disabled || hovered || tipVisible);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[1100] flex flex-col items-end gap-3"
    >
      {open ? (
        <div
          role="dialog"
          aria-label={label}
          className="animate-ai-chat-panel-in flex w-[min(calc(100vw-2rem),26rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-teal-500/20 sm:w-[26rem]"
        >
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-2.5 text-white">
            <div className="min-w-0">
              <p className="text-sm font-semibold">{label}</p>
              <p className="truncate text-[11px] text-teal-50/90">
                {disabled ? unavailable : chatMeta.contextHint}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-lg p-1.5 text-white/90 transition hover:bg-white/15 hover:text-white"
              aria-label={closeLabel}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <ReportAiChatPanel
            reportId={reportId}
            locale={locale}
            sessionId={sessionId}
            chatMeta={chatMeta}
            disabled={disabled}
            variant="floating"
            hideHeader
          />
        </div>
      ) : null}

      <div className="relative flex items-center justify-end">
        <div
          id={tooltipId}
          role="tooltip"
          aria-live="polite"
          className={`pointer-events-none absolute right-[4.25rem] top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-medium shadow-md transition-all duration-500 ease-in-out ${
            tooltipShown
              ? "translate-x-0 opacity-100"
              : "translate-x-1 opacity-0"
          } ${
            disabled
              ? "border-slate-200 bg-slate-100 text-slate-600"
              : "border-teal-200/80 bg-white text-slate-800"
          }`}
        >
          <span key={disabled ? "static" : tipIndex}>{tooltipText}</span>
          <span
            className={`absolute top-1/2 -right-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-b ${
              disabled
                ? "border-slate-200 bg-slate-100"
                : "border-teal-200/80 bg-white"
            }`}
            aria-hidden
          />
        </div>

        {!open && !disabled ? (
          <>
            <span
              className="pointer-events-none absolute inset-0 rounded-full bg-teal-400/35 blur-md animate-ai-chat-glow"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-teal-400/50 animate-ai-chat-pulse-ring"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full border border-cyan-300/40 animate-ai-chat-pulse-ring [animation-delay:0.6s]"
              aria-hidden
            />
          </>
        ) : null}

        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-describedby={!open && tooltipShown ? tooltipId : undefined}
          aria-label={disabled ? `${label} — ${unavailable}` : `${label}. ${tips[0]}`}
          disabled={disabled}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onClick={() => {
            if (disabled) return;
            setOpen((prev) => !prev);
          }}
          className={`group relative z-10 flex h-[3.75rem] w-[3.75rem] cursor-pointer items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ${
            open
              ? "scale-95 bg-slate-800 text-white shadow-xl focus-visible:ring-slate-400"
              : disabled
                ? "cursor-not-allowed bg-slate-300 text-slate-500 shadow-md focus-visible:ring-slate-300"
                : `animate-ai-chat-float bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-500 text-white shadow-[0_0_28px_rgba(20,184,166,0.55),0_8px_24px_rgba(14,116,144,0.35)] hover:scale-110 hover:shadow-[0_0_40px_rgba(20,184,166,0.75),0_12px_32px_rgba(14,116,144,0.45)] active:scale-95 focus-visible:ring-teal-400 ${
                    hovered ? "ring-4 ring-teal-300/60 ring-offset-white" : ""
                  }`
          }`}
        >
          <span
            className={`absolute inset-1 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-0 transition-opacity duration-300 ${
              !disabled && !open ? "group-hover:opacity-100" : ""
            }`}
            aria-hidden
          />
          <MessageCircle
            className={`relative h-7 w-7 transition-transform duration-300 ${
              open ? "rotate-90 scale-90" : "group-hover:scale-110"
            }`}
            aria-hidden
          />
          {!open && !disabled ? (
            <span className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-80" />
              <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 ring-2 ring-white">
                <Sparkles className="h-2.5 w-2.5 text-teal-800" aria-hidden />
              </span>
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}
