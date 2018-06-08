const expect = require('expect');

const {Users} = require('./users.js');



describe('Users', () => {
    var users;
    beforeEach( () => {
        users = new Users();
        users.users = [
            {
                id: '123',
                name: 'Tom',
                room: 'A'
            },
            {
                id: '234',
                name: 'Ricky',
                room: 'A'
            },

            {
                id: '345',
                name: 'Dan',
                room: 'B'
            }];
        }
    );

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: 'uq8BYRBIKXQY3be3v6t',
            name: 'Ricky',
            room: 'Tesla Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        expect(resUser).toEqual(user);

    });


    it('Should return list of names filtered by room A',() => {
        var usersList = users.getUserList('A');
        expect(usersList).toEqual(['Tom', 'Ricky']);
    });

    it('Should return list of names filtered by room B',() => {
        var usersList = users.getUserList('B');
        expect(usersList).toEqual(['Dan']);
    });

    it('Should remove a user', () => {
        var removedUser = users.removeUser('123');
        expect(removedUser.name).toBe('Tom');
        
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user', () => {
        var removedUser = users.removeUser('23');
        expect(removedUser).toNotExist();
        
        expect(users.users.length).toBe(3);
    });

    it('Should fetch user by ID', () => {
        var user = users.fetchUser('123');

        expect(user).toBe(users.users[0]);
    });

    it('Should not fetch non existant user by ID', () => {
        var user = users.fetchUser('23');

        expect(user).toNotExist();
    });



});