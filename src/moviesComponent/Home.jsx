import React from "react";
import "./header.css";
import "./Banner.css";
import "./movieList.css";
import { results } from "../movies";
import { useState } from "react";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <MovieList></MovieList>
      <Pagination></Pagination>
    </>
  );
};

const Header = () => {
  return (
    <>
      <div className="flex">
        <img
          src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png"
          alt=""
        ></img>
      </div>
    </>
  );
};

const Banner = () => {
  let [firstMovie, setFirstMovie] = useState("");
  React.useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        "https://api.themoviedb.org/3/trending/all/week?api_key=0d6533791d97a0752840c172bb82f268"
      );
      let data = await response.json();
      console.log(data);

      let movies = data.results;
      // console.log("movies", movies)
      setFirstMovie(movies[0]);
    }
    fetchData();
  }, []);

  return (
    <>
      {firstMovie === "" ? (
        <h2>Movies are yet to come</h2>
      ) : (
        <>
          {console.log(firstMovie.original_title)}
          <h2>{firstMovie.original_title}</h2>
          <img
            src={
              "https://image.tmdb.org/t/p/original" + firstMovie.backdrop_path
            }
            className="banner_img"
            alt=""
          ></img>
        </>
      )}
    </>
  );
};

const MovieList = () => {
  let [movies, setMovie] = React.useState("");
  let [value, setValue] = React.useState("");
  function setText(e) {
      let newValue = e.target.value;
      setValue(newValue);

  }
  React.useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        "https://api.themoviedb.org/3/trending/all/week?api_key=0d6533791d97a0752840c172bb82f268"
      );
      let data = await response.json();
      console.log(data);

      // console.log("movies", movies)
      let movies = data.results;
      // console.log("movies", movies)
      setMovie(movies);
    }
    fetchData();
  }, []);
  function filterLogic (searchText ,movieArray){
    
   
    let filteredMovieArray = [];
    for (let i = 0; i < movieArray.length; i++) {
      // console.log(movieArray[i])
        let upperSearchText = searchText.toUpperCase();
        let movieName = movieArray[i].original_title;
       
        if(movieName!==undefined){
        var upperText = movieName.toUpperCase();
        }
        
        let ans = upperText.includes(upperSearchText);
        if (ans === true) {
            filteredMovieArray.push(movieArray[i]);
        }
    }
    return filteredMovieArray;
  }
  let searchedMovies=filterLogic(value,movies);
  // console.log(searchedMovies);

  return (
    <>
      <h1>Trending movies</h1>
      <input onChange={setText} value={value}></input>
      {movies === "" ? (
        <h1>loading</h1>
      ) : (
        <div className="trending_box">
          {searchedMovies.map((movieObj, idx) => {
            return (
              <div key={idx} className="poster_box">
                <h2>{movieObj.original_title}</h2>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500/" + movieObj.poster_path
                  }
                  className="poster_img"
                  alt=""
                ></img>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
const Pagination = () => {
  return <>Home</>;
};

function UseffectExplainer() {
  let [count, setCount] = React.useState(0);
  let [count5, setCount5] = React.useState(0);
  // lifecyle method
  console.log("fn is executed");
  function effectFn() {
    console.log("I am an effect");
  }
  function incrementCount() {
    setCount(count + 1);
  }
  function incrementCount5() {
    setCount5(count + 5);
  }

  // 1. it is a hook that executes a fn passed into it after
  // first render only once ->
  // React.useEffect(effectFn, [])

  // 2. it is a hook that executes a fn passed into it after
  //    first render and everytime when state of
  //     any state var changes
  //    React.useEffect(effectFn);

  // 3.it is a hook that executes a fn passed into it after
  //   first render and everytime when state of a
  //   state variable that is passed in dependency array
  //   is changed
  // React.useEffect(effectFn, [count])

  return (
    <>
      <h1> I am banner</h1>
      {console.log("render is done")}
      <div>Main count {count}</div>
      <button onClick={incrementCount}>+</button>
      <div>Main count {count5}</div>
      <button onClick={incrementCount5}>+5</button>
    </>
  );
}

export default Home;
