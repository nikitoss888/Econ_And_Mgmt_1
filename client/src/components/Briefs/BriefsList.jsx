import {useLoaderData} from "react-router-dom";
import Brief from "./Brief";
import styled from "styled-components";
import React, {useState} from "react";
import Cookies from "js-cookie";
import {Box, Modal, Typography} from "@mui/material";

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BriefsList() {
    const [briefs, setBriefs] = useState(useLoaderData());

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const deleteBrief = async (id) => {
        let token = Cookies.get("token");

        await fetch(
            `/api/brief/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success: ", data);
                setBriefs(briefs.filter(brief => brief.id !== id));
            })
            .catch((error) => {
                console.error("Error:", error);
                setErrorMessage(error.message);
                setError(true);
            });
    }

    return (
        <>
            <List>
                {briefs.map(brief => <Brief key={brief.id.toString(16)} brief={brief} deleteBrief={deleteBrief} />)}
            </List>

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
        </>
    )
}