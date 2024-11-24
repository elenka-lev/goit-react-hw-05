import './App.css';
import Loader from './Loader/Loader';
import Navigation from '../components/Navigation/Navigation';
// import HomePage from '../pages/HomePage/HomePage';
// import MoviesPage from '../pages/MoviesPage/MoviesPage';
// import NotFound from '../pages/NotFoundPage/NotFoundPage';
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage'; 
// import MovieCast from '../components/MovieCast/MovieCast';
// import MovieReviews from '../components/MovieReviews/MovieReviews';
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const NotFound = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../components/MovieReviews/MovieReviews'));

const App = () => {

  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader/>}>
        
            <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/movies' element={<MoviesPage />} />
                <Route path='/movies/:movieId/' element={<MovieDetailsPage />}>
                    <Route path='cast' element={<MovieCast />} />
                    <Route path='reviews' element={<MovieReviews/>}/>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        
      </Suspense>
      
    </>
  )
}
export default App
