describe("What is this?", function() {

    // Basic rules
    // Default

    it("When calling a function, this is the window object.", function() {
        window.myName = "myWindow";
        console.log(Window.myName);
        let whoAmI = function() {
            return this.myName;
        };

        whoAmI().should.equal(window.myName);

        delete window.myName;
    });

    // Events

    it("When calling a function in event callback, this is the object that had event listener assigned.", function() {
        let result;
        let button = document.createElement("button");
        button.myName = "myButton";
        let callback = function ()  { result = this.myName; };
        button.addEventListener("click", callback);
        button.click();

        result.should.equal(button.myName); 
    });

    it("When calling a nested function in event callback, this is the window object.", function() {
        window.myName = "myWindow";
        let result;
        let button = document.createElement("button");
        let callback = function() { (function() { result = this.myName; })(); };
        button.addEventListener("click", callback);
        button.click();

        result.should.equal(window.myName); 
        delete window.myName;
    });

    it("When calling an arrow function in event callback, this is the value of this in lexical scope.", function() {
        this.myName = "myLexical";
        let result;
        let button = document.createElement("button");
        let callback = () => { result = this.myName; };
        button.addEventListener("click", callback);
        button.click();

        result.should.equal(this.myName); 
    });
});