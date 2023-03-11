import styled from "styled-components";
import {Typography} from "@mui/material";
import BriefsList from "../components/Briefs/BriefsList";
import {useLoaderData} from "react-router-dom";

const AnswersDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    padding: 20px;
`;

export default function Briefs() {
    const briefs = useLoaderData();

    return (
        <AnswersDiv>
            <Typography variant="h3" component="h1" gutterBottom>
                Відповіді
            </Typography>
            <BriefsList briefs={briefs} />
        </AnswersDiv>
    );
}