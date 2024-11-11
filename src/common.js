import genreList from './genreList.json'

const accountID = 0;
const accessToken = '';
alert(accessToken + ' ' + accountID)
const optionsGET = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
};

const optionsPOST = {
	method: 'POST',
	headers: {
	  accept: 'application/json',
	  'Content-Type': 'application/json;charset=utf-8',
	  Authorization: `Bearer ${accessToken}`
	},
	body: ''
};

const moviePosterBaseURL = 'https://image.tmdb.org/t/p/w500/';

function getGenreName(id) { 
    let genre = genreList.find(g => g.id === id); 
    return genre.name;
}

function rateMovie(movieId) {
	
	let rating = parseInt(prompt("Enter a rating between 0 and 100. \nNOTE: The rating will be truncated off to the nearest multiple of 5."));
	rating = (rating - (rating % 5));
	
	if (!rating) return;

	if (rating < 0 || rating > 100) {
		alert("Invalid rating input, the rating must be a number between 0 and 100");
		return;
	};

	const newOptions = optionsPOST;

	newOptions.body = JSON.stringify({value: rating/10});

	console.log(newOptions)

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating`, newOptions)
	.then(res => res.json())
	.then(res => {
		let statusCode = res.status_code;
		
		if (res.success) alert(`The movie was rated ${rating}/100 successfully.`);
		else alert(`Failed to rate the movie. Error Code: ${statusCode}.`)
	})
	.catch(err => alert('Failed to connect to the server.'));
}

async function sendAddToFavoriteRequest(movieId, value) {
	
	let success = false;
	const newOptions = optionsPOST;

	newOptions.body = JSON.stringify({
		media_type: "movie",
		media_id: movieId,
		favorite: value
	})

	await fetch(`https://api.themoviedb.org/3/account/${accountID}/favorite`, newOptions)
	.then(res => res.json())
	.then(res => {
		success = res.success;
	})
	.catch(err => console.error(err));
	return success;
}

export {moviePosterBaseURL, optionsGET, sendAddToFavoriteRequest, getGenreName, accountID, rateMovie}