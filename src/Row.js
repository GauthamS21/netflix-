import React, { useState , useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css';
import Youtube from "react-youtube";

const base_url= "https://image.tmdb.org/t/p/original";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

 // Options for react-youtube
 const opts = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1,
    },
};
    
// ASnippet of code which runs based on a specific condition
    
useEffect(() => { 

// if [], runs once when the row loads, and dont run again

async function fetchData() {
const request = await axios.get(fetchUrl);
setMovies(request.data.results);
return request;
 }
 fetchData();
    }, [fetchUrl] );

    const handeleClick = async (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerUrl = await axios.get(
                `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
            );
            setTrailerUrl(trailerUrl.data.results[0]?.key);
        }
    };



    return (

        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
            {/*several row posters*/}
                {movies.map((movie) => movie.backdrop_path!== null && (
                <img 
                className= {`row_poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow? movie.poster_path: movie.backdrop_path}`}
                alt={movie.name}
                key={movie.id}
                onClick={() => handeleClick(movie)}
                />
                ))}
            </div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
