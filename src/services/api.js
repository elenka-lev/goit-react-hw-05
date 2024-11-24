import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjcxMjNjNDY1YTk0ZTdjM2I1OTQxOGI2NDY1OTIzMCIsIm5iZiI6MTczMjI4MTE2NS40Njk1OTUyLCJzdWIiOiI2NzQwNzU3NzFjZDhjMjQzZTZiZTY5NmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.y47oNhlcgwFOvAGYiJe1rQYWttlD2qmXjq7PfoDarEk';
/*отримуємо список трендових фільмів*/
 const options = {
  headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
    
};
export const getTrendingMovies = async (page=1) => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            ...options, params: {
                page: page,
                
            }
        });
        
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}



/*отримуємо деталі по обраним фільмам з головної сторінки*/
export const getMovieDetails = async (movieId) => {
  try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
      console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



