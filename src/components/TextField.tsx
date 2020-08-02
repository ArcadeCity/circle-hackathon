import styled, { css } from 'styled-components'

export const TextField = styled('input')<any>`
    font-size: 16px;
    height: 24px;
    color: #eeecfb;
    background-color: #2d2252;
    line-height: 22px;
    height: 38px;
    border-radius: 8px;
    box-shadow: none !important;
    border: 1px solid #120b29 !important;
    margin: 4px 0 8px;
    padding: 6px 16px;
    text-align: center;
    ::placeholder {
        color: #9d98cb;
        opacity: 1;
    }
    :-ms-input-placeholder {
        color: #9d98cb;
    }

    ::-ms-input-placeholder {
        color: #9d98cb;
    }

    ${(props) =>
        props.preset === 'title' &&
        css`
            font-size: 28px;
            line-height: 34px;
            font-weight: bold;
            margin: 6px 0;
        `}
`
