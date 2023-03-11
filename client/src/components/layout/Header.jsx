import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useState} from "react";
import {Link, Typography} from "@mui/material";
import Cookies from "js-cookie";

const HeaderElement = styled.header`
    background-color: #3f51b5;
    color: white;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  
    & > :last-child {
        margin-left: auto;
    }
`;

const UserGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    > a, > button {
        margin-left: 10px;
    }
`;

export default function Header() {
    const [user, setUser] = useState(Cookies.get("user"));

    return (
        <HeaderElement>
            <Link href="/" variant="h6"  sx={{
                color: "white",
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline"
                }
            }}>
                Briefer
            </Link>
            {(user) ?
                <UserGroup>
                    <Link href="/briefs" variant="h6" sx={{
                        color: "white",
                        textDecoration: "none",
                        "&:hover": {
                            textDecoration: "underline"
                        }
                    }}>
                        {user}
                    </Link>
                    <LogoutButton setUser={setUser} />
                </UserGroup>:
                <LoginButton setUser={setUser} />
            }
        </HeaderElement>
    );
}