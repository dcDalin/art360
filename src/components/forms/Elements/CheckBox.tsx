import { useFormContext } from 'react-hook-form';

export type InputProps = {
  label: string;

  id: string;
  /** Input placeholder */
  placeholder?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function CheckBox({
  label,
  placeholder = '',
  id = '',
  ...rest
}: InputProps) {
  const { register } = useFormContext();

  return (
    <div className='form-control flex flex-row items-center space-x-2 pb-0'>
      <label className='label cursor-pointer' htmlFor={id}>
        <span className='label-text text-base'>{label}</span>
      </label>
      <input
        {...register(id)}
        {...rest}
        type='checkbox'
        name={id}
        id={id}
        placeholder={placeholder}
        aria-describedby={id}
        className='checkbox'
      />
    </div>
  );
}
