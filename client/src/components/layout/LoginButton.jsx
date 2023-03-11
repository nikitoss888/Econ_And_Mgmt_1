import React, { useState } from "react";
import {TextField, Button, Modal, Box, Typography} from "@mui/material";
import {loginService} from "../../service/AuthService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    '> *:not(:last-child)': {
        marginBottom: "20px",
    }
};

export default function LoginButton(props) {
    const {setUser} = props;

    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogin = async () => {
        if (login === "" || password === "") {
            alert("Заповніть всі поля");
            return;
        }

        let result = await loginService(login, password);
        if (!result) {
            alert("Невірний логін або пароль");
            setUser(undefined);
            return;
        }

        setUser(result);
    }

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Логін</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Логін
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Логін"
                        variant="outlined"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Пароль"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={"password"}
                    />
                    <Button variant="contained" onClick={handleLogin}>Увійти</Button>
                </Box>
            </Modal>
        </>
    );
}