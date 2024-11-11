import React, { useEffect } from 'react'
import { moviePosterBaseURL, getGenreName, optionsGET } from '../common'
import { FaStar } from 'react-icons/fa6'
import '../css/ScrollerContainer.css'

export default function FavoriteMovies({updateMovieDescriptionPopup, favoriteMoviesList, setFavoriteMoviesList}) {

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/account/21615540/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', optionsGET)
        .then(res => res.json())
        .then(res => setFavoriteMoviesList(res.results))
        .catch(err => console.error(err));
    }, [])

    return (
		<>
            {favoriteMoviesList.length ? favoriteMoviesList.map((movie) => (
                <div className='movie-card' onClick={() => {console.log(updateMovieDescriptionPopup(movie))}} style={{backgroundImage: `linear-gradient(transparent, #000a, black), url(${moviePosterBaseURL + movie.backdrop_path})`}}>
					<div className='movie-card-desciption'>
						<div className='movie-card-title'>{movie.title}</div>
						<div className='movie-card-info-container'>
							<div className='movie-card-genre-list'>{movie.genre_ids.map(genre_id => <span>{getGenreName(genre_id)}{genre_id === movie.genre_ids[movie.genre_ids.length - 1] ? '' : ','}</span>)}</div>
							<div className='movie-card-rating'><FaStar className='rating-star' /> {movie.vote_average.toFixed(1)}</div>
						</div>
					</div>
					{movie.adult ? <div className='adult-rating-label'>18+</div> : null}
                </div>
            )) : <div className='not-found-container'>Damn, you got no favorites here. Go and start picking up your likes right now!</div>}
        </>
    )
}
