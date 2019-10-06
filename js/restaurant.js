
var operator = getSessionObj("user");
window.restaurant = {};
window.getRestaurant = () => {
    var loadFromDb = getSessionObj("db").restaurant;
    var loadFromSession = getSessionObj("restaurant");
    if (loadFromSession === null) {
        $.each(loadFromDb, (res, data) => {
            if (data.owner === operator.uid) {
                restaurant = data;
                setSessionObj("restaurant", restaurant);
                return false;
            }
        });
    } else {
        restaurant = loadFromSession;
    }
}

var info = "";
window.loadBranch = () => {
    getRestaurant();
    $.each(restaurant.branches, (id, branch) => {
        appendTable(branch);
    });
}

window.appendTable = (branch) => {
    if (branch !== null) {

        var checkbox = branch.stop ? `<input type="checkbox" checked disabled>` : `<input type="checkbox" disabled>`;
        info = `<tr class="tr-hover">
        <th scope="row">${branch.bid}</th>
       <td>${branch.address}</td>
       <td>${branch.tel}</td>
       <td>${branch.join_date}</td>
       <td>${checkbox}</td>
       <td>
           <button type="button" class="btn btn-outline-info btn-edit-restaurant" onclick="editRestaurant(this)" data-toggle="modal"
    data-target="#restaurantModal">Edit</button>
           <button type="button" class="btn btn-outline-danger btn-edit-men" onclick="deleteBranch(this)">Remove</button>
       </td>
    </tr>`;
        $("#restaurant-list").append(info);
    }
}

loadBranch();
