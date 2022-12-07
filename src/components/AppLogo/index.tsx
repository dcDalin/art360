interface IAppLogoProps {
  className?: string;
}

export default function AppLogo({
  className = 'text-base-100',
}: IAppLogoProps) {
  return <h1 className={className}>Art360</h1>;
}
