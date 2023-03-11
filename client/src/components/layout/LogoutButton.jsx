import {Button} from "@mui/material";
import React from "react";
import {logoutService} from "../../service/AuthService";
import {useNavigate} from "react-router-dom";

export default function LogoutButton(props) {
    const {setUser} = props;
    const navigate = useNavigate();

    const logout = () => {
        let result = logoutService();
        if (result) {
            setUser(undefined);
            if (window.location.pathname !== "/") {
                navigate("/");
            }
        }
    }

    return (
        <Button variant="contained" onClick={logout}>Вийти</Button>
    );
}