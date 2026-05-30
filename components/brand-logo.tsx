import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  size?: number;
  showWordmark?: boolean;
  subtitle?: string;
};

export function BrandLogo({
  href = "/dashboard",
  size = 40,
  showWordmark = false,
  subtitle,
}: BrandLogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt="Alocare AI"
      width={size}
      height={size}
      priority
      className="shrink-0"
      style={{ width: size, height: size }}
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
    <div className="flex items-center gap-3">
      {image}
      <span className="leading-tight">
        <span className="block text-xl font-semibold tracking-tight text-slate-950">
          alocare<span className="text-slate-950">.</span>
          <span className="text-emerald-600">ai</span>
        </span>
        {subtitle ? (
          <span className="block text-xs font-medium text-slate-600">
            {subtitle}
          </span>
        ) : null}
      </span>
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
