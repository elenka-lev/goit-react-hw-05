import s from './MovieCast.module.css';
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
const MovieCast = () => {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCasts = async () => {
            try {
                setIsLoading(true);
                const dataCast = await getMovieCast(movieId);
                setCasts(dataCast.cast || [])
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        }
        getCasts();
    }, [movieId])
    if (casts && casts.length === 0) {
        return <p>No information about actors.</p>;
    }
    return (
        <div className={s.container}>
            {isLoading && <Loader />}
            <ul className={s.items}>
                {casts.map((cast) => (
                    <li key={cast.id} className={s.item}>
                        <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} className={s.itemImg} alt={cast.name} width={300} />
                        
                            <p className={s.itemDescr}>{cast.name}</p>
                            <p className={s.itemDescr}>{cast.character}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default MovieCast;