import {Link, useRouteError} from "react-router-dom";
import styled from "styled-components";

const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <ErrorWrapper>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <p>
                Return to <Link to="/">Home</Link>
            </p>
        </ErrorWrapper>
    );
}