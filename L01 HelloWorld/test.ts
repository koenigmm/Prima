namespace L01_HelloWorld {

    console.log("Hello World");
    let message: string = "Hello World";
    let messageToGreet = "Test";
    //et x: number = 12;


    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }
    window.addEventListener("load", handLoad);

    function handLoad(): void {
        let divToChange01: HTMLElement = document.getElementById("ausgabe1");
        divToChange01.textContent = message;
        let greeter = new Greeter(messageToGreet);
        console.log(greeter.greet());

    }
}




