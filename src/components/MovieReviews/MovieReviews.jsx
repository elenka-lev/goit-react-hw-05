import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import { useEffect, useState } from "react";
import Loader from '../Loader/Loader';
const MovieReviews = () => {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        const getReviews = async () => {
            try {
                setIsLoading(true);
                const dataReviews = await getMovieReviews(movieId);
                setReviews(dataReviews.results);
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        }
        getReviews();
    }, [movieId])
    if (reviews && reviews.length === 0) {
  return <p>No reviews available.</p>;
}
    return (
        <div>
            {isLoading && <Loader/>}
            <ul>
                {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
            </ul>
        </div>
    )
}
export default MovieReviews;