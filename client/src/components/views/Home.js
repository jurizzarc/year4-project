import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import WelcomeImg from '../elements/WelcomeImg';
import Button from '../elements/Button';

const Home = () => {
    const history = useHistory();
    const goToSignUp = () => history.push('/sign-up');

    return (
        <>
        <Navbar />
        <div role="main" id="home-container">
            <div className="wrapper">
                <div role="article" id="welcome-msg">
                    <h1>Clear, A Reading Application</h1>
                    <p>
                        Clear is designed to make PDFs, text in images, and paper-based notes easier to read for everyone.
                    </p>
                    <Button
                        buttonStyle="btn-primary"
                        buttonSize="btn-lg"
                        ariaLabel="Click to go to Sign Up page"
                        onClick={goToSignUp}
                    >
                        Get Started Now
                    </Button>
                </div>
                <div id="welcome-img">
                    <WelcomeImg />
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;