interface IAppLogoProps {
  className?: string;
}

export default function AppLogo({ className = 'text-neutral' }: IAppLogoProps) {
  return <h1 className={className}>Art360</h1>;
}
