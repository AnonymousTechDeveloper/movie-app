import { useState, useEffect } from 'react'
import { BsDot } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight, FaPlus, FaStar, FaXmark } from 'react-icons/fa6'
import { moviePosterBaseURL, optionsGET, getGenreName, rateMovie, sendAddToFavoriteRequest } from '../common.js'
import '../css/PopularMovies.css'
import FavoriteMovies from './FavoriteMovies.js'

export default function PopularMovies({favoriteMoviesList, setFavoriteMoviesList}) {
    
    const [popularMovies, setPopularMovies] = useState([{
        "adult": false,
        "backdrop_path": "",
        "genre_ids": [],
        "id": 0,
        "original_language": "en",
        "original_title": null,
        "overview": "",
        "popularity": null,
        "poster_path": "",
        "release_date": null,
        "title": "Loading",
        "video": false,
        "vote_average": 8.707,
        "vote_count": 27074
    }]);


    let popularMoviesLength = popularMovies.length;

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', optionsGET)
		.then(res => res.json())
		.then(res => {setPopularMovies(res.results); popularMoviesLength = res.results.length;})
		.catch(err => console.error(err));
        
        let interval = setInterval(nextMovie, 9000);

        return () => clearInterval(interval);
	}, []);
    
    function toggleSave (movie) {
        setFavoriteMoviesList((favoriteMoviesList) => {
            let searchIndex = favoriteMoviesList.indexOf(movie);
            if (searchIndex === -1) {
                if (sendAddToFavoriteRequest(movie.id, true)) return [...favoriteMoviesList, movie]
                else alert("Failed to add this movie to your favorites.");
            }
            else {
                if (sendAddToFavoriteRequest(movie.id, false)) {
                    let newfavoriteMoviesList = [...favoriteMoviesList];
                    newfavoriteMoviesList.splice(searchIndex, 1);
                    return newfavoriteMoviesList;
                }
                else alert("Failed to remove this movie from your favorites.");
            }
            return favoriteMoviesList;
        })
    }

    const nextMovie = () => {setSelectedPopularMovieIndex((previousMovieIndex) => previousMovieIndex === popularMoviesLength - 1 ? 0 : previousMovieIndex + 1)};
    const previousMovie = () => {setSelectedPopularMovieIndex((previousMovieIndex) => previousMovieIndex === 0 ? popularMoviesLength - 1 : previousMovieIndex - 1)};

	const [selectedPopularMovieIndex, setSelectedPopularMovieIndex] = useState(0);

    let releaseDate = new Date(popularMovies[selectedPopularMovieIndex].release_date);
    const movieTags = [releaseDate.getFullYear(), popularMovies[selectedPopularMovieIndex].adult ? "18+" : null, "Movie", ...popularMovies[selectedPopularMovieIndex].genre_ids.map(id => getGenreName(id))];

    return (
        <div className='popular-movies-container' style={{backgroundImage: `url(${moviePosterBaseURL + popularMovies[selectedPopularMovieIndex].backdrop_path})`}}>
            <div className='popular-movie-info'>
                <div className='popular-movie-title'>{popularMovies[selectedPopularMovieIndex].title || 'Fucking Title'}</div>
                <div className='movie-taglist'>{movieTags.map(movieTag => movieTag ?
                        <>
                            <span>{movieTag}</span>
                            {movieTag !== movieTags[movieTags.length - 1] ? <span><BsDot className='tag-separator-dot vertically-centered-element' /></span> : null} {/*? check if the movieTag is last in the list, if not, add a BsDot as a separator */}
                        </> : null
                    )}
                </div>
                <div className='popular-movie-description-text'>{popularMovies[selectedPopularMovieIndex].overview || 'Yada yada shit'}</div>
                <div className='popular-movie-button-wrapper'>
                    <div className='popular-movie-get-started-button'>Get Started</div>
                    <div className='popular-movie-save-button' onClick={() => toggleSave(popularMovies[selectedPopularMovieIndex])}>{favoriteMoviesList.includes(popularMovies[selectedPopularMovieIndex]) ? <FaXmark className='vertically-centered-element' /> : <FaPlus className='vertically-centered-element' />}</div>
                    <div className='popular-movie-rate-button' onClick={() => rateMovie(popularMovies[selectedPopularMovieIndex].id)}><FaStar className='vertically-centered-element' /></div>
                </div>
                <div className='nav-button-container'>
                    <div className='nav-button' onClick={previousMovie}><FaChevronLeft /></div>
                    <div className='nav-button' onClick={nextMovie}><FaChevronRight /></div>
                </div>
            </div>
        </div>
    )
}
