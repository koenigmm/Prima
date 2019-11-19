"use strict";
var fudgecraftFragments;
(function (fudgecraftFragments) {
    var fudge = FudgeCore;
    class Cube extends fudge.Node {
        constructor(_position) {
            super("Cube");
            let cmpMesh = new fudge.ComponentMesh(Cube.mesh);
            this.addComponent(cmpMesh);
            let cmpTransform = new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(fudge.Vector3.ONE(0.9));
            this.addComponent(cmpTransform);
        }
    }
    Cube.mesh = new fudge.MeshCube();
    fudgecraftFragments.Cube = Cube;
})(fudgecraftFragments || (fudgecraftFragments = {}));
//# sourceMappingURL=Cube.js.map