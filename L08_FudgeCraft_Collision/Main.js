"use strict";
var L08_FudgeCraft_Collsion;
(function (L08_FudgeCraft_Collsion) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let rotate = fudge.Vector3.ZERO();
    let grid = new L08_FudgeCraft_Collsion.Grid;
    function hndLoad(_event) {
        grid.set("Jonas", new L08_FudgeCraft_Collsion.Cube(L08_FudgeCraft_Collsion.CUBE_TYPE.GREEN, fudge.Vector3.ZERO()));
        console.log(grid.get("Jonas"));
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        game = new fudge.Node("FudgeCraft");
        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment = new L08_FudgeCraft_Collsion.Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform());
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collsion.Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collsion.Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-3))));
        game.appendChild(fragment);
        let cmpLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);
        viewport.draw();
        fudge.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function hndKeyDown(_event) {
        //let rotate: ƒ.Vector3 = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case fudge.KEYBOARD_CODE.ARROW_UP:
                rotate.add(fudge.Vector3.X(-1));
                break;
            case fudge.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(fudge.Vector3.X(1));
                break;
            case fudge.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(fudge.Vector3.Y(-1));
                break;
            case fudge.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(fudge.Vector3.Y(1));
                break;
        }
        for (let fragment of game.getChildren()) {
            // fragment.cmpTransform.local.rotate(rotate);
            fragment.cmpTransform.local.rotation = rotate;
        }
        fudge.RenderManager.update();
        viewport.draw();
    }
})(L08_FudgeCraft_Collsion || (L08_FudgeCraft_Collsion = {}));
//# sourceMappingURL=Main.js.map