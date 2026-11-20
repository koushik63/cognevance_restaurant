interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl';
  const titleColor = light ? 'text-[#FFFFFF]' : 'text-[#24211E]';
  const subColor = light ? 'text-[#EFE7DC]/80' : 'text-[#756C62]';

  return (
    <div className={alignment}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-[#C56B45] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${subColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
