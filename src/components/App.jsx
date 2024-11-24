import './App.css';
import Navigation from '../components/Navigation/Navigation';
import HomePage from '../pages/HomePage/HomePage';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import NotFound from '../pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage'; 
import MovieCast from '../components/MovieCast/MovieCast';
import MovieReviews from '../components/MovieReviews/MovieReviews';
import { Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <>
      <Navigation />
      
          <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/movies' element={<MoviesPage />} />
              <Route path='/movies/:movieId/' element={<MovieDetailsPage />}>
                  <Route path='cast' element={<MovieCast />} />
                  <Route path='reviews' element={<MovieReviews/>}/>
              </Route>
              <Route path="*" element={<NotFound />} />
          </Routes>
      
      
    </>
  )
}
export default App
