
window.allMenu = {};
window.menu = {};
window.getMenu = () => {
    var operator = getSessionObj("user");
    var loadFromDb = getSessionObj("db").menu;
    var loadFromSession = getSessionObj("menus");
    if (loadFromSession === null) { //load from db or load from session
        setSessionObj("menus", loadFromDb); //set add the menu to the session
        allMenu = loadFromDb;
        $.each(loadFromDb, (res, data) => {
            if (data.owner === operator.uid) {
                menu = data;
                return false;
            }
        });
    } else {
        $.each(loadFromSession, (res, data) => {
            console.log(data.owner+","+operator.uid)
            if (data.owner === operator.uid) {
                menu = data;
                return false;
            }
        });
    }
}

window.saveToMenusSession = () => {
    allMenu[menu.id] = menu;
    setSessionObj("menus", allMenu);
}

var info = "";
window.loadMenu = () => {
    getMenu();
    $("#res-name").val(menu.name);
    $.each(menu.menus, (id, menu) => {
        appendToMenuTable(menu);
    });
}

window.appendToMenuTable = (menu) => {
    if (menu !== null) {
        var remove = menu.id==="m1"? ``:`<button type="button" class="btn btn-outline-danger btn-edit-men" onclick="deleteBranch(this)">Remove</button>`;
        var checkbox = menu.stop ? `<input type="checkbox" checked disabled>` : `<input type="checkbox" disabled>`;
        var img = menu.image.substring(6);
        var special = menu.special !== null? `${menu.special.type} (${menu.special.start_date} To ${menu.special.end_date})`:``
        info = `<tr class="tr-hover">
        <th scope="row">${menu.id}</th>
       <td>${menu.name}</td>
       <td>$${menu.price}</td>
       <td>${img}</td>
       <td>${special}</td>
       <td>${checkbox}</td>
       <td>
           <button type="button" class="btn btn-outline-info btn-edit-editMenu" onclick="editMenu(this)" data-toggle="modal"
    data-target="#menuModal">Edit</button>
           ${remove}
       </td>
    </tr>`;
        $("#menu-list").append(info);
    }
}

loadMenu();
