var should = require('should');
const EventEmitter = require('events');

describe("What is this?", function() {

    // Basic rules
    // Default

    it("When calling a function, this is the global object.", function() {
        global.name = "global";
        let whoAmI = function() {
            return this.name;
        };

        whoAmI().should.equal(global.name);
    });

    it("When calling a function in a strict mode, this is the undefined.", function() {
        "use strict";
        global.name = "global";
        let whoAmI = function() {
            return this.name;
        };

        whoAmI.should.throw("Cannot read property 'name' of undefined");
    });

    // Bind, Apply and Call
    
    it("When calling a bound function, this is object bound in bind.", function() {
        let person = {
            name: "person",
            whoAmI: function() {
                return this.name;
            }
        };
        let differentPerson = {
            name: "differentPerson"
        };
        let whoAmIFunction = person.whoAmI.bind(differentPerson);
    
        whoAmIFunction().should.equal(differentPerson.name);
    });

    it("When calling a function using apply, this is object bound in apply.", function() {
        let person = {
            name: "person",
            whoAmI: function() {
                return this.name;
            }
        };
        let differentPerson = {
            name: "differentPerson"
        };
        let whoAmIFunction = person.whoAmI;

        whoAmIFunction.apply(differentPerson).should.equal(differentPerson.name);
    });

    it("When calling a function using call, this is object bound in call.", function() {
        let person = {
            name: "person",
            whoAmI: function() {
                return this.name;
            }
        };
        let differentPerson = {
            name: "differentPerson"
        };
        let whoAmIFunction = person.whoAmI;

        whoAmIFunction.call(differentPerson).should.equal(differentPerson.name);
        //whoAmIFunction.call(person).should.equal(person.name);
    });

    // Constructor

    it("When using this in a function in a constructor, this is the object under construction.", function() {
        function person(name) {
            this.name = name;
            this.getName = function() { return this.name; };
        }
        let name = "person";
        let obj = new person(name);

        obj.getName().should.equal(name);
    });

    // Object

    it("When calling a function on an object, this is the object.", function() {
        let person = {
            name: "person",
            whoAmI: function() {
                return this.name;
            }
        };
        
        person.whoAmI().should.equal(person.name);
    });

    // Borrowing functions

    it("When calling a function assigned to a variable, this is the global object.", function() {
        let person = {
            name: "person",
            whoAmI: function() {
                return this.name;
            }
        };
        global.name = "global";
        let whoAmIFunction = person.whoAmI;

        whoAmIFunction().should.equal(global.name);
        // let whoAmI = person.whoAmI();
        // whoAmI.should.equal(person.name);
    });

    it("When assigning result of a function called on object to a variable, this is the object.", function() {
        let person = {
            name: "person",
            whoAmI: function() {
                return this.name;
            }
        };
        global.name = "global";
        let whoAmIFunction = person.whoAmI(); //result!

        whoAmIFunction.should.equal(person.name);
    });


    it("When calling a function assigned to a variable in strict mode, this is the undefined.", function() {
        "use strict";
        let person = {
            name: "person",
            whoAmI: function() {
                return this.name;
            }
        };
        global.name = "global";
        let whoAmIFunction = person.whoAmI;

        whoAmIFunction.should.throw("Cannot read property 'name' of undefined");
    });

    // Arrow functions

    it("When calling an arrow function, this is the value of this in lexical scope.", function() {
        this.name = "lexical";
        global.name = "global";
        // let whoAmI = function() {
        let whoAmI = () => {
            return this.name;
        };
        
        whoAmI().should.equal(this.name);
    });


    it("When using this in an arrow function in a constructor, this is the object under construction? (this in lexical scope)", function() {
        function Person(name) {
            this.name = name;
            this.getName = () => { return this.name; };
        }

        let person = new Person("person");

        person.getName().should.equal("person");
    });

    it("When calling an arrow function on an object, this is the value of this in lexical scope.", function() {
        let person = {
            name: "person",
            //whoAmI: function() {
            whoAmI: () => {
                return this.name;
            }
        };
        this.name = "lexical";

        person.whoAmI().should.equal(this.name);
    });

    // Closures

    it("When calling an nested function, function closes over scope variables.", function() {
        let name = "closure";
        let whoAmI = function() {
            let nestedFunction = function() {
                return name;
            };
            return nestedFunction();
        }

        whoAmI().should.equal(name);
    });

    it("When calling an nested function, this is the global object.", function() {
        global.name = "global";
        let whoAmI = function() {
            let nestedFunction = function() {
                return this.name;
            };
            return nestedFunction();
        }

        whoAmI().should.equal("global");
    });

    it("When calling an nested arrow function in object, this is the value of this in lexical scope (in this case the global object).", function() {
        global.name = "global";
        let whoAmI = function() {
            let nestedFunction = () => {
                return this.name;
            };
            return nestedFunction();
        }

        whoAmI().should.equal("global");
    });

    // Bind, Apply and Call?
    it("When calling a bound function, this is value of this in lexical scope.", function() {
        let person = {
            name: "person",
            whoAmI: () => {
                return this.name;
            }
        };
        let differentPerson = {
            name: "differentPerson"
        };
        this.name = "lexical";
        let whoAmIFunction = person.whoAmI.bind(differentPerson);

        whoAmIFunction().should.equal(this.name);
    });

    it("When calling an arrow function using call, this is value of this in lexical scope.", function() {
        let person = {
            name: "person",
            whoAmI: () => {
                return this.name;
            }
        };
        let differentPerson = {
            name: "differentPerson"
        };
        this.name = "lexical";
        let whoAmIFunction = person.whoAmI;

        whoAmIFunction.call(differentPerson).should.equal(this.name);
    });

    it("When calling an arrow function using apply, this is value of this in lexical scope.", function() {
        let person = {
            name: "person",
            whoAmI: () => {
                return this.name;
            }
        };
        let differentPerson = {
            name: "differentPerson"
        };
        this.name = "lexical";
        let whoAmIFunction = person.whoAmI;

        whoAmIFunction.apply(differentPerson).should.equal(this.name);
    });

    // Events

    it("When calling a function in event callback, this is the object that had event listener assigned.", function() {
        let result;
        let emitter = new EventEmitter();
        emitter.name = "emitter";
        let callback = function ()  { result = this.name; };
        emitter.addListener("click", callback);
        emitter.emit("click");

        result.should.equal(emitter.name); 
    });

    it("When calling a nested function in event callback, this is the window object.", function() {
        global.name = "global";
        let result;
        let emitter = new EventEmitter();
        let callback = function ()  { (function() { result = this.name; })(); };
        emitter.addListener("click", callback);
        emitter.emit("click");

        result.should.equal(global.name); 
    });

    it("When calling an arrow function in event callback, this is the value of this in lexical scope.", function() {
        this.name = "lexical";
        let result;
        let emitter = new EventEmitter();
        let callback = () => { result = this.name; };
        emitter.addListener("click", callback);
        emitter.emit("click");

        result.should.equal(this.name); 
    });


    // Common issues

    it("When calling function in promise callbacks, this is the global object.", async () => { 
        global.name = "global";
        let whoAmi = function () {
            return this.name;
        }
        this.name = "lexical";
        let promise = new Promise(resolve => {
            setTimeout(() => resolve(), 10);
        }).then(whoAmi);
        
        let result = await promise;

        result.should.equal("global");
    });

    it("When calling function in promise callbacks, use variable and closure.", async () => { 
        global.name = "global";
        let that = this;
        let whoAmi = function() {
            return that.name;
        }
        this.name = "lexical";
        let promise = new Promise(resolve => {
            setTimeout(() => resolve(), 10);
        }).then(whoAmi);

        let result = await promise;

        result.should.equal("lexical");
    });

    it("When calling function in promise callbacks, use binding.", async () => { 
        global.name = "global";
        let whoAmi = function() {
            return this.name;
        }.bind(this);
        this.name = "lexical";
        let promise = new Promise(resolve => {
            setTimeout(() => resolve(), 10);
        }).then(whoAmi);

        let result = await promise;

        result.should.equal("lexical");
    });

    it("When calling function in promise callbacks, use arrow function.", async () => { 
        global.name = "global";
        let whoAmi = () => {
            return this.name;
        }
        this.name = "lexical";
        let promise = new Promise(resolve => {
            setTimeout(() => resolve(), 10);
        }).then(whoAmi);
        let result = await promise;

        result.should.equal("lexical");
    });

    it("When calling function in promise callbacks, use arguments.", async () => { 
        let whoAmi = function(namedObject) {
            return namedObject.name;
        }
        let promise = new Promise(resolve => {
            setTimeout(() => resolve({ name: "argument"}), 10);
        }).then(whoAmi);
        let result = await promise;

        result.should.equal("argument");
    });

    // Other

    it("When calling function in eval, same rules apply.", function () { 
        let whoAmi =  "() => { return this.name;}";
        this.name = "lexical";

        let result = eval(whoAmi)();

        result.should.equal("lexical");
    });

    it("Some functions allow for passing-in this as an argument.", function () { 
        let whoAmi =  function() {
            return this.name;
        };
        this.prefix = "prefixed";
        let = names = [{name: "Item"}];
        let result = names.map((current) => {
            return this.prefix + current.name;
        }, this);

        result.should.eql(["prefixedItem"]);
    });

    // Cleanup

    afterEach("afterEach", function() {
        global.name = undefined;
        this.name = undefined;
    });
});