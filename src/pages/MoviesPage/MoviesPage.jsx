import s from './MoviesPage.module.css';
import { Field, Form, Formik } from "formik";
import { getSearchMovie } from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import LoaderBtn from "../../components/LoaderBtn/LoaderBtn";
import Loader from '../../components/Loader/Loader';
const MoviesPage = () => {
    
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchMovie = searchParams.get("query") || "";
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [totalPages, setTotalPages] = useState(0)

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleSearch = ({ query }, { resetForm }) => {
    if (query.trim()) {
        setSearchParams({ query: query.trim() }); 
        setPage(1);
        setMovies([]);
    }
        resetForm();
    }

    useEffect(() => {
         if (!searchMovie) {
            setMovies([]); 
            return;
        }
    
        const getSearch = async () => {
            try {
                setIsLoading(true);
                const dataMovies = await getSearchMovie(searchMovie, page);
                setTotalPages(dataMovies.total_pages)
                if (dataMovies.results.length === 0) {
                    return setMovies([]);
                }
                
                setMovies((prev) => {
                    const newMovies = dataMovies.results.filter(movie => !prev.some(prevMovie => prevMovie.id === movie.id));
                    return [...prev, ...newMovies]
                })
            
                
                
                
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        getSearch()
        
    },[searchMovie, page])


    const initialValues = {
        query: '',
    }
    return (
        
    <div className={s.container}>
        <Formik initialValues={initialValues} onSubmit={handleSearch}>
            <Form className={s.form}>
                    <Field className={s.input} name='query' type='text' placeholder='Please, enter the name of the film '/>
                <button type='submit' className={s.btn}>Search</button>
            </Form>
            </Formik>
           {isLoading && <Loader/>}
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id.toString()}`} state={location} className={s.link}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
             {movies.length > 0 && page < totalPages && (
                <LoaderBtn onClick={handleLoadMore} />)}
            {movies.length === 0 && searchMovie && (
                <p>No movies found. Please, try again.</p>)}
    </div>
    )
}

export default MoviesPage;