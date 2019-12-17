"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndload);
    let viewport = new ƒ.Viewport();
    let orbitCamera = new FudgecraftGame.OrbitCamera(30, ƒ.Color.WHITE, ƒ.Color.WHITE, ƒ.Color.GREY, new ƒ.Vector3(0.5, 1, 0.8));
    let gameNode = new ƒ.Node("GameNode");
    let edgeSize = 10;
    //let halfOfEdge: number = (edgeSize / 2) - 1;
    let allFixedPositions = new FudgecraftGame.AllFixedPositions(edgeSize);
    let fragmentToControl = new FudgecraftGame.Fragment(allFixedPositions);
    let ankerPositionCenter = new FudgecraftGame.FixedPosition(0, 0, edgeSize - 1);
    let ankerCube = new FudgecraftGame.Cube(FudgecraftGame.CUBE_MATERIAL_TYPE.GREY, ankerPositionCenter, allFixedPositions);
    function hndload(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        gameNode.appendChild(fragmentToControl);
        gameNode.appendChild(orbitCamera);
        gameNode.appendChild(ankerCube);
        window.addEventListener("keydown", controlFragment);
        viewport.initialize("Viewport", gameNode, orbitCamera.cameraComponent, canvas);
        viewport.draw();
        console.log("Hallo");
    }
    function controlFragment(_event) {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.W:
                fragmentToControl.move(allFixedPositions, FudgecraftGame.MOVE.LAYER_UP);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.S:
                fragmentToControl.move(allFixedPositions, FudgecraftGame.MOVE.LAYER_DOWN);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.A:
                fragmentToControl.move(allFixedPositions, FudgecraftGame.MOVE.LEFT);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.D:
                fragmentToControl.move(allFixedPositions, FudgecraftGame.MOVE.RIGHT);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                fragmentToControl.move(allFixedPositions, FudgecraftGame.MOVE.IN);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                fragmentToControl.move(allFixedPositions, FudgecraftGame.MOVE.OUT);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.ONE:
                orbitCamera.rotate(0);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.TWO:
                orbitCamera.rotate(90);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.THREE:
                orbitCamera.rotate(180);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.FOUR:
                orbitCamera.rotate(270);
                viewport.draw();
                break;
        }
    }
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Main.js.map