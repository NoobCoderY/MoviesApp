import { Link } from "react-router-dom";

const Header = () => {
    return (
      <>
        <div className="flex">
          <img
            src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png"
            alt=""
          ></img>
          <Link to="/home">
                <h2>Movies</h2>
            </Link>
            <Link to="/favourite">
                <h2>Favorites</h2>
            </Link>
        </div>
      </>
    );
  };

  export default Header