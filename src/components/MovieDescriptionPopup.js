import React from 'react'
import { BsDot } from "react-icons/bs";
import { FaStar, FaPlus, FaXmark } from 'react-icons/fa6';
import { rateMovie, sendAddToFavoriteRequest } from '../common';
import '../css/MovieDescriptionPopup.css'
import genreList from '../genreList.json'

export default function MovieDescriptionPopup({movie, updateMovieDescriptionPopup, favoriteMoviesList, setFavoriteMoviesList}) {

	const moviePosterBaseURL = 'https://image.tmdb.org/t/p/w500/';

	function getGenreName(id) { 
		let genre = genreList.find(g => g.id === id); 
		return genre.name;
	}

    let releaseDate = new Date(movie.release_date);
    const movieTags = [releaseDate.getFullYear(), movie.adult ? "18+" : null, "Movie", ...movie.genre_ids.map(id => getGenreName(id))];

    function toggleSave () {
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

    return (
        <>
            <div className='popup-backdrop' onClick={() => updateMovieDescriptionPopup(null)}></div>
            <div className='movie-description-popup-wrapper'>
                <div className='movie-description-popup'>
                    <div className='popup-image-wrapper'>
                        <img className='popup-image' src={moviePosterBaseURL + movie.backdrop_path} />
                        <div className='popup-image-overlay'>
                            <div className='popup-title'>{movie.original_title}</div>
                        </div>
                    </div>
                    {/* first check if movieTag is 'null' (in case of movie rating when it is not 18+) */}
                    <div className='tag-list'>{movieTags.map(movieTag => movieTag ?
                        <>
                            <span>{movieTag}</span>
                            {movieTag !== movieTags[movieTags.length - 1] ? <span><BsDot className='tag-separator-dot vertically-centered-element' /></span> : null} {/*? check if the movieTag is last in the list, if not, add a BsDot as a separator */}
                        </> : null)}
                    </div>
                    <div className='movie-description-text'>{movie.overview}</div>
                    <div className='movie-get-started-button-wrapper'>
                        <div className='movie-get-started-button'>Get Started</div>
                        <div className='popular-movie-save-button' onClick={() => toggleSave(movie)}>{favoriteMoviesList.includes(movie) ? <FaXmark className='vertically-centered-element' /> : <FaPlus className='vertically-centered-element' />}</div>
                        <div className='popular-movie-rate-button' onClick={() => {rateMovie(movie.id)}}><FaStar className='vertically-centered-element' /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
