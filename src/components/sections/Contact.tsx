"use client";

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function Contact() {
  return (
    <section id="contact" className="bg-muted py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="Contact Me"
            titleZh="联系我"
            subtitle="对竞赛合作、科研项目或实习机会感兴趣？欢迎随时联系！"
          />
        </ScrollReveal>

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-5">
          {/* Form (left / wider) */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Info (right / narrower) */}
          <div className="md:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </section>
  );
}
