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
      {heading ? (
        <div className='flex w-full flex-col items-center'>
          <h1 className='text-5xl font-bold'>{heading}</h1>
          {description ? <p className='py-2'>{description}</p> : null}
          <div className='divider mt-0 py-0'></div>
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
