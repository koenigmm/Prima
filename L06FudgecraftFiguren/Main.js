"use strict";
var FudgecraftFiguren;
(function (FudgecraftFiguren) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndload);
    let viewport = new fudge.Viewport();
    let gameNode;
    let cube;
    let figur1;
    let figur2;
    let defaultVectorScaling = new fudge.Vector2(2, 2);
    let defaultVectorTranslation = new fudge.Vector2(1, 1);
    function hndload(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        //console.log(canvas);
        gameNode = createGame();
        let camera = new fudge.ComponentCamera();
        camera.pivot.translateZ(40);
        viewport.initialize("Viewport", gameNode, camera, canvas);
        //fudge.Debug.log(viewport);
        console.log(gameNode);
        viewport.draw();
    }
    function createGame() {
        let gameNode = new fudge.Node("GameNode");
        let cubeMesh = new fudge.MeshCube();
        let whiteMaterial = new fudge.Material("white", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let cubeTranslation = new fudge.Vector2(10, 0);
        let cubeScaling = new fudge.Vector2(2, 2);
        cube = createNode("Cube", cubeMesh, whiteMaterial, cubeTranslation, cubeScaling);
        gameNode.appendChild(cube);
        figur1 = new fudge.Node("L");
        figur1.addComponent(new fudge.ComponentTransform);
        createFigur(figur1, 4, new fudge.Vector2(0, 0), new fudge.Vector2(0, 2), new fudge.Vector2(2, 2), new fudge.Vector2(4, 2));
        figur1.cmpTransform.local.translateX(-10);
        figur1.cmpTransform.local.rotateZ(90);
        figur2 = new fudge.Node("Reverse L");
        figur2.addComponent(new fudge.ComponentTransform);
        createFigur(figur2, 4, new fudge.Vector2(0, 0), new fudge.Vector2(0, 2), new fudge.Vector2(2, 2), new fudge.Vector2(4, 2));
        figur2.cmpTransform.local.scaleX(-1);
        figur2.cmpTransform.local.rotateZ(90);
        let figur3 = new fudge.Node("I");
        figur3.addComponent(new fudge.ComponentTransform);
        createFigur(figur3, 4, new fudge.Vector2(0, 0), new fudge.Vector2(0, 2), new fudge.Vector2(0, 4), new fudge.Vector2(0, 6));
        figur3.cmpTransform.local.translateY(-12);
        gameNode.appendChild(figur1);
        gameNode.appendChild(figur2);
        gameNode.appendChild(figur3);
        return gameNode;
    }
    function createNode(name, _mesh, _material, _translation, _scaling) {
        let node = new fudge.Node(name);
        node.addComponent(new fudge.ComponentTransform);
        node.addComponent(new fudge.ComponentMaterial(_material));
        node.addComponent(new fudge.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(fudge.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    }
    function createFigur(node, amountOfCubes, position1, position2, position3, position4) {
        for (let i = 0; i < amountOfCubes; i++) {
            let cubeMesh = new fudge.MeshCube();
            let whiteMaterial = new fudge.Material("white", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
            let element_figur = createNode("Element " + i, cubeMesh, whiteMaterial, defaultVectorTranslation, defaultVectorScaling);
            node.appendChild(element_figur);
            switch (element_figur.name) {
                case "Element 0":
                    element_figur.cmpTransform.local.translation = position1.toVector3();
                    break;
                case "Element 1":
                    element_figur.cmpTransform.local.translation = position2.toVector3();
                    break;
                case "Element 2":
                    element_figur.cmpTransform.local.translation = position3.toVector3();
                    break;
                case "Element 3":
                    element_figur.cmpTransform.local.translation = position4.toVector3();
                    break;
            }
        }
    }
})(FudgecraftFiguren || (FudgecraftFiguren = {}));
//# sourceMappingURL=Main.js.map