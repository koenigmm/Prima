namespace L03PongPaddles {
    import fudge = FudgeCore;

    window.addEventListener("load", hndload);
    function hndload(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        console.log(canvas);
        let pong: fudge.Node = createPong();

        let camera: fudge.ComponentCamera = new fudge.ComponentCamera();
        camera.pivot.translateZ(3);

        let viewport: fudge.Viewport = new fudge.Viewport();
        viewport.initialize("Viewport", pong, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();

        addEventListener("keydown", event => {
            let childenListLeft: fudge.Node[] = pong.getChildrenByName("LeftPaddle");
            let childenListRight: fudge.Node[] = pong.getChildrenByName("RightPaddle");
            let paddleLeft: fudge.Node = childenListLeft[0];
            let paddleRight: fudge.Node = childenListRight[0];

            switch (event.key) {
                case "w":
                    paddleRight.cmpTransform.local.translateY(0.1);
                    break;
                case "s":
                    paddleRight.cmpTransform.local.translateY(-0.1);
                    break;
                case "ArrowUp":
                    paddleLeft.cmpTransform.local.translateY(0.1);
                    break;
                case "ArrowDown":
                    paddleLeft.cmpTransform.local.translateY(-0.1);
                    break;
            }
            fudge.RenderManager.update();
            viewport.draw();
            
            
        })
        viewport.draw();
        
    }

    function createPong(): fudge.Node {
        //Nodes
        let pongNode: fudge.Node = new fudge.Node("Pong Node");
        let ball: fudge.Node = new fudge.Node("Ball");
        let leftPaddle: fudge.Node = new fudge.Node("LeftPaddle");
        let rightPaddle: fudge.Node = new fudge.Node("RightPaddle");

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

        //Left Paddle Node zusamensetzten und zu Pong Node hinzufügen
        leftPaddle.addComponent(mtrComponent);
        leftPaddle.addComponent(cmpMesh);
        leftPaddle.addComponent(new fudge.ComponentTransform);
        pongNode.appendChild(leftPaddle);

        //Right Paddle Node zusammensetzten und zu Pong Node hinzufügen
        rightPaddle.addComponent(quad02MtrComponent);
        rightPaddle.addComponent(cmpQuad02);
        rightPaddle.addComponent(new fudge.ComponentTransform);
        pongNode.appendChild(rightPaddle);

        //Ball Node zusammensetzten und zu Pong Node hinzufügen
        ball.addComponent(cmpBall);
        ball.addComponent(BallMtrComponent);
        ball.addComponent(new fudge.ComponentTransform);
        pongNode.appendChild(ball);

        //let cmpTransform: fudge.ComponentTransform = rightPaddle.getComponent(fudge.ComponentTransform) //cmpTransform geht auch
        leftPaddle.cmpTransform.local.translateX(1.3);
        rightPaddle.cmpTransform.local.translateX(-1.3);

        // TODO Nebeneffekte möglich Besser das Mesh Skalieren
        ball.cmpTransform.local.scaleY(0.2);
        ball.cmpTransform.local.scaleX(0.2);
        ball.cmpTransform.local.scaleZ(0.2);

        leftPaddle.cmpTransform.local.scaleX(0.15);
        rightPaddle.cmpTransform.local.scaleX(0.15);

        return pongNode;
    }

}


/*
Pong
Eventlistener auf die Tasten (Keyboardevent)
Objekte müssen bewegt werden
Vorischt was man bewegen will. Die Meshes oder vielleicht doch besser die Knoten
Backface Culling beachten
set invervall und alle x Sekunden etwas aufrufen.
Vorsicht mit anonymen Funktionen

Hausaufgaben
Paddles mit Tasen rauf und runter bewgen.
Knoten Transformation benuten
*/