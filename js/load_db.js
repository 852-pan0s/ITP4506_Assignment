window.loadAllRestaurants = {};
// window.loadAllMenus = {};
window.loadAllUsers = {};
window.loadAllCategories = {};
window.loadAllComments = {};
window.loadData = () => {
//    var operator = getSessionObj("user");
    var loadFromDb = getSessionObj("db").restaurants;
    var loadFromSession = getSessionObj("restaurants");
    if (loadFromSession === null) { //load from db or load from session
        setSessionObj("restaurants", loadFromDb); //set add the restaurant to the session
        loadAllRestaurants = loadFromDb;
    } else {
      loadAllRestaurants = loadFromSession;
    }

    // loadFromDb = getSessionObj("db").menus;
    // loadFromSession = getSessionObj("menus");
    // if (loadFromSession === null) { //load from db or load from session
    //     setSessionObj("menus", loadFromDb); //set add the restaurant to the session
    //     loadAllMenus = loadFromDb;
    // } else {
    //     loadAllMenus = loadFromSession;
    // }

    loadFromDb = getSessionObj("db").users;
    loadFromSession = getSessionObj("users");
    if (loadFromSession === null) { //load from db or load from session
        setSessionObj("users", loadFromDb); //set add the restaurant to the session
        loadAllUsers = loadFromDb;
    } else {
        loadAllUsers = loadFromSession;
    }

    loadFromDb = getSessionObj("db").categories;
    loadFromSession = getSessionObj("categories");
    if (loadFromSession === null) { //load from db or load from session
        setSessionObj("categories", loadFromDb); //set add the restaurant to the session
        loadAllCategories = loadFromDb;
    } else {
        loadAllCategories = loadFromSession;
    }

    loadFromDb = getSessionObj("db").comments;
    loadFromSession = getSessionObj("comments");
    if (loadFromSession === null) { //load from db or load from session
        setSessionObj("comments", loadFromDb); //set add the restaurant to the session
        loadAllComments = loadFromDb;
    } else {
        loadAllComments = loadFromSession;
    }
}
setTimeout(loadData,500);