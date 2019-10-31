
namespace L05PongReflections {

    interface KeysPressed {
        [code: string]: boolean
    }

    import fudge = FudgeCore;
    window.addEventListener("load", hndload);
    let keysPressed: KeysPressed = {};
    let paddleLeft: fudge.Node;
    let paddleRight: fudge.Node;
    let viewport: fudge.Viewport = new fudge.Viewport();
    let ball: fudge.Node = new fudge.Node("Ball");
    let randomNumberBall_1: number = (Math.random() * 2 -1) / 15;
    let randomNumberBall_2: number = (Math.random() * 2 -1) / 15;
    let wallRight: fudge.Node = new fudge.Node("wall Right");
    let wallLeft: fudge.Node = new fudge.Node("Wall Left");
    let wallTop: fudge.Node = new fudge.Node("Wall Top");
    let wallBottom: fudge.Node = new fudge.Node("Wall Bottom");
    
    //Richtung und Geschwindigkeit
    let ballSpeed: fudge.Vector3 = new fudge.Vector3(randomNumberBall_1,randomNumberBall_2);


    //Fude Keyboad Codes verwenden
    function hndlKeyDown(_event: KeyboardEvent): void {
        keysPressed[_event.key] = true;
    }

    //vielleicht besser mit fudge codes arbeiten
    function hndlKeyUp(_event: KeyboardEvent): void {
        keysPressed[_event.key] = false;
    }

    function hndload(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        console.log(canvas);
        let pong: fudge.Node = createPong();
        let camera: fudge.ComponentCamera = new fudge.ComponentCamera();
        camera.pivot.translateZ(3);

        viewport.initialize("Viewport", pong, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        addEventListener("keydown", hndlKeyDown);
        addEventListener("keyup", hndlKeyUp);
        viewport.draw();
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start();
        
    }

    function createPong(): fudge.Node {
        //Nodes
        let pongNode: fudge.Node = new fudge.Node("Pong Node");
        paddleLeft = new fudge.Node("paddleLeft");
        paddleRight = new fudge.Node("paddleRight");

        // Left Paddle Compnent und Mesh und Color
        let meshQuad: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let mtrSolidWhite: fudge.Material = new fudge.Material("Solid White", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let mtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        //Right Paddle Component und Mesh und Color
        let meshQuad02: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpQuad02: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad02);
        let quad02MtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        //Ball
        let meshBall: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpBall: fudge.ComponentMesh = new fudge.ComponentMesh(meshBall);
        let BallMtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        //Wall Left 
        let meshWall_left: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpWall_left: fudge.ComponentMesh = new fudge.ComponentMesh(meshWall_left);
        let wallMTRComponent_left: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        
        //Wall Right
        let meshWall_right: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpWall_right: fudge.ComponentMesh = new fudge.ComponentMesh(meshWall_right);
        let wallMTRComponent_right: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        
        //Wall Top
        let meshWall_top: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpWall_top: fudge.ComponentMesh = new fudge.ComponentMesh(meshWall_top);
        let wallMTRComponent_top: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        //Wall Bottom
        let meshWall_bottom: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpWall_bottom: fudge.ComponentMesh = new fudge.ComponentMesh(meshWall_bottom);
        let wallMTRComponent_bottom: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

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
        pongNode.appendChild(ball);

        //Wall Left
        wallLeft.addComponent(cmpWall_left);
        wallLeft.addComponent(wallMTRComponent_left);
        wallLeft.addComponent(new fudge.ComponentTransform);
        // Array oder Fudge Node verwenden
        pongNode.appendChild(wallLeft);

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

    function update(_event: Event): void {
        //fudge.Debug.log(keysPressed);
        moveBall();
        //let sclRec: fudge.Vector3 = paddleRight.getComponent(fudge.ComponentMesh).pivort.scaling so ähnlich 
        console.log(detectHit(ball.cmpTransform.local.translation, paddleRight.cmpTransform.local))

        if (keysPressed["w"]) {
            paddleRight.cmpTransform.local.translateY(0.025);
        }

        if (keysPressed["s"]) {
            paddleRight.cmpTransform.local.translateY(-0.025);
        }

        if (keysPressed["ArrowUp"]) {
            paddleLeft.cmpTransform.local.translateY(0.025);
        }

        if(keysPressed["ArrowDown"]) {
            paddleLeft.cmpTransform.local.translateY(-0.025);
        }

        fudge.RenderManager.update();
        viewport.draw();

    }
    function detectHit(_position: fudge.Vector3, _mtxBox: fudge.Matrix4x4, _sclRect: fudge.Vector3): boolean {
        // Geht auch Komonentenweise mit x und y das sind wahrscheinlich vier Berechnungen
        let poBox: fudge.Vector3 = _mtxBox.translation;
        let sclBox: fudge.Vector3 = _mtxBox.scaling;
        sclBox.z = 0;
        sclBox.x *= -1;
        _sclRect.scale(0.5);
        let topLeft: fudge.Vector3 = fudge.Vector3.SUM(poBox, sclBox);
        let bottomRight: fudge.Vector3 = fudge.Vector3.DIFFERENCE(poBox, sclBox);

        if(_position.x > topLeft.x && _position.x < bottomRight.x) {
            if (_position.y < topLeft.y && _position.y > bottomRight.y) {
                return true;
            }
        }
        return false;
    }

    function moveBall(): void {
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
    
}
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