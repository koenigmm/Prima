"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndload);
    let viewport = new ƒ.Viewport();
    let camera = new ƒ.ComponentCamera();
    let gameNode = new ƒ.Node("GameNode");
    function hndload(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        camera.pivot.translateZ(40);
        camera.backgroundColor = ƒ.Color.WHITE;
        let allFixedPositionsTest = new FudgecraftGame.AllFixedPositions(5);
        //Fragment Test
        let myFragment = new FudgecraftGame.Fragment(allFixedPositionsTest);
        myFragment.move(allFixedPositionsTest, FudgecraftGame.MOVE.IN);
        myFragment.move(allFixedPositionsTest, FudgecraftGame.MOVE.IN);
        myFragment.move(allFixedPositionsTest, FudgecraftGame.MOVE.IN);
        myFragment.cmpTransform.local.rotation = new ƒ.Vector3(45, 45, 45);
        gameNode.appendChild(myFragment);
        // Lights
        let cmpLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        gameNode.addComponent(cmpLight);
        let cmpLightAmbient = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.GREY));
        gameNode.addComponent(cmpLightAmbient);
        viewport.initialize("Viewport", gameNode, camera, canvas);
        viewport.draw();
        console.log("Hallo");
    }
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Main.js.map