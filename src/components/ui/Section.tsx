import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, title, children, className = '' }: SectionProps) => (
  <section
    id={id}
    className={`w-full max-w-3xl mx-auto px-6 py-20 md:py-24 ${className}`}
  >
    <h2
      className="text-2xl md:text-3xl mb-8"
      style={{ fontFamily: 'var(--font-domine)' }}
    >
      {title}
    </h2>
    <div className="border-t border-white/[0.08]" />
    <div className="pt-8">{children}</div>
  </section>
);

export default Section;
