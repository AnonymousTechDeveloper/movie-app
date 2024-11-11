import React, { useEffect, useState } from 'react';
import { moviePosterBaseURL, optionsGET, getGenreName } from '../common.js'
import '../css/ScrollerContainer.css'
import { FaStar } from 'react-icons/fa';

export default function AllTimeHigh({updateMovieDescriptionPopup}) {
	
    const [topMovies, setTopMovies] = useState([]);

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', optionsGET)
		.then(res => res.json())
		.then(res => setTopMovies(res.results))
		.catch(err => console.error(err));
	}, []);
	
	return (
		<>
            {topMovies.map((movie) => (
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
            ))}
        </>
    )
}
