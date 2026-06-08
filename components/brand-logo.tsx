import Link from "next/link";

/** Horizontal lockup aspect ratio (1434×405). */
const BRAND_LOGO_ASPECT = 1434 / 405;

type BrandLogoProps = {
  href?: string;
  size?: number;
  showWordmark?: boolean;
  subtitle?: string;
};

export function BrandLogo({
  href = "/dashboard",
  size = 32,
  showWordmark = false,
  subtitle,
}: BrandLogoProps) {
  const width = Math.round(size * BRAND_LOGO_ASPECT);
  const image = (
    <img
      src="/alocare-ai.svg"
      alt="Alocare AI"
      width={width}
      height={size}
      className="shrink-0 object-contain object-left"
      style={{ width, height: size }}
    />
  );

  if (!showWordmark) {
    return href ? (
      <Link href={href} className="inline-flex transition-opacity hover:opacity-80">
        {image}
      </Link>
    ) : (
      image
    );
  }

  const content = (
    <div className="flex flex-col items-center gap-2 text-center">
      {image}
      {subtitle ? (
        <span className="text-xs font-medium text-slate-600">{subtitle}</span>
      ) : null}
    </div>
  );

  return href ? (
    <Link href={href} className="inline-flex transition-opacity hover:opacity-80">
      {content}
    </Link>
  ) : (
    content
  );
}
