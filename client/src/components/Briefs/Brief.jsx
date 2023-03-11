import styled from "styled-components";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material";
import {Expand} from "@mui/icons-material";
import BriefSection from "./BriefSection";

export default function Brief(props) {
    const {brief} = props;
    const date = new Date(brief.createdAt);

    return (
        <li>
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
        </li>
    )
}