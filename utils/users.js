const users = [];

// Join user to game
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

function getCurrUser(id) {
    return users.find(user => user.id === id);
}

module.exports = { userJoin, getCurrUser }