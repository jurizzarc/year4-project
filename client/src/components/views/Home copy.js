import React from 'react';
import styled from 'styled-components';
import MainNavbar from '../navigation/MainNavbar';

const Main = styled.main`
    margin-top: var(--spacing-06);
`;

export default function Home() {
    return (
        <>
            <MainNavbar />
            <Main>
                <h4>Home Page</h4>
            </Main>
        </>
    );
}