import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}

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

        --spacing-01: calc(var(--base-line-height) * 0.15rem);
        --spacing-02: calc(var(--base-line-height) * 0.25rem);
        --spacing-03: calc(var(--base-line-height) * 0.4rem);
        --spacing-04: calc(var(--base-line-height) * 0.5rem);
        --spacing-05: calc(var(--base-line-height) * 0.65rem);
        --spacing-06: calc(var(--base-line-height) * 0.75rem);
        --spacing-07: calc(var(--base-line-height) * 0.9rem);
        --spacing-08: calc(var(--base-line-height) * 1rem);
        --spacing-09: calc(var(--base-line-height) * 1.5rem);
        --spacing-10: calc(var(--base-line-height) * 2rem);
        --spacing-11: calc(var(--base-line-height) * 2.5rem);
        --spacing-12: calc(var(--base-line-height) * 3rem);
        --spacing-13: calc(var(--base-line-height) * 3.5rem);
        --spacing-14: calc(var(--base-line-height) * 4rem);
        --spacing-15: calc(var(--base-line-height) * 4.5rem);
        --spacing-16: calc(var(--base-line-height) * 5rem);
    }

    body {
        background: ${ ({ theme }) => theme.colors.background.primary };
        color: ${ ({ theme }) => theme.colors.text.primary };
        line-height: var(--base-line-height);
    }

    body, button, input {
        font-family: 'Mulish', 'Helvetica', sans-serif;
        font-size: var(--base-font-size);
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

    h1 { font-size: var(--heading-1); }
    h2 { font-size: var(--heading-2); }
    h3 { font-size: var(--heading-3); }
    h4 { font-size: var(--heading-4); }
    h5 { font-size: var(--heading-5); }
    h6 { font-size: var(--heading-6); }

    .btn-primary {
        background-color: ${ ({ theme }) => theme.colors.button.primary.enabled };
        color: ${ ({ theme }) => theme.colors.button.primary.enabled_label };
        border: 1px solid ${ ({ theme }) => theme.colors.button.primary.enabled_border };
    }

    .btn-primary:hover {
        background-color: ${ ({ theme }) => theme.colors.button.primary.hover };
        color: ${ ({ theme }) => theme.colors.button.primary.hover_label };
        border-color: ${ ({ theme }) => theme.colors.button.primary.hover_border };
    }

    .btn-primary:focus {
        background-color: ${ ({ theme }) => theme.colors.button.primary.focus };
        color: ${ ({ theme }) => theme.colors.button.primary.focus_label };
        border-color: ${ ({ theme }) => theme.colors.button.primary.focus_border };
        -webkit-box-shadow: 0 0 0 4px ${ ({ theme }) => theme.colors.button.primary.focus_outline };
        -moz-box-shadow: 0 0 0 4px ${ ({ theme }) => theme.colors.button.primary.focus_outline };
        box-shadow: 0 0 0 4px ${ ({ theme }) => theme.colors.button.primary.focus_outline };
    }

    .btn-primary:active {
        background-color: ${ ({ theme }) => theme.colors.button.primary.active };
        color: ${ ({ theme }) => theme.colors.button.primary.active_label };
        border-color: ${ ({ theme }) => theme.colors.button.primary.active_border };
    }

    .btn-accessibility {
        background-color: ${ ({ theme }) => theme.colors.button.accessibility.enabled };
        color: ${ ({ theme }) => theme.colors.button.accessibility.enabled_label };
        border: 1px solid ${ ({ theme }) => theme.colors.button.accessibility.enabled_border };
    }

    .btn-accessibility:hover {
        background-color: ${ ({ theme }) => theme.colors.button.accessibility.hover };
        color: ${ ({ theme }) => theme.colors.button.accessibility.hover_label };
        border: 1px solid ${ ({ theme }) => theme.colors.button.accessibility.hover_border };
    }

    .btn-accessibility:focus {
        background-color: ${ ({ theme }) => theme.colors.button.accessibility.focus };
        color: ${ ({ theme }) => theme.colors.button.accessibility.focus_label };
        border-color: ${ ({ theme }) => theme.colors.button.accessibility.focus_border };
        -webkit-box-shadow: 0 0 0 4px ${ ({ theme }) => theme.colors.button.accessibility.focus_outline };
        -moz-box-shadow: 0 0 0 4px ${ ({ theme }) => theme.colors.button.accessibility.focus_outline };
        box-shadow: 0 0 0 4px ${ ({ theme }) => theme.colors.button.accessibility.focus_outline };
    }

    .btn-accessibility:active {
        background-color: ${ ({ theme }) => theme.colors.button.accessibility.active };
        color: ${ ({ theme }) => theme.colors.button.accessibility.active_label };
        border-color: ${ ({ theme }) => theme.colors.button.accessibility.active_border };
    }

    section.danger-alert {
        border: 1px solid ${ ({ theme }) => theme.colors.alert.danger.border };
        background-color: ${ ({ theme }) => theme.colors.alert.danger.background };
    }

    form label {
        color: ${ ({ theme }) => theme.colors.text.form_label };
    }

    form label.required-input::after {
        content: '*';
        margin-left: 0.313rem;
        color: ${ ({ theme }) => theme.colors.text.accent };
    }

    form input.form-field {
        border: 1px solid ${ ({ theme }) => theme.colors.form.default_input_border };
    }

    form input.form-field:focus {
        border-color: hsl(
            ${ ({ theme }) => theme.colors.form.input_focus_h },
            ${ ({ theme }) => theme.colors.form.input_focus_s },
            ${ ({ theme }) => theme.colors.form.input_focus_l }
        );
        -webkit-box-shadow: 0 0 0 2px
            hsla(
                ${ ({ theme }) => theme.colors.form.input_focus_h },
                ${ ({ theme }) => theme.colors.form.input_focus_s },
                calc(${ ({ theme }) => theme.colors.form.input_focus_l } + 40%), 
                0.8
            );
        -moz-box-shadow: 0 0 0 2px
            hsla(
                ${ ({ theme }) => theme.colors.form.input_focus_h },
                ${ ({ theme }) => theme.colors.form.input_focus_s },
                calc(${ ({ theme }) => theme.colors.form.input_focus_l } + 40%), 
                0.8
            );
        box-shadow: 0 0 0 2px
            hsla(
                ${ ({ theme }) => theme.colors.form.input_focus_h },
                ${ ({ theme }) => theme.colors.form.input_focus_s },
                calc(${ ({ theme }) => theme.colors.form.input_focus_l } + 40%), 
                0.8
            );
    }

    form input.has-error {
        border-color: ${ ({ theme }) => theme.colors.form.error_input_border };
    }

    form .error-msg {
        color: ${ ({ theme }) => theme.colors.alert.danger.text };
    }

    div.modal-container {
        background-color: ${ ({ theme }) => theme.colors.background.secondary };
    }
`;