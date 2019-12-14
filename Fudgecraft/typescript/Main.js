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
        //Test Cubes
        // let myCube: Cube = new Cube(CUBE_MATERIAL_TYPE.GREEN, new ƒ.Vector3(1, 1 , 1));
        // let myCube2: Cube = new Cube(CUBE_MATERIAL_TYPE.BLUE, new ƒ.Vector3(2, 1 , 1));
        // let myCube3: Cube = new Cube(CUBE_MATERIAL_TYPE.RED, new ƒ.Vector3(3, 1 , 1));
        let myFragment = new FudgecraftGame.Fragment();
        myFragment.setPosition(new ƒ.Vector3(0, -5, 0));
        gameNode.appendChild(myFragment);
        let myFragment02 = new FudgecraftGame.Fragment();
        gameNode.appendChild(myFragment02);
        console.log(gameNode);
        //myFragment02.cmpTransform.local.translateY(5);
        myFragment02.setPosition(new ƒ.Vector3(0, 2.5, 0));
        myFragment02.setRotation(new ƒ.Vector3(120, 0, 0));
        //console.log(myTestFragment.getPosition());
        // Lights
        let cmpLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        gameNode.addComponent(cmpLight);
        let cmpLightAmbient = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.GREY));
        gameNode.addComponent(cmpLightAmbient);
        //Append
        // gameNode.appendChild(myCube);
        // gameNode.appendChild(myCube2);
        // gameNode.appendChild(myCube3);
        viewport.initialize("Viewport", gameNode, camera, canvas);
        viewport.draw();
        console.log("Hallo");
    }
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Main.js.map