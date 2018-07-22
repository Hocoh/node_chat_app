const expect = require("expect");

let {generateMessage, generateLocationMessage} = require("./message")

describe("generateMessage", () => { 
    it("should generate correct message object", () => { 
        
        let from="Jen";
        let text= "Some message"; 
        let message = generateMessage(from, text);

        console.log(message);
        expect(message.datestring).toBe("string")
        expect(message).toInclude({ 
            from,
            text
        });

    });
});

describe("generateLocationMessage", () => { 
    it("should generate correct location object", () => { 

        let from= "Admin"
        let latitude=1; 
        let longitude =1;
        let url =`https://www.google.com/maps?=${latitude},${longitude}`;
        let message= generateLocationMessage(from, longitude, latitude); 

        console.log(message);

        expect(message.longitude).toBe(1);
        expect(message.latitude).toBe(1);
    
        expect(message).toInclude({ 
            longitude,
            latitude
        });
    });
});