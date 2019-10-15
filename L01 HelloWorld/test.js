"use strict";
var L01_HelloWorld;
(function (L01_HelloWorld) {
    console.log("Hello World");
    let message = "Hello World";
    let messageToGreet = "Test";
    //et x: number = 12;
    class Greeter {
        constructor(message) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }
    window.addEventListener("load", handLoad);
    function handLoad() {
        let divToChange01 = document.getElementById("ausgabe1");
        divToChange01.textContent = message;
        let greeter = new Greeter(messageToGreet);
        console.log(greeter.greet());
    }
})(L01_HelloWorld || (L01_HelloWorld = {}));
//# sourceMappingURL=test.js.map