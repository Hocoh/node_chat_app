const expect = require("expect");

let {generateMessage} = require("./message")

describe("generateMessage", () => { 
    it("should generate correct message object", () => { 
        
        let from="Jen";
        let text= "Some message"; 
        let message = generateMessage(from, text);

        console.log(message)
        expect(message.datestring).toBe("string")
        expect(message).toInclude({ 
            from,
            text
        });

    });
});