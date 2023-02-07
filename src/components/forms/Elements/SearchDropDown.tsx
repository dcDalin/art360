/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import Select from 'react-select';

export type InputProps = {
  label: string;
  options: any;
  id: string;
  /** Input placeholder */
  placeholder?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function SearchDropDown({
  label,
  placeholder = '',
  id = '',
  options,
  hideError,
  validation,
}: InputProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div className='form-control w-full pb-0'>
      <label className='label cursor-pointer' htmlFor={id}>
        <span className='label-text text-base'>{label}</span>
      </label>
      <Controller
        name={id}
        control={control}
        rules={validation}
        render={({ field: { onChange, onBlur } }) => (
          <Select
            onBlur={onBlur} // notify when input is touched
            onChange={onChange}
            placeholder={placeholder}
            options={options}
          />
        )}
      />

      <label className='label'>
        {!hideError && errors[id]?.message ? (
          <span className='label-text-alt text-sm text-error'>
            {`${errors[id]?.message}`}
          </span>
        ) : null}
      </label>
    </div>
  );
}
