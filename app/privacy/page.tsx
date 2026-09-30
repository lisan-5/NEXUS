import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NEXUS collects, uses, and protects personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      accent="policy."
      updated="September 1, 2026"
      intro="We move a lot of data for our customers. We take the data you trust us with seriously, and we collect as little about you as we can."
      sections={[
        {
          title: "Who we are",
          paragraphs: [
            "NEXUS Technologies AB (\"NEXUS\", \"we\", \"us\") operates the NEXUS platform, website, and related services. For customer data processed through pipelines, we act as a processor on behalf of our customers, who remain the controller.",
          ],
        },
        {
          title: "Information we collect",
          paragraphs: [
            "Account information: your name, email address, company, and billing details when you create a workspace or purchase a plan.",
            "Usage information: logs, device and browser information, and product analytics that help us operate and improve the service.",
            "Customer data: event payloads you send through NEXUS. We process this data only to provide the service and never use it to train models or for advertising.",
          ],
        },
        {
          title: "How we use information",
          paragraphs: [
            "We use account and usage information to provide, secure, and support the service, to communicate with you about your account, and to comply with legal obligations.",
            "We send marketing emails only with your consent, and every message includes a one-click unsubscribe link.",
          ],
        },
        {
          title: "Sharing and sub-processors",
          paragraphs: [
            "We share information with a small set of vetted sub-processors, such as cloud infrastructure and payment providers, under contracts that require equivalent protections. A current list is available on request.",
            "We never sell personal information.",
          ],
        },
        {
          title: "Data retention",
          paragraphs: [
            "Event data is retained according to your plan's history window, then permanently deleted. Account information is kept for as long as your account is active and for a limited period afterwards to meet legal requirements.",
          ],
        },
        {
          title: "Security",
          paragraphs: [
            "All data is encrypted in transit with TLS 1.3 and at rest with AES-256. Workspaces are isolated, access is governed by least privilege, and we are audited annually against SOC 2 Type II and ISO 27001.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Depending on where you live, you may have the right to access, correct, export, or delete your personal information, and to object to or restrict certain processing. Contact us and we'll respond within 30 days.",
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: [
            "If we make material changes, we'll notify workspace owners by email at least 30 days before they take effect.",
          ],
        },
      ]}
    />
  );
}
