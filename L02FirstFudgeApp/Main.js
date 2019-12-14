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
        //let mesh: fudge.MeshCube = new fudge.MeshCube();
        let cmpMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        cmpMesh.pivot.translateZ(0.1);
        cmpMesh.pivot.rotateZ(4);
        cmpMesh.pivot.translateX(0.2);
        let mtrSolidWhite = new fudge.Material("Solid White", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0.2, 1, 1, 1)));
        let mtrComponent = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(mtrComponent);
        let camera = new fudge.ComponentCamera();
        camera.pivot.translateZ(3);
        camera.pivot.rotateX(5);
        camera.pivot.rotateY(12);
        let node02 = new fudge.Node("Cube");
        let meshcube = new fudge.MeshCube();
        let mtrGreen = new fudge.Material("Green", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0.9, 0, 0)));
        let mtrCubeMaterial = new fudge.ComponentMaterial(mtrGreen);
        let cmpCube = new fudge.ComponentMesh(meshcube);
        node02.addComponent(cmpCube);
        node02.addComponent(mtrCubeMaterial);
        cmpCube.pivot.translateY(1);
        let node03 = new fudge.Node("circle");
        let meshPyramid = new fudge.MeshPyramid();
        let mtrBlue = new fudge.Material("Blue", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 0)));
        let mtrPyramidMaterialComonenent = new fudge.ComponentMaterial(mtrBlue);
        let cmpPyramid = new fudge.ComponentMesh(meshPyramid);
        node03.addComponent(mtrPyramidMaterialComonenent);
        node03.addComponent(cmpPyramid);
        cmpPyramid.pivot.translateX(-1.5);
        node.appendChild(node02);
        node.appendChild(node03);
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        //fudge.Matrix4x4() Translate ausprobieren eigentlich schon gemacht. s
    }
})(L02FirstFudge || (L02FirstFudge = {}));
//TODO
//Node Modules 
//Package Json mit ins Verzeichnis nehmen 
// Gitignore anlegen damit sie nicht von Git mitgenommen werden
// Kamera standardmäßig im Weltursprung, deshalb muss die Kamera in z-Richtung bewegt werden.
/*
Bis Donnerstag weiter mit den Systemen beschäftigen
Translate, Pivot, Matrizen, Meshes usw.
Look at verwenden
ausprobieren
*/
/*
Pong
Eventlistener auf die Tasten (Keyboardevent)
Objekte müssen bewegt werden
Vorischt was man bewegen will. Die Meshes oder vielleicht doch besser die Knoten
Backface Culling beachten
set invervall und alle x Sekunden etwas aufrufen.
Vorsicht mit anonymen Funktionen
*/ 
//# sourceMappingURL=Main.js.map