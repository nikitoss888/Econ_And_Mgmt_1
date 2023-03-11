import BriefForm from "../components/Briefs/BriefForm";
import styled from "styled-components";
import {Typography} from "@mui/material";

const HomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
`;

export default function Home() {
    return (
        <HomeDiv>
            <Typography variant="h3" component="h1" gutterBottom>
                Бріф-опитування
            </Typography>
            <BriefForm />
        </HomeDiv>
    );
}