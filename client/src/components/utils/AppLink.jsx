import { Link } from 'react-router-dom';

export default function AppLink({
  to,
  label,
  description,
  className,
  ariaLabel,
  titleAttr,
}) {
  const defaultClass =
    'text-colour5 hover:brightness-75';

  return (
    <Link
      to={to}
      className={className || defaultClass}
      aria-label={ariaLabel || (description ? `Explore ${description}` : undefined)}
      title={titleAttr || description}
    >
      {label}
    </Link>
  );
}