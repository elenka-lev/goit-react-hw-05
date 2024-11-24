import { useLocation, useParams } from "react-router-dom"
import { getMovieDetails } from "../../services/api"
import BackLink from "../../components/BackLink/BackLink";
import { useEffect, useState } from "react";
import Loader from '../../components/Loader/Loader'
const MovieDetailsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkHref = location.state ?? "/movies/";
    
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
            <BackLink to={backLinkHref}>BACK TO MOVIES</BackLink>
            {isLoading && <Loader/>}
            {selectedMovie && (
                <>
                <h2>{selectedMovie.title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                </>
            )}
    </div>
)

}

export default MovieDetailsPage