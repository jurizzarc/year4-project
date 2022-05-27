import React from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../../navigation/navbar.component";
import Button from "../../elements/button/button.component";
import { ReactComponent as WelcomeImg } from "../../../assets/reading-glasses-bro.svg";

import "./home.styles.css";

const Home = () => {
  const history = useHistory();
  const goToSignUp = () => history.push("/sign-up");

  return (
    <>
      <Navbar />
      <div role="main" className="home-container">
        <div className="wrapper">
          <div role="article" className="welcome-msg">
            <h1>Clear, A Reading Application</h1>
            <p>
              Clear is designed to make PDFs, text in images, and paper-based
              notes easier to read for everyone.
            </p>
            <Button
              buttonStyle="btn-primary"
              buttonSize="btn-lg"
              ariaLabel="Click button to go to Sign Up page"
              onClick={goToSignUp}
            >
              Get Started Now
            </Button>
          </div>
          <div className="welcome-img">
            <WelcomeImg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
