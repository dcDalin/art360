import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

interface IAlterButtonProps {
  type?: 'edit' | 'delete';
  handleClick: () => void;
  icon?: React.ReactNode;
}

export default function AlterButton({
  type,
  handleClick,
  icon,
}: IAlterButtonProps) {
  return (
    <button className='btn-outline btn-sm btn' onClick={handleClick}>
      {type === 'edit' ? (
        <AiOutlineEdit />
      ) : type === 'delete' ? (
        <AiOutlineDelete />
      ) : (
        <>{icon}</>
      )}
    </button>
  );
}
