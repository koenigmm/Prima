namespace FudgecraftGame {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndload);

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    let orbitCamera: OrbitCamera = new OrbitCamera(30, ƒ.Color.WHITE, ƒ.Color.WHITE, ƒ.Color.GREY, new ƒ.Vector3(0.5, 1, 0.8));
    let gameNode: ƒ.Node = new ƒ.Node("GameNode");
    let edgeSize: number = 10;
    //let halfOfEdge: number = (edgeSize / 2) - 1;
    let allFixedPositions: AllFixedPositions = new AllFixedPositions(edgeSize);
    let fragmentToControl: Fragment = new Fragment(allFixedPositions);
    let ankerPositionCenter: FixedPosition = new FixedPosition(0, 0, edgeSize - 1);
    let ankerCube: Cube = new Cube(CUBE_MATERIAL_TYPE.GREY, ankerPositionCenter, allFixedPositions);

    function hndload(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        gameNode.appendChild(fragmentToControl);
        
        gameNode.appendChild(orbitCamera);
        gameNode.appendChild(ankerCube);

        window.addEventListener("keydown", controlFragment);

        viewport.initialize("Viewport", gameNode, orbitCamera.cameraComponent, canvas);
        viewport.draw();
        console.log("Hallo");
    }


    function controlFragment(_event: KeyboardEvent): void {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.W:
                fragmentToControl.move(allFixedPositions, MOVE.LAYER_UP);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.S:
                fragmentToControl.move(allFixedPositions, MOVE.LAYER_DOWN);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.A:
                fragmentToControl.move(allFixedPositions, MOVE.LEFT);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.D:
                fragmentToControl.move(allFixedPositions, MOVE.RIGHT);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                fragmentToControl.move(allFixedPositions, MOVE.IN);
                viewport.draw();
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                fragmentToControl.move(allFixedPositions, MOVE.OUT);
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
}