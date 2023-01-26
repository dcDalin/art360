import { AiOutlineClose } from 'react-icons/ai';

interface IGenreData {
  artist_genre: {
    id: string;
    name: string;
  };
  id: string;
}

interface IRemoveGenreProps {
  genreData: IGenreData[];
  handleClick: (genreId: string) => void;
  loading: boolean;
}

export default function RemoveGenre({
  genreData,
  handleClick,
  loading,
}: IRemoveGenreProps) {
  return (
    <div className='flex space-x-2'>
      {genreData && genreData.length
        ? genreData.map(({ artist_genre: { name }, id }) => {
            return (
              <button
                key={id}
                className={`btn-info btn-xs btn gap-2 ${
                  loading ? 'btn-disabled' : ''
                }`}
                onClick={() => handleClick(id)}
                disabled={loading}
              >
                {name} <AiOutlineClose />
              </button>
            );
          })
        : null}
    </div>
  );
}
