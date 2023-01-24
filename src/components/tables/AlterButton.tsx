import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

interface IAlterButtonProps {
  type: 'edit' | 'delete';
  handleClick: () => void;
}

export default function AlterButton({ type, handleClick }: IAlterButtonProps) {
  return (
    <button className='btn-outline btn btn-sm' onClick={handleClick}>
      {type === 'edit' ? (
        <AiOutlineEdit />
      ) : type === 'delete' ? (
        <AiOutlineDelete />
      ) : null}
    </button>
  );
}
