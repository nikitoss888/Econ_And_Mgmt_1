import {useLoaderData} from "react-router-dom";
import Brief from "./Brief";
import styled from "styled-components";

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    
    > li {
        display: block;
        margin-block: 10px;
    }
`;

export default function BriefsList() {
    const briefs = useLoaderData();

    return (
        <List>
            {briefs.map(brief => <Brief key={brief.id.toString(16)} brief={brief} />)}
        </List>
    )
}