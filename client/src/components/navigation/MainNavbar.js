import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import styled from 'styled-components';

const Nav = styled.nav`
    border-bottom: 1px solid ${ ({ theme }) => theme.colors.border.subtle };
    padding-bottom: var(--spacing-05);
`;

const Brand = styled.h6`
    display: inline-block;
`;

const AuthLinks = styled.ul`
    float: right;
    display: block;

    li {
        display: inline;
    }

    li:not(:last-child) {
        margin-right: var(--spacing-05);
    }
`;

export default function MainNavbar() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const login = () => history.push('/login');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        history.push('/');
    };

    return (
        <Nav>
            <Brand>Year 4 Project</Brand>
            <AuthLinks>
                <li>
                    <Link 
                        to="/sign-up"
                        role="button"
                        className="btn btn-primary btn-md"
                    >
                        Sign Up
                    </Link>
                </li>
            </AuthLinks>
        </Nav>
    );
}