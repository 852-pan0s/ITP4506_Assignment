// the file needs to run with jQuery.
const get = (username, password) => {
    return $.getJSON("../db/users.json").then((data) => {
        return data;
    });
};

export { get }