interface IContainerLayoutProps {
  children: React.ReactNode;
}

export default function ContainerLayout({ children }: IContainerLayoutProps) {
  return <div className='mx-auto max-w-screen-xl px-2 md:px-4'>{children}</div>;
}
