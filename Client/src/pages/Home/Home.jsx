import "./Home.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;
  return (
    <div className="home">
      <div className="home__container">
        <h2>Be more organized</h2>
        <h3>Be more productive</h3>

        {currentUser && currentUser.token ? (
          <Link to="/task" className="button">
            Get Started
          </Link>
        ) : (
          <Link to="/login" className="button">
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
