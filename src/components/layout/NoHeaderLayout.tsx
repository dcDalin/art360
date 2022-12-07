import Seo from '@/components/Seo';

interface INoHeaderLayout {
  children: React.ReactNode;
  templateTitle: string;
}

export default function NoHeaderLayout({
  children,
  templateTitle,
}: INoHeaderLayout) {
  return (
    <>
      <Seo templateTitle={templateTitle} />
      <div>{children}</div>
    </>
  );
}
