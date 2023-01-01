import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';

export type InputProps = {
  autocomplete?: string;
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  loading?: boolean;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  autocomplete,
  label,
  placeholder = '',
  loading,
  id = '',
  type = 'text',
  readOnly = false,
  hideError = false,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='form-control w-full pb-0'>
      <label className='label' htmlFor={id}>
        <span className='label-text text-base'>{label}</span>
        {loading && (
          <span className='label-text-alt'>
            <ImSpinner2 className='animate-spin' />
          </span>
        )}
      </label>
      <input
        {...register(id, validation)}
        {...rest}
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        aria-describedby={id}
        autoComplete={autocomplete}
        className={clsx(
          'input w-full',
          errors[id] ? 'input-error' : 'input-bordered'
        )}
        disabled={readOnly}
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
