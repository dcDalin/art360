interface ISectionWrapperProps {
  heading?: string;
  description?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({
  heading,
  description,
  children,
}: ISectionWrapperProps) {
  return (
    <div>
      <div className='flex w-full flex-col items-center'>
        {heading ? <h1 className='text-5xl font-bold'>{heading}</h1> : null}
        {description ? <p className='py-2'>{description}</p> : null}
        <div className='divider mt-0 py-0'></div>
      </div>

      <div>{children}</div>
    </div>
  );
}
