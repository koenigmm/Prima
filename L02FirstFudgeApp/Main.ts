namespace L02FirstFudge {
    import fudge = FudgeCore;
    window.addEventListener("load", hndload);
    function hndload(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        console.log(canvas);

        let node: fudge.Node = new fudge.Node("Quad");
        let mesh: fudge.MeshQuad = new fudge.MeshQuad();
        //let mesh: fudge.MeshCube = new fudge.MeshCube();
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        cmpMesh.pivot.translateZ(0.1);
        cmpMesh.pivot.rotateZ(4);
        cmpMesh.pivot.translateX(0.2);

        let mtrSolidWhite: fudge.Material = new fudge.Material("Solid White", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0.2, 1, 1, 1)));
        let mtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(mtrComponent);
        let camera: fudge.ComponentCamera = new fudge.ComponentCamera();
        camera.pivot.translateZ(3);
        camera.pivot.rotateX(5);
        camera.pivot.rotateY(12);

        let node02: fudge.Node = new fudge.Node("Cube");
        let meshcube: fudge.MeshCube = new fudge.MeshCube();
        let mtrGreen: fudge.Material = new fudge.Material("Green", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0.9, 0, 0)));
        let mtrCubeMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrGreen);
        let cmpCube: fudge.ComponentMesh = new fudge.ComponentMesh(meshcube);
        node02.addComponent(cmpCube);
        node02.addComponent(mtrCubeMaterial);
        cmpCube.pivot.translateY(1);

        let node03: fudge.Node = new fudge.Node("circle");
        let meshPyramid: fudge.MeshPyramid = new fudge.MeshPyramid();
        let mtrBlue: fudge.Material = new fudge.Material("Blue",fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 0)));
        let mtrPyramidMaterialComonenent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrBlue);
        let cmpPyramid: fudge.ComponentMesh = new fudge.ComponentMesh(meshPyramid);
        node03.addComponent(mtrPyramidMaterialComonenent);
        node03.addComponent(cmpPyramid);
        cmpPyramid.pivot.translateX(-1.5);

        node.appendChild(node02);
        node.appendChild(node03);
        
        let viewport: fudge.Viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        //fudge.Matrix4x4() Translate ausprobieren eigentlich schon gemacht. s
    }
}

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