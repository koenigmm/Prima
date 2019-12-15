namespace FudgecraftGame {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndload);

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    let camera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    let gameNode: ƒ.Node = new ƒ.Node("GameNode");

    function hndload(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        
        //Camera
        //camera.pivot.translate(new ƒ.Vector3(50, 50, 50));
        //camera.pivot.lookAt(ƒ.Vector3.ZERO());
        //camera.pivot.rotateY(90);
        camera.pivot.translateZ(40);
        camera.backgroundColor = ƒ.Color.WHITE;

        let allFixedPositionsTest: AllFixedPositions = new AllFixedPositions(10);
        let myCube: Cube = new Cube(CUBE_MATERIAL_TYPE.BLUE, new FixedPosition(0, 0, 0), allFixedPositionsTest);
        
        for (let index: number = 1; index < 9; index++) {
            myCube.move(allFixedPositionsTest, MOVE.LAYER_UP);
            
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
        let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        gameNode.addComponent(cmpLight);
        let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.GREY));
        gameNode.addComponent(cmpLightAmbient);

        
        viewport.initialize("Viewport", gameNode, camera, canvas);
        viewport.draw();
        console.log("Hallo");
    }
}