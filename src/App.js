import './css/App.css';
import { options } from './common';
import NavBar from './components/NavBar';
import SideMenu from './components/SideMenu';
import MainBody from './components/MainBady';
import MovieDescriptionPopup from './components/MovieDescriptionPopup';
import { useState } from 'react';

function App() {

	const [searchQuery, setSearchQuery] = useState('');

	const [movieDescriptionPopupState, setMovieDescriptionPopupState] = useState(false);
	const [selectedMovieDateForPopup, setSelectedMovieDataForPopup] = useState(null);
	const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  
	const updateMovieDescriptionPopup = (movie) => {
		setMovieDescriptionPopupState(!movieDescriptionPopupState);
		setSelectedMovieDataForPopup(movie);
		console.log(movie, "hehe")
	}
	  
	return (
		<div className='App'>
			<SideMenu />
			<div className='app-content'>
				<NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<MainBody updateMovieDescriptionPopup={updateMovieDescriptionPopup} searchQuery={searchQuery} favoriteMoviesList={favoriteMoviesList} setFavoriteMoviesList={setFavoriteMoviesList} />
			</div>
			{movieDescriptionPopupState && <MovieDescriptionPopup className="movie-description-component" movie={selectedMovieDateForPopup} updateMovieDescriptionPopup={updateMovieDescriptionPopup} favoriteMoviesList={favoriteMoviesList} setFavoriteMoviesList={setFavoriteMoviesList} />}
		</div>
	);
}

export default App;
