import React from "react";

const MovieList = (props) => {
    let [movies, setMovie] = React.useState("");
    let [value, setValue] = React.useState("");
    let [favourites, setFavourite] = React.useState([]);

    function setText(e) {
        let newValue = e.target.value;
        setValue(newValue);
  
    }

    function cheakToFavourite(movieId)
    {
          for(let i=0;i<favourites.length;i++)
          {
            if(movieId===favourites[i].id)
            {
              return true;
            }
          }
          return false;
    }

    function  deleteFavoriteHandlers(movieId){
      let filteredFavourite=favourites.filter((movieObj)=>{
        return  movieObj.id !=movieId

      })
      setFavourite(filteredFavourite)

    }

    function setToFavouriteHandlers(movieId) {
      console.log("add", movieId);
      for (let i = 0; i < movies.length; i++) {
          let movieObj = movies[i];
          if (movieObj.id ===movieId) {
              // [..favorites,movieobj]
              let newfavourites = [...favourites];
              newfavourites.push(movieObj);
              setFavourite(newfavourites);
              break;
          }
      }
  }
    React.useEffect(() => {
      async function fetchData() {
        let response = await fetch(
          "https://api.themoviedb.org/3/trending/all/week?api_key=0d6533791d97a0752840c172bb82f268&page=" + props.pageNo
        );
        let data = await response.json();
        console.log(data);
  
        // console.log("movies", movies)
        let movies = data.results;
        // console.log("movies", movies)
        setMovie(movies);
      }
      fetchData();
    }, [props.pageNo]);
    function filterLogic (searchText ,movieArray){
      
     
      let filteredMovieArray = [];
      for (let i = 0; i < movieArray.length; i++) {
        // console.log(movieArray[i])
          let upperSearchText = searchText.toUpperCase();
          let movieName = movieArray[i].original_title;
         
          if(movieName!==undefined){
          var upperText = movieName.toUpperCase();
          }
          if(movieName!==undefined){
          var ans = upperText.includes(upperSearchText);
          }
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
                  { cheakToFavourite(movieObj.id)===true?
                   <i className="fa-solid fa-xmark"
                                                onClick={() => { deleteFavoriteHandlers(movieObj.id) }}
                                            ></i> :
                                            <i className="fa-solid fa-face-grin-hearts"
                                                onClick={() => { setToFavouriteHandlers(movieObj.id) }}
                                            ></i>
                  }
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  };

  export default  MovieList