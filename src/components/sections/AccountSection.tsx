"use client";

import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Accordion from "@/components/ui/Accordion";
import CopyButton from "@/components/ui/CopyButton";

export default function AccountSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="account" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-2">
          {config.labels.accountTitle}
        </h2>
        <p className="text-xs text-warm-gray text-center mb-8">
          {config.labels.accountSubtitle}
        </p>
      </AnimateOnScroll>

      <div className="space-y-3">
        {config.accountGroups.map((group) => (
          <AnimateOnScroll
            key={group.side}
            delay={group.side === "bride" ? 100 : 0}
          >
            <Accordion title={`${group.label} 계좌번호`}>
              <div className="space-y-4">
                {group.accounts.map((account, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-beige/30 last:border-0"
                  >
                    <div>
                      <p className="text-xs text-warm-gray mb-0.5">
                        {account.role}
                      </p>
                      <p className="text-sm text-brown-dark">
                        {account.bank} {account.accountNumber}
                      </p>
                      <p className="text-xs text-brown">{account.holder}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0 ml-3">
                      <CopyButton
                        text={`${account.bank} ${account.accountNumber}`}
                        label={config.labels.accountCopy}
                      />
                      {account.kakaoPayUrl &&
                        account.kakaoPayUrl !== "https://qr.kakaopay.com/PLACEHOLDER" && (
                          <a
                            href={account.kakaoPayUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 transition-colors"
                          >
                            {config.labels.accountSend}
                          </a>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
