// user API 
// store user data structure in an array 
// usage of socket's ID


[{ 
    id:"/id",
    name:"username",
    room:"The Office Fans"
}];

// set of data 
// set of methods 
class Users {   
    // special function
    // fired when initialize instance of class
    // call with arguments of new's operator 
    constructor(){ 
       // this refers to the instance of the class
       // of the caller
       this.current=[]; 
    }

    //  # methods to manipulate user data structure 
    // addUser(id, name, room); 
    // removeUser(id)
    // fetchUser(id)  > allow to access users informations 
    // getUserList(room) > figure out which users are in room 

    addUser(id, name, room){ 
        let user = {id, name, room};
        this.current.push(user)
        return user; 
    }
    removeUser(id){ 
       let user = this.getUser(id) ;

       if (user){ 
        this.current = this.current.filter((user) => user.id !== id )
       }
       return user;
    }
    getUser(id){ 
        return this.current.filter((user)=> user.id === id)[0]; 
    }
    getUserList(room){ 
        let current = this.current.filter((user)=> user.room === room);
        let namesArray = current.map((user) => user.name);
        return namesArray 
    }


}

module.exports= {Users};
  

