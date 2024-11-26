import s from './HomePage.module.css'
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import LoaderBtn from "../../components/LoaderBtn/LoaderBtn";
import Loader from "../../components/Loader/Loader";
// import { Link } from "react-router-dom";
import MovieList from '../../components/MoviesList/MovieList';
const HomePage = () => {
    /*отримаємо список фільмів*/
    const [movies, setMovies] = useState([]);
    /*отримаємо загрузити ще*/
    const [isLoading, setIsLoading] = useState(false);
    /*отримаємо кількість сторінок*/
    const [page, setPage] = useState(1);
    /*Загальна кількість сторінок*/
    const [totalPage, setTotalPage] = useState(0)

    /*Функція для кнопки загрузити ще*/
    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
    
    useEffect(() => {
        const getMovies = async () => {
            try {
                setIsLoading(true)
                const data = await getTrendingMovies(page);

                /*Робимо фільтр фільмів, щоб не повторювалися*/
                
                
                setMovies((prev) => {
                    const newMovies = data.results.filter(movie => !prev.some(prevMovie => prevMovie.id === movie.id));
                    return [...prev, ...newMovies]
                })
                setTotalPage(data.total_pages)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        getMovies();
    }, [page])
    return (
        <div className={s.container}>
            <h1>Trending Movies</h1>
            {isLoading && <Loader />}
            {!isLoading  && <MovieList movies={movies} />}
        {movies.length > 0 && page < totalPage && (
        <LoaderBtn onClick={handleLoadMore} />
        )}
        </div>
    )
}
export default HomePage;