import styled from "styled-components";

const FooterElement = styled.footer`
    background-color: #3f51b5;
    color: white;
    padding: 10px;
    text-align: center;
`;

export default function Footer() {
    const fullYear = new Date().getFullYear();
    return (
        <FooterElement>
            <p>Brief Form</p>
            <p>© Oleksiichuk Mykyta, 2023{fullYear !== 2023 ? "-"+fullYear : null}</p>
        </FooterElement>
    );
}