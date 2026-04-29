import { ReactNode } from 'react';

interface EntryProps {
  meta: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  tags?: string[];
  rightSlot?: ReactNode;
  description?: string;
  isFirst?: boolean;
}

const Entry = ({
  meta,
  title,
  subtitle,
  bullets,
  tags,
  rightSlot,
  description,
  isFirst = false,
}: EntryProps) => (
  <div className={`${isFirst ? '' : 'border-t border-white/[0.08] pt-8 mt-8'}`}>
    <div className="flex flex-col md:flex-row md:gap-8">
      <div
        className="text-sm text-fg-muted md:w-32 md:flex-shrink-0 mb-2 md:mb-0"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {meta}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="text-base md:text-lg text-fg leading-snug">{title}</h3>
          {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
        </div>

        {subtitle && (
          <p className="text-sm text-fg-muted mb-3">{subtitle}</p>
        )}

        {description && (
          <p className="text-sm text-fg-muted leading-relaxed mb-3 max-w-prose">
            {description}
          </p>
        )}

        {bullets && bullets.length > 0 && (
          <ul className="text-sm text-fg-muted leading-relaxed space-y-1 mb-3 list-none">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-fg-dim flex-shrink-0">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <div
            className="text-xs text-fg-dim"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {tags.join(' · ')}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Entry;
