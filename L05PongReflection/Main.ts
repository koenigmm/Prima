
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
    let mtxBall: fudge.Matrix4x4;
    let randomNumberBall_1: number = (Math.random() * 2 - 1) / 2;
    let randomNumberBall_2: number = (Math.random() * 2 - 1) / 2;
    let wallTop: fudge.Node = new fudge.Node("WallTop");
    let WallBottom: fudge.Node = new fudge.Node("WallBottom");
    let wallLeft: fudge.Node = new fudge.Node("WallLeft");
    let wallRight: fudge.Node = new fudge.Node("WallRight");
    let walls: fudge.Node[] = [wallLeft, wallRight, wallTop, WallBottom];
    let pong: fudge.Node;
    let scorePlayer1: number = 0;
    let scorePlayer2: number = 0;

    //Richtung und Geschwindigkeit
    let ballSpeed: fudge.Vector3 = new fudge.Vector3(randomNumberBall_1, randomNumberBall_2);
    //let ballSpeed: fudge.Vector3 = new fudge.Vector3(0.1 , -0.0, 0.0);

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
        pong = createPong();
        let camera: fudge.ComponentCamera = new fudge.ComponentCamera();
        camera.pivot.translateZ(40);
        mtxBall = ball.cmpTransform.local;

        viewport.initialize("Viewport", pong, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        addEventListener("keydown", hndlKeyDown);
        addEventListener("keyup", hndlKeyUp);
        viewport.draw();
        //Debug evtl löschen
        fudge.Debug.log(viewport.getCanvasRectangle);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start();

    }

    function createPong(): fudge.Node {
        //Nodes
        let pongNode: fudge.Node = new fudge.Node("Pong Node");
        paddleLeft = new fudge.Node("PaddleRight");
        paddleRight = new fudge.Node("PaddleLeft");

        // Left Paddle Compnent und Mesh und Color
        let meshQuad: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let mtrSolidWhite: fudge.Material = new fudge.Material("Solid White", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let mtrBlue: fudge.Material = new fudge.Material("red", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
        let mtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        //Right Paddle Component und Mesh und Color
        let meshQuad02: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpQuad02: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad02);
        let quad02MtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        //Ball
        let meshBall: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpBall: fudge.ComponentMesh = new fudge.ComponentMesh(meshBall);
        let BallMtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

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
        console.log(ball.name)
        pongNode.appendChild(ball);

        //let cmpTransform: fudge.ComponentTransform = paddleRight.getComponent(fudge.ComponentTransform) //cmpTransform geht auch
        paddleLeft.cmpTransform.local.translateX(12);
        paddleRight.cmpTransform.local.translateX(-12);

        // TODO Nebeneffekte möglich Besser das Mesh Skalieren
        ball.cmpTransform.local.scaleY(0.75);
        ball.cmpTransform.local.scaleX(0.75);
        ball.cmpTransform.local.scaleZ(0.75);

        paddleLeft.cmpTransform.local.scaleX(1);
        paddleLeft.cmpTransform.local.scaleY(8);
        paddleRight.cmpTransform.local.scaleY(8);
        paddleRight.cmpTransform.local.scaleX(1);

        // Walls
        for (let i of walls) {
            i.addComponent(new fudge.ComponentMesh(meshQuad));
            i.addComponent(new fudge.ComponentTransform());
            i.addComponent(new fudge.ComponentMaterial(mtrBlue));
            pongNode.appendChild(i);
        }

        //Wall translate und scale
        wallLeft.cmpTransform.local.translateX(-16);
        wallLeft.getComponent(fudge.ComponentMesh).pivot.scaleX(0.5);
        wallLeft.getComponent(fudge.ComponentMesh).pivot.scaleY(20);
        wallRight.cmpTransform.local.translateX(16);
        wallRight.getComponent(fudge.ComponentMesh).pivot.scaleX(0.5);
        wallRight.getComponent(fudge.ComponentMesh).pivot.scaleY(20);
        wallTop.cmpTransform.local.translateY(10.0);
        wallTop.getComponent(fudge.ComponentMesh).pivot.scaleY(0.5);
        wallTop.getComponent(fudge.ComponentMesh).pivot.scaleX(33);
        WallBottom.cmpTransform.local.translateY(-10.0);
        WallBottom.getComponent(fudge.ComponentMesh).pivot.scaleY(0.5);
        WallBottom.getComponent(fudge.ComponentMesh).pivot.scaleX(33);

        return pongNode;
    }

    function update(_event: Event): void {
        //fudge.Debug.log(keysPressed);
        //let sclRec: fudge.Vector3 = paddleRight.getComponent(fudge.ComponentMesh).pivort.scaling so ähnlich 

        if (keysPressed["w"]) {
            paddleRight.cmpTransform.local.translateY(0.25);
        }

        if (keysPressed["s"]) {
            paddleRight.cmpTransform.local.translateY(-0.25);
        }

        if (keysPressed["ArrowUp"]) {
            paddleLeft.cmpTransform.local.translateY(0.2);
        }

        if (keysPressed["ArrowDown"]) {
            paddleLeft.cmpTransform.local.translateY(-0.2);
        }

        let hit: boolean = false;
        for (let node of pong.getChildren()) {
            if (node.name == "Ball") {
                continue;
            }
            hit = detectHit(mtxBall.translation, node);
            //fudge.Debug.log(hit);
            if (hit) {
                processHit(node);
                break;
            }
        }
        moveBall();
        
        //console.log(scorePlayer1, +" " + scorePlayer2)

        fudge.RenderManager.update();
        viewport.draw();

    }
    function detectHit(_position: fudge.Vector3, _node: fudge.Node): boolean {
        let sclRect: fudge.Vector3 = _node.getComponent(fudge.ComponentMesh).pivot.scaling.copy;
        let mtxInverse: fudge.Matrix4x4 = fudge.Matrix4x4.INVERSION(_node.cmpTransform.local);
        _position.transform(mtxInverse);
        let rect: fudge.Rectangle = new fudge.Rectangle(0, 0, sclRect.x, sclRect.y, fudge.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    }

    function processHit(_node: fudge.Node): void {
        switch (_node.name) {
            case "WallTop":
            case "WallBottom":
                ballSpeed.y *= -1;
                break;
            case "WallRight":
            case "WallLeft":
                ballSpeed.x *= -1;
                break;
            case "PaddleLeft":
                scorePlayer1 ++;
                document.getElementById("player1").innerText = scorePlayer1.toString();
                ballSpeed.x *= -1;
                break;
            case "PaddleRight":
                //reflectBall(_node);
                scorePlayer2 ++;
                document.getElementById("player2").innerText = scorePlayer2.toString();
                ballSpeed.x *= -1;
                break;
            default:
                console.warn("unbekannt + ", _node.name);
                break;

        }

    }

    function moveBall(): void {
        mtxBall.translate(ballSpeed);
    }

    /*TODO Benutzen wichtig
    function createNode(name: string, _mesh: fudge.Mesh, _material: fudge.Material, _translation: fudge.Vector2, _scaling: fudge.Vector2): fudge.Node {
        let node: fudge.Node = new fudge.Node(name);
        node.addComponent(new fudge.ComponentTransform);
        node.addComponent(new fudge.ComponentMaterial(_material));
        node.addComponent(new fudge.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(fudge.ComponentMesh).pivot.scale(_scaling.toVector3());

        return node;

    }
    */

    /*
    * nicht benutzt
    EVTL TODO benutzten
    function reflectBall(_paddle: fudge.Node): void {
        let normal: fudge.Vector3 = fudge.Vector3.X(-1);
        normal.transform(_paddle.cmpTransform.local);
        ballSpeed.reflect(normal);
    }
    */
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