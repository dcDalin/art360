import clsx from 'clsx';
import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';

export type PasswordInputProps = {
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
  helperText?: string;
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
  loading?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

export default function PasswordInput({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  validation,
  loading,
  ...rest
}: PasswordInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className='form-control w-full pb-4'>
      <label className='label' htmlFor={id}>
        {label}
        {loading && (
          <span className='label-text-alt'>
            <ImSpinner2 className='animate-spin' />
          </span>
        )}
      </label>
      <div className='relative mt-1'>
        <input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            'input w-full',
            errors[id] ? 'input-error' : 'input-bordered'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        <button
          onClick={togglePassword}
          type='button'
          className='absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-0'
        >
          {showPassword ? (
            <HiEyeOff className='cursor-pointer text-xl text-gray-500 hover:text-gray-600' />
          ) : (
            <HiEye className='cursor-pointer text-xl text-gray-500 hover:text-gray-600' />
          )}
        </button>
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
        {errors[id] && (
          <span className='text-sm text-red-500'>
            {errors[id]?.message as unknown as string}
          </span>
        )}
      </div>
    </div>
  );
}
