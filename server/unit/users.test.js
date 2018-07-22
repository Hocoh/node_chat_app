const expect= require("expect"); 

const {Users} = require("./users");

describe("Users", () => { 
    let users;

    beforeEach(() => { 
        users = new Users(); 
        users.users = [{ 
            id: "1",
            name: "Mike",
            room:"Node Course"
        },
        { 
            id: "2",
            name: "Jen",
            room:"React Course"
        },
        { 
            id: "3",
            name: "Julie",
            room:"Node Course"
        }]
    });

    it("should add new user", () => { 
        let users = new Users(); 
        let user = {
            id: "123",
            name:"Muun",
            room: "Heaven"
        };
        let resUser = users.addUser(user.id, 
                                    user.name, 
                                    user.room)

        expect(users.current).toEqual([user]);
    });

    it("should remove an user", () => { 
        let userId ="1"
        let user= users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.current.length).toBe(2); 
    });

    it("should fails to remove an user", () => { 
        let userId ="1"
        let user= users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.current.length).toBe(3); 
    });

    it("should get an user", () => { 
        let userId ="2"
        let user= users.getUser(userId);

        expect(user.id).toEqual(userId)
    });

    it("should fails to get an user", () => { 
        let userId ="5"
        let user= users.getUser(userId);

        expect(user.id).toNotExist(); 
    });


    it("should returns names for Node Course", () => { 
        let userList= users.getUserList("Node Course");
        expect(userList).toEqual(["Mike", "Julie"])
    })

    it("should returns names for React Course", () => { 
        let userList= users.getUserList("Node Course");

        expect(userList).toEqual(["Jen"])
    })
});