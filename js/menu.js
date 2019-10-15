import "./restaurant.js";
window.menu = restaurant.menus;
// window.getMenu = () => {
//     var operator = getSessionObj("currentUser");
//     var loadFromDb = getSessionObj("db").menus;
//     var loadFromSession = getSessionObj("menus");
//     if (loadFromSession === null) { //load from db or load from session
//         setSessionObj("menus", loadFromDb); //set add the menu to the session
//         loadAllMenus = loadFromDb;
//         $.each(loadFromDb, (res, data) => {
//             if (data.owner === operator.uid) {
//                 menu = data;
//                 return false;
//             }
//         });
//     } else {
//         loadAllMenus = loadFromSession;
//         $.each(loadFromSession, (res, data) => {
//             // console.log(data.owner+","+operator.uid)
//             if (data.owner === operator.uid) {
//                 menu = data;
//                 return false;
//             }
//         });
//     }
// }

// const getMenuObjName = (id) => {
//     var name = "";
//     $.each(loadAllMenus, (key, value) => {
//         if (value.owner === id) {
//             // console.log(key)
//             return name = key;
//         }
//     });
//     return name;
// }

window.saveToMenusSession = () => {
    loadAllRestaurants[restaurant.id].menus = menu;
    saveToRestaurantsSession();
}

var info = "";
window.loadMenu = () => {
    $("#res-name").val(menu.name);
    $.each(menu, (id, menu) => {
        appendToMenuTable(menu);
    });
}

window.appendToMenuTable = (menu) => {
    if (menu !== null) {
        var remove = menu.id === "m1" ? `` : `<button type="button" class="btn btn-outline-danger btn-edit-men" onclick="deleteMenu(this)">Remove</button>`;
        var checkbox = menu.show ? `<input type="checkbox" checked disabled>` : `<input type="checkbox" disabled>`;
        var img = menu.image;
        var special = null
        switch (menu.special.type) {
            case "Special":
            case "Temporary":
                special = `${menu.special.type} (${menu.special.start_date} - ${menu.special.end_date})`;
                break;
            case "Season":
                special = `${menu.special.type} (${menu.special.season})`;
                break;
            default:
                special = `--None--`;

        }
        info = `<tr class="tr-hover">
        <th scope="row">${menu.id}</th>
       <td>${menu.name}</td>
       <td>$${menu.price}</td>
       <td onmouseenter="showImgPreview(this)" onmouseleave="hideImgPreview(this)" data-placement="top" data-content="<h6>Preview:</h6><hr> <img src='./img/food_drink/${img}' class='preview' >" data-html="true">${img}</td>
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
