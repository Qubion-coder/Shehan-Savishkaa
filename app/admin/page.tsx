'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Link as LinkIcon, MessageCircle, Sparkles, User } from 'lucide-react';
import {
  COUPLE,
  PREFIXES,
  type Prefix,
  buildDisplayName,
  buildGreeting,
  buildInvitationLink,
  buildInvitationMessage,
} from '@/lib/invitation';

export default function AdminPage() {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [name, setName] = useState('');
  const [generated, setGenerated] = useState<{ displayName: string; link: string; message: string } | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  const generateLink = (e?: React.FormEvent) => {
    e?.preventDefault();
    const displayName = buildDisplayName(prefix, name);
    if (!displayName) return;

    const link = buildInvitationLink(window.location.origin, displayName);
    setGenerated({ displayName, link, message: buildInvitationMessage(displayName, link) });
  };

  const copy = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(successMessage);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setToast('Copy failed. Please copy manually.');
    }
  };

  // Live preview of the name before generating, so the prefix choice is easy to check
  const previewName = buildDisplayName(prefix, name);

  return (
    <div className="min-h-screen bg-[#fbf5f2] text-[#3b2326]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <header className="mb-10 text-center">
          <img src="/mono.png" alt="" className="mx-auto mb-4 h-16 w-16 object-contain" />
          <h1 className="font-serif text-3xl font-semibold text-[#8f1626] md:text-4xl">Invitation Link Generator</h1>
          <p className="mt-2 text-sm text-[#7a5c5f]">
            {COUPLE.groomName} &amp; {COUPLE.brideName} · Personalized links and WhatsApp messages
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          {/* Form */}
          <form
            onSubmit={generateLink}
            className="h-fit space-y-6 rounded-3xl border border-[#ecd3cf] bg-white p-6 shadow-[0_15px_40px_rgba(122,18,32,0.06)] md:p-8"
          >
            <div>
              <label htmlFor="prefix" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#a51d2d]">
                Select Prefix
              </label>
              <div className="relative">
                <select
                  id="prefix"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value as Prefix)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-[#ecd3cf] bg-[#fdf9f7] px-4 py-3 pr-10 outline-none transition-colors focus:border-[#a51d2d]"
                >
                  {PREFIXES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-[#a51d2d]" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="guest-name" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#a51d2d]">
                Guest Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a51d2d]/50" />
                <input
                  id="guest-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sanjaya"
                  maxLength={80}
                  className="w-full rounded-xl border border-[#ecd3cf] bg-[#fdf9f7] py-3 pl-11 pr-4 outline-none transition-colors placeholder:text-[#c98f95] focus:border-[#a51d2d]"
                />
              </div>
              <p className="mt-2 min-h-[1.25rem] text-xs text-[#7a5c5f]">
                {previewName ? (
                  <>
                    Greeting: <span className="font-semibold text-[#5a0b14]">{buildGreeting(previewName)}</span>
                  </>
                ) : (
                  'Enter a name to see the greeting.'
                )}
              </p>
            </div>

            <button
              type="submit"
              disabled={!previewName}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#a51d2d] px-6 py-4 font-semibold text-white shadow-[0_10px_25px_rgba(165,29,45,0.25)] transition-all hover:bg-[#8f1626] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              Generate Link
            </button>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={!generated}
                onClick={() => generated && copy(generated.link, 'Link copied!')}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#a51d2d]/30 bg-white px-4 py-3 text-sm font-semibold text-[#a51d2d] transition-colors hover:bg-[#fbecec] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <LinkIcon className="h-4 w-4" />
                Copy Link Only
              </button>
              <button
                type="button"
                disabled={!generated}
                onClick={() => generated && copy(generated.message, 'Message copied!')}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#a51d2d]/30 bg-white px-4 py-3 text-sm font-semibold text-[#a51d2d] transition-colors hover:bg-[#fbecec] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MessageCircle className="h-4 w-4" />
                Copy Full Message
              </button>
            </div>
          </form>

          {/* Output */}
          <section className="rounded-3xl border border-dashed border-[#e0b9b9] bg-white/70 p-6 md:p-8">
            {generated ? (
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a51d2d]">Invitation Link</p>
                  <a
                    href={generated.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block break-all rounded-xl border border-[#ecd3cf] bg-[#fdf9f7] p-4 font-mono text-sm text-[#5a0b14] hover:underline"
                  >
                    {generated.link}
                  </a>
                  <p className="mt-2 text-xs text-[#7a5c5f]">
                    On the invitation: <span className="italic">We cordially invite {generated.displayName} to celebrate our special day with us.</span>
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a51d2d]">Message Preview</p>
                  <div className="whitespace-pre-wrap break-words rounded-2xl bg-[#e7f6e4] p-4 text-sm leading-relaxed text-[#1f2d1d] shadow-inner">
                    {generated.message}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center text-[#7a5c5f]">
                <LinkIcon className="mb-3 h-8 w-8 text-[#e0b9b9]" />
                <p className="text-sm">Choose a prefix, enter the guest&apos;s name and click Generate Link.</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Copy notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            role="status"
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#3b2326] px-5 py-3 text-sm font-medium text-white shadow-lg"
          >
            <Check className="h-4 w-4 text-green-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
