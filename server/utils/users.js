


// addUser(id, name, room)
// removeUser(id)
// fetchUser(id)
// getUserList(room)


class Users {
    constructor () {

        this.users = [];

    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;


    }

    removeUser(id) {
        var removedUser = this.fetchUser(id)


        if (removedUser) {
        this.users = this.users.filter((user) => user.id !== id);
        }
        return removedUser;
        



    }
    fetchUser(id) {
        return this.users.filter((user) => user.id ===id)[0];

    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);

        var names = users.map((user) => user.name);

        return names;

    }

};

module.exports = {Users};