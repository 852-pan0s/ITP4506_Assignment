window.restaurant = {};
window.getRestaurant = () => {
    var operator = getSessionObj("currentUser");
    var loadFromDb = getSessionObj("db").restaurants;
    var loadFromSession = getSessionObj("restaurants");
    if (loadFromSession === null) { //load from db or load from session
        setSessionObj("restaurants", loadFromDb); //set add the restaurant to the session
        loadAllRestaurants = loadFromDb;
        $.each(loadFromDb, (res, data) => {
            if (data.owner === operator.uid) {
                restaurant = data;
                return false;
            }
        });
    } else {
        loadAllRestaurants = loadFromSession;
        $.each(loadFromSession, (res, data) => {
            // console.log(data.owner+","+operator.uid)
            if (data.owner === operator.uid) {
                restaurant = data;
                return false;
            }
        });
    }
}

window.saveToRestaurantsSession = () => {
    // console.log(loadAllRestaurants[restaurant.id])
    loadAllRestaurants[restaurant.id] = restaurant;
    setSessionObj("restaurants", loadAllRestaurants);
}

var info = "";
window.loadBranch = () => {
    getRestaurant();
    $.each(restaurant.branches, (id, branch) => {
        appendToBranchTable(branch);
    });
}

window.appendToBranchTable = (branch) => {
    if (branch !== null) {
        var remove = branch.bid==="b1"? ``:`<button type="button" class="btn btn-outline-danger btn-edit-men" onclick="deleteBranch(this)">Remove</button>`;
        var checkbox = branch.stop ? `<input type="checkbox" checked disabled>` : `<input type="checkbox" disabled>`;
        info = `<tr class="tr-hover">
        <th scope="row">${branch.bid}</th>
       <td>${branch.address}</td>
       <td>${branch.tel}</td>
       <td>${branch.businessHours.start_time} - ${branch.businessHours.end_time}</td>
       <td>${branch.join_date}</td>
       <td>${checkbox}</td>
       <td>
           <button type="button" class="btn btn-outline-info btn-edit-editBranch" onclick="editBranch(this)" data-toggle="modal"
    data-target="#branchModal">Edit</button>
           ${remove}
       </td>
    </tr>`;
        $("#restaurant-list").append(info);
    }
}

loadBranch();
