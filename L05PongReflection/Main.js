"use strict";
var L05PongReflections;
(function (L05PongReflections) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndload);
    let keysPressed = {};
    let paddleLeft;
    let paddleRight;
    let viewport = new fudge.Viewport();
    let ball = new fudge.Node("Ball");
    let randomNumberBall_1 = (Math.random() * 2 - 1) / 200;
    let randomNumberBall_2 = (Math.random() * 2 - 1) / 200;
    let wallTop = new fudge.Node("WallTop");
    let WallBottom = new fudge.Node("WallBottom");
    let wallLeft = new fudge.Node("WallLeft");
    let wallRight = new fudge.Node("WallRight");
    let walls = [wallLeft, wallRight, wallTop, WallBottom];
    let pong;
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
        pong = createPong();
        let camera = new fudge.ComponentCamera();
        camera.pivot.translateZ(3);
        viewport.initialize("Viewport", pong, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        addEventListener("keydown", hndlKeyDown);
        addEventListener("keyup", hndlKeyUp);
        viewport.draw();
        //Debug evtl löschen
        fudge.Debug.log(viewport.getCanvasRectangle);
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
        let mtrBlue = new fudge.Material("red", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
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
        ;
        //Right Paddle Node zusammensetzten und zu Pong Node hinzufügen
        paddleRight.addComponent(quad02MtrComponent);
        paddleRight.addComponent(cmpQuad02);
        paddleRight.addComponent(new fudge.ComponentTransform);
        pongNode.appendChild(paddleRight);
        //Ball Node zusammensetzten und zu Pong Node hinzufügen
        ball.addComponent(cmpBall);
        ball.addComponent(BallMtrComponent);
        ball.addComponent(new fudge.ComponentTransform);
        console.log(ball.name);
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
        // Walls
        for (let i of walls) {
            i.addComponent(new fudge.ComponentMesh(meshQuad));
            i.addComponent(new fudge.ComponentTransform());
            i.addComponent(new fudge.ComponentMaterial(mtrBlue));
            pongNode.appendChild(i);
        }
        //Wall translate und scale
        wallLeft.cmpTransform.local.translateX(-1.45);
        wallLeft.getComponent(fudge.ComponentMesh).pivot.scaleX(0.1);
        wallLeft.getComponent(fudge.ComponentMesh).pivot.scaleY(2.2);
        wallRight.cmpTransform.local.translateX(1.45);
        wallRight.getComponent(fudge.ComponentMesh).pivot.scaleX(0.1);
        wallRight.getComponent(fudge.ComponentMesh).pivot.scaleY(2.2);
        wallTop.cmpTransform.local.translateY(1.1);
        wallTop.getComponent(fudge.ComponentMesh).pivot.scaleY(0.1);
        wallTop.getComponent(fudge.ComponentMesh).pivot.scaleX(2.8);
        WallBottom.cmpTransform.local.translateY(-1.1);
        WallBottom.getComponent(fudge.ComponentMesh).pivot.scaleY(0.1);
        WallBottom.getComponent(fudge.ComponentMesh).pivot.scaleX(2.8);
        return pongNode;
    }
    function update(_event) {
        //fudge.Debug.log(keysPressed);
        //moveBall();
        //let sclRec: fudge.Vector3 = paddleRight.getComponent(fudge.ComponentMesh).pivort.scaling so ähnlich 
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
        let hit = false;
        for (let node of pong.getChildren()) {
            if (node.name == "Ball") {
                let sclRect = node.getComponent(fudge.ComponentMesh).pivot.scaling.copy;
                let posRect = node.cmpTransform.local.translation.copy;
                hit = hit || detectHit(ball.cmpTransform.local.translation, posRect, sclRect);
                console.log(hit);
            }
            if (hit) {
                processHit(node);
                hit = false;
            }
        }
        fudge.RenderManager.update();
        viewport.draw();
    }
    function detectHit(_position, _posRect, _sclRect) {
        // sclRect und posrect in die Funktion und als Pramaeter den Node übergeben
        let rectangle = new fudge.Rectangle(_position.x, _posRect.y, _sclRect.x, _sclRect.y, fudge.ORIGIN2D.CENTER);
        return rectangle.isInside(_position.toVector2());
    }
    function processHit(_node) {
        switch (_node.name) {
            case "WallTop":
            case "WallBottom":
                ballSpeed.y -= 1;
                break;
            case "WallLeft":
                ballSpeed.x -= 1;
            case "WallRight":
                break;
            case "paddleLeft":
            case "paddleRight ":
                ballSpeed.x *= -1;
                break;
            default:
                console.log("Unkown + " + _node.name);
        }
    }
    function moveBall() {
        ball.cmpTransform.local.translateX(ballSpeed.x);
        ball.cmpTransform.local.translateY(ballSpeed.y);
    }
    //TODO Benutzen wichtig
    function createNode(name, _mesh, _material, _translation, _scaling) {
        let node = new fudge.Node(name);
        node.addComponent(new fudge.ComponentTransform);
        node.addComponent(new fudge.ComponentMaterial(_material));
        node.addComponent(new fudge.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(fudge.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    }
})(L05PongReflections || (L05PongReflections = {}));
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

TODO
Umsetzung der neuen Funktion, am besten mit einem Array
Am besten die Gelegenheit nutzen, un die Kamera weiter herauszoomen In der Vorlesung auf 50
pong.appendchild(createNode(paramter eingeben Vektoren mit new erzeugen))

Bis Dienstag Hausaufgabe
Winkeländerung abbhängig Keypress
Kollisionstreffpunkt
oder beides
Punktezähler auf der Website mithilfe eines HTMLElements bspw. h1 über Canvas oder darunter
- Möglichkeit Nummer 3: Mit Fudge Grafische Anzeige oder als Canvas Text
*/ 
//# sourceMappingURL=Main.js.map