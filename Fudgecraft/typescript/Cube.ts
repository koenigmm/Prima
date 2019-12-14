namespace FudgecraftGame {
    import ƒ = FudgeCore;
    let cubeCounter: number = 0;

    export class Cube extends ƒ.Node {
        private mesh: ƒ.MeshCube = new ƒ.MeshCube;
        private material: ƒ.Material;

        constructor(cubeMaterialType: CUBE_MATERIAL_TYPE, postion: ƒ.Vector3) {
            super("cube" + cubeCounter);
            this.addComponent(new ƒ.ComponentMesh(this.mesh));
            this.setMaterial(cubeMaterialType);
            this.addComponent(new ƒ.ComponentMaterial(this.material));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(postion)));
        }

        private setMaterial(type: CUBE_MATERIAL_TYPE): void {
            switch (type) {
                case CUBE_MATERIAL_TYPE.BLUE:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.BLUE, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.BLUE));
                    break;
                case CUBE_MATERIAL_TYPE.CYAN:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CYAN));
                    break;
                case CUBE_MATERIAL_TYPE.GREEN:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREEN));
                    break;
                case CUBE_MATERIAL_TYPE.GREY:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREY));
                    break;
                case CUBE_MATERIAL_TYPE.MAGENTA:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.MAGENTA));
                    break;
                case CUBE_MATERIAL_TYPE.RED:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.RED));
                    break;
                case CUBE_MATERIAL_TYPE.YELLOW:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.YELLOW));
            }
        }

    }
}