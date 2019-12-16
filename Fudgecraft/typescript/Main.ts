namespace FudgecraftGame {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndload);

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    let camera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    let gameNode: ƒ.Node = new ƒ.Node("GameNode");

    function hndload(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        camera.pivot.translateZ(40);
        camera.backgroundColor = ƒ.Color.WHITE;

        let allFixedPositionsTest: AllFixedPositions = new AllFixedPositions(5);
      
        //Fragment Test
        let myFragment: Fragment = new Fragment(allFixedPositionsTest);
        myFragment.move(allFixedPositionsTest, MOVE.IN);
        myFragment.move(allFixedPositionsTest, MOVE.IN);
        myFragment.move(allFixedPositionsTest, MOVE.IN);
        myFragment.cmpTransform.local.rotation = new ƒ.Vector3(45, 45, 45);
        gameNode.appendChild(myFragment);
        

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