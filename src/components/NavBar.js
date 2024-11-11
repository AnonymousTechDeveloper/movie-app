import React from 'react'
import { useState, useEffect } from 'react'
import '../css/NavBar.css'
import { optionsGET, accountID } from '../common'
import userImage from '../assets/images/user.png'
import {FaSearch} from 'react-icons/fa'
import {IoIosNotificationsOutline} from "react-icons/io";

export default function NavBar({searchQuery, setSearchQuery}) {
  const [userDetails, setUserDetails] = useState();

  const userProfileAvatarBaseURL = "https://media.themoviedb.org/t/p/w32_and_h32_face/";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/account/${accountID}`, optionsGET)
    .then(res => res.json())
    .then(res => setUserDetails(res))
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='navbar'>
        <div className='navbar-left'>
            <div className='search-bar vertically-centered-element'>
                <label htmlFor='search-field'>
                    <div className='search-icon-wrapper'>
                          <FaSearch className='search-icon' />
                    </div>
                </label>
                <div className='search-field-wrapper'>
                    <input placeholder='Search for Movies' type='text' name='search-field' autoComplete='on' value={searchQuery} onChange={event => {setSearchQuery(event.target.value)}} />
                </div>
            </div>
        </div>
        <div className='navbar-right'>
            <div className='navbar-item-wrapper'>
                <div className='navbar-button vertically-centered-element'>
					<IoIosNotificationsOutline className='navbar-item-button' />
				</div>
      		</div>
			<div className='navbar-item-wrapper'>
				<div className='navbar-profile vertically-centered-element'>
					<span className='navbar-pp-underlay vertically-centered-element'></span>
					<span className='navbar-pp-underlay vertically-centered-element'></span>
					<img className='navbar-profile-pic' src={userDetails ? userProfileAvatarBaseURL + userDetails.avatar.tmdb.avatar_path : userImage} />
					<span className='navbar-user-details'>
						<div>{userDetails ? userDetails.username : "Username"}</div>
						<div>{userDetails ? userDetails.name : "Name"}</div>
					</span>
				</div>
			</div>
    	</div>
  	</div>
  )
}
