// the file needs to run with jQuery.
// import { Login } from "login";

var login = (username, password) => {
    return $.getJSON("../db/users.json").then((data) => {
        $.each(data, (type, values) => {
            $.each(values, (id, userInfo) => {
                if (username === userInfo.username && password === userInfo.password) {
                    console.log("login!!")
                    return true;
                };
            });
        });
        return false;
    }
    );
};

export { login }