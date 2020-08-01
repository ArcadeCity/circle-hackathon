import styled, { css } from 'styled-components'

export const Button = styled('button')<any>`
    background: #5b20f2;
    color: white;
    border-radius: 3px;
    border: 2px solid #5b20f2;
    margin: 0.75em 1em;
    padding: 1.15em 2em;
    min-width: 200px;
    font-weight: bold;
    &:active {
        opacity: 0.7;
    }
    ${(props) =>
        props.secondary &&
        css`
            color: #5b20f2;
            margin: 14px 0 22px;
            background: #eeecfb;
            shadow-color: 'rgba(120, 101, 182, 0.12)';
        `}

    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.5;
        `}
`
