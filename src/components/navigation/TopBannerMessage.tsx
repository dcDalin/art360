import ContainerLayout from '@/components/layout/ContainerLayout';

export default function TopBannerMessage() {
  return (
    <div className='bg-primary/70'>
      <ContainerLayout>
        <div className='flex items-center justify-center font-bold'>
          Some message here
        </div>
      </ContainerLayout>
    </div>
  );
}
