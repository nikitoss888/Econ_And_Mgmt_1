import {Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import BriefSection from "./BriefSection";
import React from "react";
import styled from "styled-components";

const ListElement = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    width: 100%;
    margin-block: 10px;
`;

export default function Brief(props) {
    const {brief, deleteBrief} = props;
    const date = new Date(brief.createdAt);

    const deleteHandler = () => {
        console.log("Delete brief with id: " + brief.id);
        deleteBrief(brief.id);
    }

    return (
        <ListElement>
            <Accordion
                id={brief.id.toString(16)}
                sx={{
                    width: 1,
            }}>
                <AccordionSummary>
                    <Typography variant="h6" component="h3">
                        {brief.name} (#{brief.id}, {date.toLocaleDateString()})
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{
                    "& > :not(:last-child)": {
                        marginBottom: 1
                    }
                }}>
                    <Button onClick={deleteHandler} variant={"contained"} color={"error"}>
                        Видалити
                    </Button>

                    <BriefSection title="Опис проекту" property={brief.description} />
                    <BriefSection title="Бюджет" property={brief.budget} />
                    <BriefSection title="Термін виконання" property={brief.deadline} />
                    <BriefSection title="Контактна особа" property={brief.client} />
                    <BriefSection title="Функціональність" property={brief.functionality} />
                    <BriefSection title="Платформи" property={brief.platforms} />
                    <BriefSection title="Інтеграції" property={brief.integrations} />
                    <BriefSection title="Дизайн" property={brief.design} />
                    <BriefSection title="Безпека" property={brief.security} />
                    <BriefSection title="Архітектура" property={brief.architecture} />
                    <BriefSection title="База даних" property={brief.database} />
                    <BriefSection title="Масштабованість" property={brief.scalability} />
                    <BriefSection title="Бажана продуктивність" property={brief.performance} />
                    <BriefSection title="План тестування" property={brief.testing} />
                    <BriefSection title="План розгортання" property={brief.deployment} />
                    <BriefSection title="Технічне обслуговування" property={brief.maintenance} />
                    <BriefSection title="Додатково" property={brief.additional} />
                </AccordionDetails>
            </Accordion>
        </ListElement>
    )
}