import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export async function loginService(login, password) {
    let result;
    await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                let decoded = jwtDecode(data.token);

                Cookies.set("token", data.token);
                Cookies.set("user", decoded.login);

                result = Cookies.get("user");
            } else {
                alert(data.message);
                result = false;
            }
        })
        .catch((err) => {
            console.log(err);
            result = false;
        });
    return result;
}

export function logoutService() {
    Cookies.remove("token");
    Cookies.remove("user");

    if (!Cookies.get("token") && !Cookies.get("user")) {
        return true;
    }
}