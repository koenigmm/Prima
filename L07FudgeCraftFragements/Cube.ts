namespace fudgecraftFragments {
    import fudge = FudgeCore;

    export class Cube extends fudge.Node {
        private static mesh: fudge.MeshCube = new fudge.MeshCube();

        constructor (_position: fudge.Vector3) {
            super("Cube");
            let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Cube.mesh);
            this.addComponent(cmpMesh);
            
            
            let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(fudge.Vector3.ONE(0.9));
            this.addComponent(cmpTransform);
        }
    }
}