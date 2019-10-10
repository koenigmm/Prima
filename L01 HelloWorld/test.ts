console.log("Hello World");
let message: string = "Hello World";
window.addEventListener("load", handLoad);

function handLoad(): void {
    let divToChange01: HTMLElement = document.getElementById("ausgabe1");
    divToChange01.textContent = message;
  
}

