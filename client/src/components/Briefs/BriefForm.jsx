import React, { useState } from "react";
import {TextField, Button, Modal, Box, Typography} from "@mui/material";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  
    > div {
        width: 100%;
        margin-bottom: 20px;
    }
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function BriefForm() {
    const [formData, setFormData] = useState({
        name: "", description: "", budget: "", deadline: "", client: "", functionality: "",
        platforms: "", integrations: "", design: "", security: "", architecture: "", database: "",
        scalability: "", performance: "", testing: "", deployment: "", maintenance: "", additional: "",
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        fetch(
            "http://localhost:5000/api/brief", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setSuccess(true);
            })
            .catch((error) => {
                console.error("Error:", error);
                setErrorMessage(error.message);
                setError(true);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TextField
                required
                label="Назва проекту"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Опис проекту"
                multiline
                rows={8}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Бюджет"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Термін виконання"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Контактна особа"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Функціональність"
                name="functionality"
                multiline
                rows={6}
                value={formData.functionality}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Платформи"
                name="platforms"
                multiline
                rows={4}
                value={formData.platforms}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Інтеграції"
                name="integrations"
                multiline
                rows={4}
                value={formData.integrations}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Дизайн"
                name="design"
                multiline
                rows={8}
                value={formData.design}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Безпека"
                name="security"
                multiline
                rows={8}
                value={formData.security}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Архітектура"
                name="architecture"
                multiline
                rows={8}
                value={formData.architecture}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="База даних"
                name="database"
                multiline
                rows={4}
                value={formData.database}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Масштабованість"
                name="scalability"
                multiline
                rows={6}
                value={formData.scalability}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Бажана продуктивність"
                name="performance"
                multiline
                rows={6}
                value={formData.performance}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="План тестування"
                name="testing"
                multiline
                rows={10}
                value={formData.testing}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="План розгортання"
                name="deployment"
                multiline
                rows={10}
                value={formData.deployment}
                onChange={handleInputChange}
            />
            <TextField
                required
                label="Технічне обслуговування"
                name="maintenance"
                multiline
                rows={8}
                value={formData.maintenance}
                onChange={handleInputChange}
            />
            <TextField
                label="Додатково"
                name="additional"
                multiline
                rows={20}
                value={formData.additional}
                onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" type="submit">
                Надіслати
            </Button>

            <Modal open={success} onClose={() => setSuccess(false)}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Повідомлення успішно надіслано
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Ми зв'яжемося з Вами найближчим часом
                    </Typography>
                </Box>
            </Modal>
            <Modal open={error} onClose={() => setError(false)}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Помилка
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Typography>
                </Box>
            </Modal>
        </Form>
    );
}

export default BriefForm;