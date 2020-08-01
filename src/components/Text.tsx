import styled, { css } from 'styled-components'

export const Text = styled('p')<any>`
    font-size: 16px;
    ${(props) =>
        props.preset === 'title' &&
        css`
            font-size: 28px;
            line-height: 34px;
            font-weight: bold;
            margin: 6px 0;
        `}
    ${(props) =>
        props.preset === 'description' &&
        css`
            color: #9d98cb;
            margin: 14px 0 22px;
        `}
    ${(props) =>
        props.preset === 'descriptionSlim' &&
        css`
            color: #9d98cb;
            margin: 14px 0;
        `}
`
