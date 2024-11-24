import { Field, Form, Formik } from "formik";
import { getSearchMovie } from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const MoviesPage = () => {
    const [searchMovies, setSearchMovies] = useState('');
    const [movies, setMovies] = useState([]);
    const handleSearch = (values, options) => {
        const query = values.query;
        setSearchMovies(query);
        setMovies([]);
        options.resetForm();
    }

    useEffect(() => {
        if (!searchMovies) return
    
        const getSearch = async () => {
            try {
                const dataMovies = await getSearchMovie(searchMovies);
                if (dataMovies.results.length === 0) {
                    return setMovies([]);
                }
                return setMovies(dataMovies.results)
            } catch (error) {
                console.log(error)
            }
        }
        getSearch()
    },[searchMovies])


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
    </>
    )
}

export default MoviesPage;