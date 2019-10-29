"use strict";
var L03PongPaddles;
(function (L03PongPaddles) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndload);
    let keysPressed = {};
    let paddleLeft;
    let paddleRight;
    let viewport = new fudge.Viewport();
    let ball = new fudge.Node("Ball");
    let randomNumberBall_1 = (Math.random() * 2 - 1) / 15;
    let randomNumberBall_2 = (Math.random() * 2 - 1) / 15;
    //Richtung und Geschwindigkeit
    let ballSpeed = new fudge.Vector3(randomNumberBall_1, randomNumberBall_2);
    //Fude Keyboad Codes verwenden
    function hndlKeyDown(_event) {
        keysPressed[_event.key] = true;
    }
    //vielleicht besser mit fudge codes arbeiten
    function hndlKeyUp(_event) {
        keysPressed[_event.key] = false;
    }
    function hndload(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        console.log(canvas);
        let pong = createPong();
        let camera = new fudge.ComponentCamera();
        camera.pivot.translateZ(3);
        viewport.initialize("Viewport", pong, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        addEventListener("keydown", hndlKeyDown);
        addEventListener("keyup", hndlKeyUp);
        viewport.draw();
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start();
    }
    function createPong() {
        //Nodes
        let pongNode = new fudge.Node("Pong Node");
        paddleLeft = new fudge.Node("paddleLeft");
        paddleRight = new fudge.Node("paddleRight");
        // Left Paddle Compnent und Mesh und Color
        let meshQuad = new fudge.MeshQuad();
        let cmpMesh = new fudge.ComponentMesh(meshQuad);
        let mtrSolidWhite = new fudge.Material("Solid White", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let mtrComponent = new fudge.ComponentMaterial(mtrSolidWhite);
        //Right Paddle Component und Mesh und Color
        let meshQuad02 = new fudge.MeshQuad();
        let cmpQuad02 = new fudge.ComponentMesh(meshQuad02);
        let quad02MtrComponent = new fudge.ComponentMaterial(mtrSolidWhite);
        //Ball
        let meshBall = new fudge.MeshQuad();
        let cmpBall = new fudge.ComponentMesh(meshBall);
        let BallMtrComponent = new fudge.ComponentMaterial(mtrSolidWhite);
        //Left Paddle Node zusamensetzten und zu Pong Node hinzufügen
        paddleLeft.addComponent(mtrComponent);
        paddleLeft.addComponent(cmpMesh);
        paddleLeft.addComponent(new fudge.ComponentTransform);
        pongNode.appendChild(paddleLeft);
        //Right Paddle Node zusammensetzten und zu Pong Node hinzufügen
        paddleRight.addComponent(quad02MtrComponent);
        paddleRight.addComponent(cmpQuad02);
        paddleRight.addComponent(new fudge.ComponentTransform);
        pongNode.appendChild(paddleRight);
        //Ball Node zusammensetzten und zu Pong Node hinzufügen
        ball.addComponent(cmpBall);
        ball.addComponent(BallMtrComponent);
        ball.addComponent(new fudge.ComponentTransform);
        pongNode.appendChild(ball);
        //let cmpTransform: fudge.ComponentTransform = paddleRight.getComponent(fudge.ComponentTransform) //cmpTransform geht auch
        paddleLeft.cmpTransform.local.translateX(1.3);
        paddleRight.cmpTransform.local.translateX(-1.3);
        // TODO Nebeneffekte möglich Besser das Mesh Skalieren
        ball.cmpTransform.local.scaleY(0.15);
        ball.cmpTransform.local.scaleX(0.15);
        ball.cmpTransform.local.scaleZ(0.15);
        paddleLeft.cmpTransform.local.scaleX(0.15);
        paddleRight.cmpTransform.local.scaleX(0.15);
        return pongNode;
    }
    function update(_event) {
        //fudge.Debug.log(keysPressed);
        moveBall();
        if (keysPressed["w"]) {
            paddleRight.cmpTransform.local.translateY(0.025);
        }
        if (keysPressed["s"]) {
            paddleRight.cmpTransform.local.translateY(-0.025);
        }
        if (keysPressed["ArrowUp"]) {
            paddleLeft.cmpTransform.local.translateY(0.025);
        }
        if (keysPressed["ArrowDown"]) {
            paddleLeft.cmpTransform.local.translateY(-0.025);
        }
        fudge.RenderManager.update();
        viewport.draw();
    }
    function moveBall() {
        ball.cmpTransform.local.translateX(ballSpeed.x);
        ball.cmpTransform.local.translateY(ballSpeed.y);
        /*
        if (randomNumberBall_1 <= 0.25 && randomNumberBall_1 <0.5) {
            ball.cmpTransform.local.translateY(speedBall);
        }
        if (randomNumberBall_1 >= 0.25 && randomNumberBall_1 < 0.5) {
           ball.cmpTransform.local.translateY(-speedBall)
        }

        if (randomNumberBall_1 >= 0.5 && randomNumberBall_1 < 0.75) {
           ball.cmpTransform.local.translateX(speedBall);
        }

        if (randomNumberBall_1 >= 0.75 && randomNumberBall_1 < 1) {
            ball.cmpTransform.local.translateX(-speedBall);
        }
        */
    }
})(L03PongPaddles || (L03PongPaddles = {}));
/*
Pong
Eventlistener auf die Tasten (Keyboardevent)
Objekte müssen bewegt werden
Vorischt was man bewegen will. Die Meshes oder vielleicht doch besser die Knoten
Backface Culling beachten
set invervall und alle x Sekunden etwas aufrufen.
Vorsicht mit anonymen Funktionen => innerhalb von eventlistener

Tastatureingabe
Möglichkeit Nummer 1 Array String speichern und bei Veränderung reagieren
Möglichkeit Nummer 2 Assoziatives Array (Map oder standart Javascript Objekte, also geschweifte Klammern)
let keyspressed = {} Assoziatives Array
Keydown: Wenn was kommt in das Array den Code speichern der ankomme
Keyup: Den Code auf false setzten oder löschen
Herausfinden, ob ein bestimmter Key gedrückt wurde
    File Keypressed fudge keyboard code bspw. up ist true, dann darauf reagieren

Aufgabe für Dienstag
Ball bewegen, so dass er an allen vier Wänden abprall. Starten in zufällige Richtung und Geschwindigkeit
Vector3 verwenden für die Geschwindigkeit soll am Anfang zufällig bestimmt werden
Ränder definieren
*/ 
//# sourceMappingURL=Main.js.map