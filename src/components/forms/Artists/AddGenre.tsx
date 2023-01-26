import { IoIosAdd } from 'react-icons/io';

interface IGenreData {
  id: string;
  name: string;
  description: string;
}

interface IAddGenreProps {
  genreData: IGenreData[];
  handleClick: (genreId: string) => void;
  loading: boolean;
}

export default function AddGenre({
  genreData,
  handleClick,
  loading,
}: IAddGenreProps) {
  return (
    <div className='flex space-x-2'>
      {genreData && genreData.length
        ? genreData.map(({ id, name }) => {
            return (
              <button
                key={id}
                className={`btn-outline btn-info btn-xs btn gap-2 ${
                  loading ? 'btn-disabled' : ''
                }`}
                onClick={() => handleClick(id)}
                disabled={loading}
              >
                {name} <IoIosAdd />
              </button>
            );
          })
        : null}
    </div>
  );
}
