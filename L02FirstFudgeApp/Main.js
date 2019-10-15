"use strict";
var L02FirstFudge;
(function (L02FirstFudge) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndload);
    function hndload(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        console.log(canvas);
        let node = new fudge.Node("Quad");
        let mesh = new fudge.MeshQuad();
        let cmpMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new fudge.Material("Solid White", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let mtrComponent = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(mtrComponent);
        let camera = new fudge.ComponentCamera();
        camera.pivot.translateZ(2);
        //camera.pivot.rotateX(5);
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        //fudge.Matrix4x4() Translate ausprobieren eigentlich schon gemacht. 
    }
})(L02FirstFudge || (L02FirstFudge = {}));
//Node Modules 
//Package Json mit ins Verzeichnis nehmen 
// Gitignore anlegen damit sie nicht von Git mitgenommen werden
// IN Canvas weißes Rechteck erzeugen
// Kamera standardmäßig im Weltursprung, deshalb muss die Kamera in z-Richtung bewegt werden.
//# sourceMappingURL=Main.js.map