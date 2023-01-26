import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';

export type SelectInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  children: React.ReactNode;
  loading?: boolean;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SelectInput({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  loading,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child as React.ReactElement<SelectInputProps>,
          {
            disabled: child.props.value !== rest?.defaultValue,
          }
        );
      }
    }
  );

  return (
    <div className='form-control w-full pb-4'>
      <label className='label' htmlFor={id}>
        <span className='label-text text-base'>{label}</span>
        {loading && (
          <span className='label-text-alt'>
            <ImSpinner2 className='animate-spin' />
          </span>
        )}
      </label>
      <select
        {...register(id, validation)}
        // defaultValue to value blank, will get overriden by ...rest if needed
        defaultValue=''
        {...rest}
        name={id}
        id={id}
        className={clsx(
          'select w-full',
          errors[id] ? 'select-error' : 'select-bordered',
          { 'text-gray-500': value === '' }
        )}
        aria-describedby={id}
      >
        {placeholder && (
          <option value='' disabled hidden>
            {placeholder}
          </option>
        )}
        {readOnly ? readOnlyChildren : children}
      </select>

      {errors[id] && (
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          <HiExclamationCircle className='text-xl text-red-500' />
        </div>
      )}
      <label className='label'>
        {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
        {errors[id] && (
          <span className='label-text-alt text-sm text-error'>
            {errors[id]?.message as unknown as string}
          </span>
        )}
      </label>
    </div>
  );
}
