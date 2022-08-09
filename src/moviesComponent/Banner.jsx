import React from "react";

const Banner = () => {
    let [firstMovie, setFirstMovie] = React.useState("");
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

  export default Banner