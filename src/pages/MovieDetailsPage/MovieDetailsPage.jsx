import s from './MovieDetailsPage.module.css'
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import BackLink from "../../components/BackLink/BackLink";
import { useEffect, useRef, useState } from "react";
import Loader from '../../components/Loader/Loader';



const MovieDetailsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();
    const goBackLink = useRef(location.state ?? '/movies')
    

    useEffect(() => {
        const getSelectMovie = async () => {
            
            try {
                setIsLoading(true);
                const dataDetails = await getMovieDetails(movieId);
                setSelectedMovie(dataDetails);
            } catch (error) {
                console.log(error)
                throw error;
            } finally {
                setIsLoading(false)
            }
        }
        getSelectMovie();
    }, [movieId])
    return (
        <div>
            <BackLink to={goBackLink.current}>BACK TO MOVIES</BackLink>
            {isLoading && <Loader/>}
            {selectedMovie && (
                <>
                    <h2>{selectedMovie.title}</h2>
                    <div className={s.wrap}>
                        <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt={selectedMovie.title} className={s.img} />
                        <div className={s.descr}>
                            <ul className={s.items}>
                                <li><span className={s.span}>Genres:</span> {selectedMovie.genres.map(genre => genre.name).join(", ")}</li>
                                <li><span className={s.span}>Overview:</span> {selectedMovie.overview}</li>
                                <li><span className={s.span}>Popularity:</span> {selectedMovie.popularity}</li>
                            </ul>
                            <ul className={s.items}>
                                <li>
                                    <Link to='cast' className={s.link__descr}>
                                         Cast
                                    </Link>
                                </li>
                                <li>
                                    <Link to='reviews' className={s.link__descr}>
                                       Reviews
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Outlet/>
                </>
            )}
            
            
    </div>
)

}

export default MovieDetailsPage