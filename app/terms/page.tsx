import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of NEXUS.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of"
      accent="service."
      updated="September 1, 2026"
      intro="These terms govern your access to and use of NEXUS. We've tried to keep them short and readable."
      sections={[
        {
          title: "Accepting these terms",
          paragraphs: [
            "By creating an account or using NEXUS, you agree to these terms on behalf of yourself or the organisation you represent. If you're accepting on behalf of an organisation, you confirm you have authority to do so.",
          ],
        },
        {
          title: "Your account",
          paragraphs: [
            "You're responsible for keeping your credentials secure and for all activity in your workspace. Let us know immediately if you suspect unauthorised access.",
          ],
        },
        {
          title: "Acceptable use",
          paragraphs: [
            "Don't use NEXUS to send unlawful content, infringe others' rights, attempt to breach the platform's security, or interfere with other customers' use of the service.",
            "We may suspend workspaces that put the platform or other customers at risk, and we'll tell you why unless we're legally prevented from doing so.",
          ],
        },
        {
          title: "Your data",
          paragraphs: [
            "You own your data. You grant us only the rights needed to operate the service on your behalf. Our processing of personal data is governed by our Data Processing Addendum.",
          ],
        },
        {
          title: "Fees and billing",
          paragraphs: [
            "Paid plans are billed in advance, monthly or annually. Usage above your plan's included events is billed in arrears. Fees are non-refundable except where required by law.",
          ],
        },
        {
          title: "Availability and SLA",
          paragraphs: [
            "We aim for continuous availability. Builder and Scale plans include an uptime commitment with service credits, as described in our Service Level Agreement.",
          ],
        },
        {
          title: "Liability",
          paragraphs: [
            "To the extent permitted by law, each party's total liability under these terms is limited to the fees paid in the twelve months before the claim. Neither party is liable for indirect or consequential damages.",
          ],
        },
        {
          title: "Termination",
          paragraphs: [
            "You can cancel at any time from your workspace settings. On termination, you can export your data for 30 days, after which it's permanently deleted.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: ["These terms are governed by the laws of Sweden, and disputes are subject to the courts of Stockholm."],
        },
      ]}
    />
  );
}
