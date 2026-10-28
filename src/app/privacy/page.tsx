import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Golfsies collects, uses and protects the details you give us.",
};

// Plain-language privacy notice covering the website forms. Have it reviewed before taking payments.
const sections = [
  {
    title: "What we collect",
    body: [
      "When you claim a team name we collect the team name and back-up name, the team owner's name, mobile number, email address, suburb, and anything you choose to tell us about your team (size, availability, golf experience, how you heard about us and any message).",
      "When you send a partner enquiry we collect your name, organisation, email address, optional phone number and your message.",
      "We don't use advertising cookies or tracking pixels on this website.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "To confirm and manage your team name reservation, invite you to Golfsies events, send you membership terms and pricing, and reply to enquiries.",
      "We don't sell your details or share them with other organisations for their own marketing.",
    ],
  },
  {
    title: "Where it's stored",
    body: [
      "Form submissions are sent securely to the service we use to receive them and to our business email. Those providers may store data outside Australia.",
    ],
  },
  {
    title: "Your choices",
    body: [
      `You can ask to see, correct or delete the details we hold about you at any time by emailing ${contactEmail}.`,
      "If you'd rather not hear from us any more, reply to any email and say so, and we'll remove you.",
    ],
  },
  {
    title: "Questions or complaints",
    body: [
      `Email ${contactEmail}. If you're not satisfied with our response, you can contact the Office of the Australian Information Commissioner (oaic.gov.au).`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Your details, handled properly" intro="A plain-language summary of what we collect through this website and what we do with it." />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="max-w-[68ch] space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="display mb-3 text-[30px] font-extrabold text-navy">{s.title}</h2>
                <div className="space-y-3 text-[#2a333d]">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
            <p className="border-t border-line pt-6 text-sm text-muted">Last updated October 2026.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
