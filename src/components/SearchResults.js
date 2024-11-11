import React from 'react'
import '../css/ScrollerContainer.css'
import { moviePosterBaseURL, getGenreName } from '../common.js'
import { FaStar } from 'react-icons/fa6'
import { optionsGET } from '../common'
import { useState } from 'react'

export default function SearchResults({searchQuery, updateMovieDescriptionPopup}) {

    const [searchResults, setSearchResults] = useState([]);
    
    if (searchQuery) fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`, optionsGET)
        .then(res => res.json())
        .then(res => setSearchResults(res.results))
        .catch(err => console.error(err));
  
    return (
        searchResults.length ? searchResults.map((movie) => (
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
        )) : <div className='not-found-container'>No results found, <span>NOT</span> something to <span>FLEX</span> about. :(</div>
    )
}
