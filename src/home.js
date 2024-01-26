import React from "react";
import { useNavigate } from "react-router-dom";
import SearchPage from "./searchPage";
import { navigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      navigate("/search");
    } else {
      navigate("/login");
    }
  };

  const onSignupButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div className="mainContainer">
      {" "}
      {loggedIn ? (
        <SearchPage />
      ) : (
        <>
          <div className="titleContainer">
            <div> Welcome! </div>{" "}
          </div>{" "}
          <div> This is the home page. </div>{" "}
          <div className={"buttonContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={onButtonClick}
              value={loggedIn ? "Log out" : "Log in"}
            />{" "}
            <input
              className={"inputButton"}
              type="button"
              onClick={onSignupButtonClick}
              value="Sign up"
            />
          </div>{" "}
        </>
      )}{" "}
    </div>
  );
};

export default Home;
