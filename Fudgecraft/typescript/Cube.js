"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    let cubeCounter = 0;
    class Cube extends ƒ.Node {
        constructor(cubeMaterialType, postion) {
            super("cube" + cubeCounter);
            this.mesh = new ƒ.MeshCube;
            this.addComponent(new ƒ.ComponentMesh(this.mesh));
            this.setMaterial(cubeMaterialType);
            this.addComponent(new ƒ.ComponentMaterial(this.material));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(postion)));
        }
        setMaterial(type) {
            switch (type) {
                case FudgecraftGame.CUBE_MATERIAL_TYPE.BLUE:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.BLUE, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.BLUE));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CYAN));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.GREEN:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREEN));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.GREY:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREY));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.MAGENTA:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.MAGENTA));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.RED:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.RED));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.YELLOW:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.YELLOW));
            }
        }
    }
    FudgecraftGame.Cube = Cube;
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Cube.js.map