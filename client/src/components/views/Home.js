import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../elements/Button';

const Home = () => {
    const history = useHistory();
    const goToSignUp = () => history.push('/sign-up');

    return (
        <div className="centered">
            <main id="welcome">
                <h1 id="intro">
                    <span id="app-name">clear</span> is designed to make PDFs, text in images, and paper-based notes easier
                    to read for everyone
                </h1>
                <Button
                    buttonStyle="btn-primary"
                    buttonSize="btn-lg"
                    ariaLabel="Go to Sign Up page"
                    onClick={goToSignUp}
                >
                    Get Started Now
                </Button>
            </main>
        </div>
    )
};

export default Home;