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
        //Camera
        //camera.pivot.translate(new ƒ.Vector3(50, 50, 50));
        //camera.pivot.lookAt(ƒ.Vector3.ZERO());
        //camera.pivot.rotateY(90);
        camera.pivot.translateZ(40);
        camera.backgroundColor = ƒ.Color.WHITE;
        let allFixedPositionsTest = new FudgecraftGame.AllFixedPositions(10);
        let myCube = new FudgecraftGame.Cube(FudgecraftGame.CUBE_MATERIAL_TYPE.BLUE, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositionsTest);
        for (let index = 1; index < 9; index++) {
            myCube.move(allFixedPositionsTest, FudgecraftGame.MOVE.LAYER_UP);
        }
        gameNode.appendChild(myCube);
        //let myFragment: Fragment = new Fragment(allFixedPositionsTest);
        //myFragment.setPosition(new ƒ.Vector3(0, -5, 0));
        //gameNode.appendChild(myFragment);
        //myFragment.setRotation(new ƒ.Vector3(0, 45, 0));
        // let myFragment02: Fragment = new Fragment();
        // gameNode.appendChild(myFragment02);
        // myFragment02.setPosition(new ƒ.Vector3(0, 2.5, 0));
        // myFragment02.setRotation(new ƒ.Vector3(120, 0, 0));
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