import styled from 'styled-components'

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
`
