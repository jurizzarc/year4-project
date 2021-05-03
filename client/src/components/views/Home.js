import React from 'react';
import WelcomeImg from '../elements/WelcomeImg';
import Button from '../elements/Button';

const Home = () => {

    return (
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
                    >
                        Get Started Now
                    </Button>
                </div>
                <div id="welcome-img">
                    <WelcomeImg />
                </div>
            </div>
        </div>
    );
};

export default Home;