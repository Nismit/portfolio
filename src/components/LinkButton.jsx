import Link from 'next/link';
import styled from "@emotion/styled";

const LinkButton = ( props ) => {
    const { path, blank, className, title } = props;

    return (
        <Link href={path}>
            <_LinkStyle className={className} {...(blank ? `target="blank" rel="noopener"` : {})} >{title}</_LinkStyle>
        </Link>
    )
}

const _LinkStyle = styled.a`
    display: inline-block;
    width: 100%;
    border: 1px solid #fff;
    font-family: 'DIN condensed';
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    margin-top: 1.5rem;
    padding: 1.22rem 1rem;
    letter-spacing: 2px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    transition: color 300ms ease-in;

    &::before,
    &::after {
        content: '';
        width: 0%;
        height: 100%;
        background-color: rgba(255, 255, 255, 1);
        position: absolute;
        top: 0;
        transition: width 300ms ease-in;
        opacity: 0;
        z-index: -1;
    }

    &::before {
        left: 0;
    }

    &::after {
        right: 0;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: #121212;

            &::before,
            &::after {
                opacity: 1;
                width: 50%;
            }
        }
    }

    @media (min-width: 45.176em) {
        width: 320px;
    }
`;

export default LinkButton;
