interface IThinLabelProps {
  text: string;
}

export default function ThinLabel({ text }: IThinLabelProps) {
  return (
    <div className='text-gray font-source-sans flex items-center space-x-2 text-xs font-semibold'>
      {text}
    </div>
  );
}
