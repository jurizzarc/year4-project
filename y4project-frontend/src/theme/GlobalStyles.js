import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --base-line-height: 1.5;
        --smaller-text-size: clamp(0.6944rem, 0.6532rem + 0.2061vw, 0.8rem);
        --small-text-size: clamp(0.8331rem, 0.768rem + 0.3256vw, 1rem);
        --base-font-size: clamp(1rem, 0.9024rem + 0.4878vw, 1.25rem);
        --heading-6: clamp(1.2rem, 1.0585rem + 0.7073vw, 1.5625rem);
        --heading-5: clamp(1.44rem, 1.2398rem + 1.0012vw, 1.9531rem);
        --heading-4: clamp(1.7281rem, 1.4498rem + 1.3915vw, 2.4413rem);
        --heading-3: clamp(2.0738rem, 1.692rem + 1.9085vw, 3.0519rem);
        --heading-2: clamp(2.4881rem, 1.9703rem + 2.589vw, 3.815rem);
        --heading-1: clamp(2.9863rem, 2.2909rem + 3.4768vw, 4.7681rem);

        --margin-md: calc(var(--base-line-height) * 1.5rem);
    }

    body {
        background: ${ ({ theme }) => theme.colors.primary_background };
        color: ${ ({ theme }) => theme.colors.primary_text };
        font-family: 'Cabin', 'Helvetica', sans-serif;
        font-size: var(--base-font-size);
        line-height: var(--base-line-height);
        margin: var(--margin-md) 0.938rem;
    }

    a {
        color: ${ ({ theme }) => theme.colors.link.primary };
        text-decoration: none;
    }

    a:hover {
        color: ${ ({ theme }) => theme.colors.link.primary_hover };
        text-decoration: underline;
        text-decoration-color: ${ ({ theme }) => theme.colors.link.primary };
    }
`;