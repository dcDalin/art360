export type InputProps = {
  checked: boolean;
  handleClick: () => void;
  disableCheck: boolean;
};

export default function WithFrameCheckBox({
  checked,
  handleClick,
  disableCheck,
}: InputProps) {
  return (
    <div className='form-control flex flex-row items-center space-x-2 pb-0'>
      <input
        type='checkbox'
        name='withFrame'
        id='withFrame'
        aria-describedby='with-frame'
        className='checkbox'
        checked={checked}
        onClick={handleClick}
        disabled={disableCheck}
      />
      <label className='label cursor-pointer' htmlFor='frame'>
        <span className='label-text text-base'>With frame</span>
      </label>
    </div>
  );
}
