import styled from "styled-components";
import {Typography} from "@mui/material";

const Section = styled.div`
    margin: 0 10px;
`;

export default function BriefSection(props) {
    const {title, property} = props;

    return (
        <Section>
            <Typography variant="h7" component="h4" sx={{
                textIndent: "1em",
            }}>
                {title}
            </Typography>
            <Typography variant="body1" component="p" sx={{
                textIndent: "2em",
            }}>
                {property}
            </Typography>
        </Section>
    );
}