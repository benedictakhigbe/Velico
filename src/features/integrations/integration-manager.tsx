"use client";

import {
  Check,
  Clipboard,
  ExternalLink,
  Link2,
  MessageCircle,
  PlugZap,
  RotateCcw,
  Send,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";

type SocialChannel = {
  id: string;
  name: string;
  category: string;
  primaryLabel: string;
  primaryPlaceholder: string;
  hint: string;
  supportsDefaultMessage?: boolean;
};

type SavedConnection = {
  channelId: string;
  businessName: string;
  linkOrHandle: string;
  connectedUrl: string;
  defaultMessage?: string;
  note?: string;
  connectedAt: string;
};

const channels: SocialChannel[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Messaging",
    primaryLabel: "WhatsApp link or phone number",
    primaryPlaceholder: "https://wa.me/2348012345678 or +2348012345678",
    hint: "Use your wa.me link, WhatsApp Business short link, or phone number with country code.",
    supportsDefaultMessage: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "Social selling",
    primaryLabel: "Instagram profile link or username",
    primaryPlaceholder: "https://instagram.com/yourshop or @yourshop",
    hint: "Use your profile URL or username.",
  },
  {
    id: "facebook",
    name: "Facebook Page",
    category: "Social selling",
    primaryLabel: "Facebook page link or page name",
    primaryPlaceholder: "https://facebook.com/yourpage",
    hint: "Use your Facebook Page URL so customers can message or follow the page.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "Content",
    primaryLabel: "TikTok profile link or username",
    primaryPlaceholder: "https://tiktok.com/@yourshop or @yourshop",
    hint: "Use your TikTok shop or creator profile.",
  },
  {
    id: "x",
    name: "X / Twitter",
    category: "Content",
    primaryLabel: "X profile link or username",
    primaryPlaceholder: "https://x.com/yourshop or @yourshop",
    hint: "Use your X profile for updates, launches, and customer conversations.",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Professional",
    primaryLabel: "LinkedIn page link",
    primaryPlaceholder: "https://linkedin.com/company/yourbusiness",
    hint: "Useful for agencies, B2B services, consultants, and professional brands.",
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "Content",
    primaryLabel: "YouTube channel link or handle",
    primaryPlaceholder: "https://youtube.com/@yourbusiness",
    hint: "Use your channel link for product demos, tutorials, and proof content.",
  },
  {
    id: "website",
    name: "Website / Storefront",
    category: "Owned channel",
    primaryLabel: "Website or store link",
    primaryPlaceholder: "https://yourbusiness.com",
    hint: "Use your website, Shopify, WooCommerce, Selar, Flutterwave Store, or catalog link.",
  },
];

const storageKey = "velico.social-links.connections";

function getInitialConnections() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as SavedConnection[]) : [];
  } catch {
    return [];
  }
}

function addProtocol(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `https://${value}`;
}

function cleanHandle(value: string) {
  return value.trim().replace(/^@/, "").replace(/^\/+/, "");
}

function normalizePhone(value: string) {
  const trimmed = value.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.startsWith("0")) {
    return `234${digits.slice(1)}`;
  }

  return digits;
}

