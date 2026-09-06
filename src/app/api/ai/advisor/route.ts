import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateAdvisorResponse } from "@/lib/ai/advisor";
import { getBusinessContext } from "@/lib/ai/business-context";
import { adminDb } from "@/lib/firebase/admin";
import { getSessionUser } from "@/lib/firebase/auth";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const advisorRequestSchema = z.object({
  question: z.string().min(2).max(1000),
  history: z.array(chatMessageSchema).max(12).default([]),
});

async function saveConversation(input: {
  organizationId?: string;
  userId: string;
  question: string;
  answer: string;
  provider: string;
}) {
  if (!input.organizationId) {
    return;
  }

  try {
    const db = adminDb();
    const now = FieldValue.serverTimestamp();
    const conversationRef = db.collection("aiConversations").doc();
    const userMessageRef = db.collection("aiMessages").doc();
    const assistantMessageRef = db.collection("aiMessages").doc();
    const batch = db.batch();

    batch.set(conversationRef, {
      organizationId: input.organizationId,
      createdBy: input.userId,
      title: input.question.slice(0, 80),
      provider: input.provider,
      createdAt: now,
      updatedAt: now,
    });
    batch.set(userMessageRef, {
      organizationId: input.organizationId,
      conversationId: conversationRef.id,
      role: "user",
      content: input.question,
      createdAt: now,
    });
    batch.set(assistantMessageRef, {
      organizationId: input.organizationId,
      conversationId: conversationRef.id,
      role: "assistant",
      content: input.answer,
      provider: input.provider,
      createdAt: now,
    });

    await batch.commit();
  } catch {
    // The advisor should still answer if logging is unavailable during setup.
  }
}

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in before using Velico AI." }, { status: 401 });
  }

  const parsed = advisorRequestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Ask a clear business question." }, { status: 400 });
  }

  try {
    const context = await getBusinessContext(user);
    const answer = await generateAdvisorResponse(
      parsed.data.question,
      parsed.data.history,
      context,
    );

    await saveConversation({
      organizationId: context.organizationId,
      userId: user.uid,
      question: parsed.data.question,
      answer: answer.content,
      provider: answer.provider,
    });

    return NextResponse.json({
      answer: answer.content,
      provider: answer.provider,
      contextSource: context.source,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Velico AI could not answer right now.",
      },
      { status: 500 },
    );
  }
}
