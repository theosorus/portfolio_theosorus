import { ReactNode } from 'react';

interface MonoLinkProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const MonoLink = ({
  href,
  onClick,
  children,
  external = false,
  className = '',
  ariaLabel,
}: MonoLinkProps) => {
  const baseClasses =
    'inline-flex items-center gap-1 text-sm text-fg-muted hover:text-accent transition-colors duration-200';
  const classes = `${baseClasses} ${className}`;
  const style = { fontFamily: 'var(--font-mono)' };

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
        {external && <span aria-hidden>↗</span>}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default MonoLink;
