namespace L02FirstFudge {
    import fudge = FudgeCore;
    window.addEventListener("load", hndload);
    function hndload(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        console.log(canvas);

        let node: fudge.Node = new fudge.Node("Quad");
        let mesh: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let mtrSolidWhite: fudge.Material = new fudge.Material("Solid White", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let mtrComponent: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(mtrComponent);
        let camera: fudge.ComponentCamera = new fudge.ComponentCamera();
        camera.pivot.translateZ(2);
        //camera.pivot.rotateX(5);
        let viewport: fudge.Viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, camera, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        //fudge.Matrix4x4() Translate ausprobieren eigentlich schon gemacht. 
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
