import React, { useState } from 'react'
import '../css/MainBody.css'
import PopularMovies from './PopularMovies'
import AllTimeHigh from './AllTimeHigh'
import SearchResults from './SearchResults'
import FavoriteMovies from './FavoriteMovies'

export default function MainBady({updateMovieDescriptionPopup, searchQuery, favoriteMoviesList, setFavoriteMoviesList}) {

  return (
    <div className='main-body'>
        {searchQuery ? <div className='main-body-section scroller-section'>
            <h2 className='heading'>Search Results</h2>
            <div className='scroller-container'>
                <SearchResults searchQuery={searchQuery} updateMovieDescriptionPopup={updateMovieDescriptionPopup} />
            </div>
        </div> : ''}
        <div className='main-body-section'>
            <h2 className='heading'>Popular Movies</h2>
            <PopularMovies favoriteMoviesList={favoriteMoviesList} setFavoriteMoviesList={setFavoriteMoviesList} />
        </div>
        <div className='main-body-section scroller-section'>
            <h2 className='heading'>All Time High</h2>
            <div className='scroller-container'>
                <AllTimeHigh updateMovieDescriptionPopup={updateMovieDescriptionPopup} />
            </div>
        </div>
        <div className='main-body-section scroller-section'>
            <h2 className='heading'>Your Favorites</h2>
            <div className='scroller-container'>
                <FavoriteMovies updateMovieDescriptionPopup={updateMovieDescriptionPopup} favoriteMoviesList={favoriteMoviesList} setFavoriteMoviesList={setFavoriteMoviesList} />
            </div>
        </div>
    </div>
  )
}
