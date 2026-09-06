"use client";

import { Bot, CheckCircle2, ClipboardList, Send, UserRound } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "What should I focus on today?",
  "Give me a WhatsApp marketing message for this week.",
  "What Instagram content should I post?",
  "How can I get more repeat customers?",
  "Which expenses should I review first?",
];

const actionQueue = [
  "Create a simple weekend promotion",
  "Plan WhatsApp follow-ups for customers",
  "Suggest Instagram content ideas",
  "Review low-stock beauty products",
];

type AiAdvisorChatProps = {
  initialQuestion?: string;
};

export function AiAdvisorChat({ initialQuestion }: AiAdvisorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me about sales, marketing, WhatsApp, Instagram, Facebook, pricing, customers, stock, expenses, invoices, or what to focus on next.",
    },
  ]);
  const [question, setQuestion] = useState(initialQuestion ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function askAdvisor(nextQuestion: string) {
    const trimmedQuestion = nextQuestion.trim();

    if (!trimmedQuestion) {
      return;
    }

    setQuestion("");
    setError(null);
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", content: trimmedQuestion },
    ]);

    startTransition(async () => {
      const history = messages.filter((message) => message.content.trim().length > 0);
      const response = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion, history }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { answer?: string; provider?: string; contextSource?: string; error?: string }
        | null;

      if (!response.ok || !payload?.answer) {
        setError(payload?.error ?? "Velico AI could not answer right now.");
        return;
      }

      const answer = payload.answer;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askAdvisor(question);
  }

  return (
    <div className="grid min-w-0 gap-5">
      <div className="grid gap-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--heading)]">
          <ClipboardList className="size-4 text-[var(--brand-blue)]" aria-hidden="true" />
          Suggested next actions
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {actionQueue.map((action) => (
            <button
              key={action}
              type="button"
              className="flex min-h-12 items-center gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-sm font-medium text-[var(--foreground)] hover:border-[var(--brand-blue)] hover:bg-[var(--brand-soft)]"
              onClick={() => askAdvisor(action)}
              disabled={isPending}
            >
              <CheckCircle2 className="size-4 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" />
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-w-0 gap-2 sm:grid-cols-2">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-3 text-left text-sm font-semibold text-[var(--heading)] transition hover:border-[var(--brand-blue)] hover:bg-[var(--brand-soft)]"
            onClick={() => askAdvisor(prompt)}
            disabled={isPending}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="grid max-h-[65vh] min-w-0 gap-4 overflow-y-auto rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-3 sm:max-h-[520px] sm:p-4">
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          const Icon = isUser ? UserRound : Bot;

          return (
            <div
              key={`${message.role}-${index}`}
              data-velico-animate
              className={
                isUser
                  ? "ml-auto flex max-w-full flex-row-reverse gap-2 sm:max-w-[88%] sm:flex-row sm:gap-3"
                  : "mr-auto flex max-w-full gap-2 sm:max-w-[88%] sm:gap-3"
              }
            >
              <span className="mt-1 hidden size-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--surface)] text-[var(--brand-blue)] sm:flex">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div
                className={
                  isUser
                    ? "min-w-0 overflow-hidden rounded-[8px] bg-[var(--brand-blue)] px-3 py-3 text-sm leading-6 whitespace-pre-wrap break-words text-white sm:px-4"
                    : "min-w-0 overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm leading-6 whitespace-pre-wrap break-words text-[var(--foreground)] sm:px-4"
                }
              >
                {message.content}
              </div>
            </div>
          );
        })}
        {isPending ? (
          <div className="mr-auto flex max-w-full gap-2 sm:max-w-[88%] sm:gap-3">
            <span className="mt-1 hidden size-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--surface)] text-[var(--brand-blue)] sm:flex">
              <Bot className="size-4" aria-hidden="true" />
            </span>
            <div className="velico-thinking rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--muted)] sm:px-4">
              Thinking through your business data...
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-[8px] border border-[var(--danger)] bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="grid min-w-0 gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="advisor-question">
          Ask Velico AI
        </label>
        <textarea
          id="advisor-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="min-h-24 min-w-0 resize-y rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted)] focus:border-[var(--brand-blue)]"
          placeholder="Ask about marketing, WhatsApp, Instagram, pricing, cash flow, stock..."
          disabled={isPending}
        />
        <Button type="submit" className="h-12 w-full sm:w-auto sm:self-end" disabled={isPending || !question.trim()}>
          <Send className="size-4" aria-hidden="true" />
          Ask
        </Button>
      </form>
    </div>
  );
}
