import { Field, Form, Formik } from "formik";
import { getSearchMovie } from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
const MoviesPage = () => {
    // const [searchMovies, setSearchMovies] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchMovie = searchParams.get("query") || "";

    const handleSearch = ({ query }, { resetForm }) => {
    if (query.trim()) {
        setSearchParams({ query: query.trim() }); 
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
                const dataMovies = await getSearchMovie(searchMovie);
                if (dataMovies.results.length === 0) {
                    return setMovies([]);
                }
                return setMovies(dataMovies.results)
            } catch (error) {
                console.log(error)
            }
        }
        getSearch()
    },[searchMovie])


    const initialValues = {
        query: '',
    }
    return (
        
    <>
        <Formik initialValues={initialValues} onSubmit={handleSearch}>
            <Form>
                <Field name='query' type='text' placeholder='Please, enter the name of the film '/>
                <button type='submit'>Search</button>
            </Form>
            </Formik>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
            {movies.length === 0 && searchMovie && (
                <p>No movies found. Please, try again.</p>)}
    </>
    )
}

export default MoviesPage;