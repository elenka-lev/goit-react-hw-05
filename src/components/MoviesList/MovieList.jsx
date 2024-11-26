import s from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';
const MovieList = ({ movies }) => {
    const location = useLocation();
    return (
       
            <ul className={s.wrap}>
                    {movies.map((movie) => 
                    (<li key={movie.id} className={s.item}>
                        <Link to={`/movies/${movie.id}`} className={s.link} state={{ from: location }}>{movie.title}</Link>
                    </li>)
                    )}
                    
            </ul>
          
       
    )
}
export default MovieList;