function normalizeChannelUrl(channelId: string, value: string, defaultMessage?: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (channelId === "whatsapp") {
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }

    const phone = normalizePhone(trimmed);
    const text = defaultMessage?.trim();
    return text ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/${phone}`;
  }

  if (channelId === "instagram") {
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://instagram.com/${cleanHandle(trimmed)}`;
  }

  if (channelId === "facebook") {
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://facebook.com/${cleanHandle(trimmed)}`;
  }

  if (channelId === "tiktok") {
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://tiktok.com/@${cleanHandle(trimmed)}`;
  }

  if (channelId === "x") {
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://x.com/${cleanHandle(trimmed)}`;
  }

  if (channelId === "youtube") {
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://youtube.com/@${cleanHandle(trimmed)}`;
  }

  return addProtocol(trimmed);
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function IntegrationManager() {
  const initialConnections = useMemo(() => getInitialConnections(), []);
  const [selectedId, setSelectedId] = useState(channels[0].id);
  const [businessName, setBusinessName] = useState("");
  const [linkOrHandle, setLinkOrHandle] = useState("");
  const [defaultMessage, setDefaultMessage] = useState("Hello, I am interested in your products.");
  const [note, setNote] = useState("");
  const [connections, setConnections] = useState<SavedConnection[]>(initialConnections);
  const [message, setMessage] = useState("Add your social link or handle, then save the connection.");

  const selectedChannel = channels.find((channel) => channel.id === selectedId) ?? channels[0];
  const connected = connections.find((connection) => connection.channelId === selectedChannel.id);
  const connectedUrl = normalizeChannelUrl(selectedChannel.id, linkOrHandle, defaultMessage);
  const isReadyToSave = Boolean(businessName.trim() && linkOrHandle.trim() && isValidUrl(connectedUrl));

  function saveConnections(nextConnections: SavedConnection[]) {
    setConnections(nextConnections);
    window.localStorage.setItem(storageKey, JSON.stringify(nextConnections));
  }

  function selectChannel(channelId: string) {
    const nextConnection = connections.find((connection) => connection.channelId === channelId);
    const nextChannel = channels.find((channel) => channel.id === channelId) ?? channels[0];

    setSelectedId(channelId);
    setBusinessName(nextConnection?.businessName ?? "");
    setLinkOrHandle(nextConnection?.linkOrHandle ?? "");
    setDefaultMessage(nextConnection?.defaultMessage ?? "Hello, I am interested in your products.");
    setNote(nextConnection?.note ?? "");
    setMessage(
      nextConnection
        ? `${nextChannel.name} is already connected. You can update it here.`
        : `Add the details for ${nextChannel.name}.`,
    );
  }

  function connectChannel() {
    if (!businessName.trim()) {
      setMessage("Add the business or display name customers should recognize.");
      return;
    }

    if (!linkOrHandle.trim()) {
      setMessage(`Add your ${selectedChannel.name} link or handle.`);
      return;
    }

    if (!isValidUrl(connectedUrl)) {
      setMessage("That link could not be prepared. Check the handle, URL, or phone number.");
      return;
    }

    const nextConnection: SavedConnection = {
      channelId: selectedChannel.id,
      businessName: businessName.trim(),
      linkOrHandle: linkOrHandle.trim(),
      connectedUrl,
      defaultMessage: selectedChannel.supportsDefaultMessage ? defaultMessage.trim() : undefined,
      note: note.trim() || undefined,
      connectedAt: new Date().toISOString(),
    };
    const nextConnections = [
      nextConnection,
      ...connections.filter((connection) => connection.channelId !== selectedChannel.id),
    ];

    saveConnections(nextConnections);
    setMessage(`${selectedChannel.name} connected. Customers can now open this channel from Velico.`);
  }

  function disconnectChannel(channelId = selectedChannel.id) {
    const channel = channels.find((item) => item.id === channelId);

    saveConnections(connections.filter((connection) => connection.channelId !== channelId));
    setMessage(`${channel?.name ?? "Channel"} removed.`);

    if (channelId === selectedId) {
      setBusinessName("");
      setLinkOrHandle("");
      setDefaultMessage("Hello, I am interested in your products.");
      setNote("");
    }
  }

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(`${label} copied.`);
    } catch {
      setMessage(`${label}: ${value}`);
    }
  }

  function openChannel(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Channels</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--heading)]">{channels.length}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Social and storefront links</p>
        </div>
        <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Connected</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--heading)]">{connections.length}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Saved in this browser</p>
        </div>
        <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Setup type</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--heading)]">Links</p>
          <p className="mt-1 text-xs text-[var(--muted)]">No developer account required</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <section className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--heading)]">Connect a channel</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{message}</p>
            </div>
            <span className="inline-flex h-8 shrink-0 items-center rounded-[8px] border border-[var(--border)] bg-[var(--brand-soft)] px-3 text-xs font-semibold text-[var(--brand-blue)]">
              {connected ? "Connected" : "Ready"}
            </span>
          </div>

          <form className="grid gap-4">
            <SelectField
              label="Social channel"
              name="channel"
              value={selectedId}
              onChange={(event) => selectChannel(event.target.value)}
            >
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </SelectField>
            <Field
              label="Business or display name"
              name="businessName"
              placeholder="Example: Ada Beauty Store"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              autoComplete="organization"
            />
            <Field
              label={selectedChannel.primaryLabel}
              name="linkOrHandle"
              placeholder={selectedChannel.primaryPlaceholder}
              value={linkOrHandle}
              onChange={(event) => setLinkOrHandle(event.target.value)}
              autoComplete="url"
              hint={selectedChannel.hint}
            />
            {selectedChannel.supportsDefaultMessage ? (
              <Field
                label="Default customer message"
                name="defaultMessage"
                placeholder="Hello, I want to place an order."
                value={defaultMessage}
                onChange={(event) => setDefaultMessage(event.target.value)}
              />
            ) : null}
            <Field
              label="Internal note"
              name="note"
              placeholder="Example: Main sales channel, ads page, support number"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <Field label="Prepared customer link" name="connectedUrl" value={connectedUrl} readOnly />

            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" onClick={connectChannel} disabled={!isReadyToSave}>
                <PlugZap className="size-4" aria-hidden="true" />
                {connected ? "Update connection" : "Connect channel"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => openChannel(connectedUrl)}
                disabled={!isValidUrl(connectedUrl)}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Test link
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => copyText(connectedUrl, "Customer link")}
                disabled={!isValidUrl(connectedUrl)}
              >
                <Clipboard className="size-4" aria-hidden="true" />
                Copy link
              </Button>
              {connected ? (
                <Button type="button" variant="ghost" onClick={() => disconnectChannel()}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Remove
                </Button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--heading)]">Connected channels</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Open, copy, update, or remove customer-facing social links.</p>
            </div>
            <MessageCircle className="size-5 text-[var(--brand-blue)]" aria-hidden="true" />
          </div>

          <div className="grid gap-3">
            {channels.map((channel) => {
              const channelConnection = connections.find((connection) => connection.channelId === channel.id);

              return (
                <div
                  key={channel.id}
                  className="grid gap-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="font-semibold text-[var(--heading)]">{channel.name}</p>
                      <span className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs font-semibold text-[var(--muted)]">
                        {channel.category}
                      </span>
                      {channelConnection ? (
                        <span className="inline-flex items-center gap-1 rounded-[8px] border border-[var(--border)] bg-[var(--brand-soft)] px-2 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                          <Check className="size-3.5" aria-hidden="true" />
                          Connected
                        </span>
                      ) : null}
                    </div>
                    {channelConnection ? (
                      <>
                        <a
                          href={channelConnection.connectedUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 flex min-w-0 items-center gap-2 text-sm font-medium text-[var(--brand-blue)] hover:underline"
                        >
                          <Link2 className="size-4 shrink-0" aria-hidden="true" />
                          <span className="truncate">{channelConnection.connectedUrl}</span>
                        </a>
                        <p className="mt-2 text-xs text-[var(--muted)]">
                          {channelConnection.businessName} connected {formatDate(channelConnection.connectedAt)}
                        </p>
                        {channelConnection.note ? (
                          <p className="mt-2 text-sm text-[var(--foreground)]">{channelConnection.note}</p>
                        ) : null}
                      </>
                    ) : (
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{channel.hint}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {channelConnection ? (
                      <>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => openChannel(channelConnection.connectedUrl)}
                        >
                          <ExternalLink className="size-4" aria-hidden="true" />
                          Open
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => copyText(channelConnection.connectedUrl, `${channel.name} link`)}
                        >
                          <Clipboard className="size-4" aria-hidden="true" />
                          Copy
                        </Button>
                      </>
                    ) : null}
                    <Button type="button" variant="secondary" onClick={() => selectChannel(channel.id)}>
                      <Send className="size-4" aria-hidden="true" />
                      {channelConnection ? "Edit" : "Add"}
                    </Button>
                    {channelConnection ? (
                      <Button type="button" variant="ghost" onClick={() => disconnectChannel(channel.id)}>
                        Remove
                      </Button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
