export default function AppAnchor({
  href,
  children,
  className,
  ariaLabel,
  titleAttr,
  target,
  rel,
}) {
  const defaultClass =
    '';

  return (
    <a
      href={href}
      className={className || defaultClass}
      aria-label={ariaLabel}
      title={titleAttr}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}