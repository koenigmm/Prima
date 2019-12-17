"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    //let cubeCounter: number = 0;
    let MOVE;
    (function (MOVE) {
        MOVE["LAYER_UP"] = "Layer Up";
        MOVE["LAYER_DOWN"] = "Layer Down";
        MOVE["RIGHT"] = "Right";
        MOVE["LEFT"] = "LEFT";
        MOVE["IN"] = "In";
        MOVE["OUT"] = "Out";
    })(MOVE = FudgecraftGame.MOVE || (FudgecraftGame.MOVE = {}));
    class Cube extends ƒ.Node {
        constructor(cubeMaterialType, postion, allFixedPositions) {
            super("cube");
            this.mesh = new ƒ.MeshCube;
            this.fixedPosition = postion;
            this.updateFixedPositonAsVector();
            this.createCube(cubeMaterialType, allFixedPositions);
        }
        move(allFixedPositions, move) {
            switch (move) {
                case MOVE.LAYER_UP:
                    allFixedPositions.makeSelectedPositionEmpty(this.fixedPosition);
                    this.fixedPosition.layer++;
                    break;
                case MOVE.LAYER_DOWN:
                    allFixedPositions.makeSelectedPositionEmpty(this.fixedPosition);
                    this.fixedPosition.layer--;
                    break;
                case MOVE.LEFT:
                    allFixedPositions.makeSelectedPositionEmpty(this.fixedPosition);
                    this.fixedPosition.positionInRow--;
                    break;
                case MOVE.RIGHT:
                    allFixedPositions.makeSelectedPositionEmpty(this.fixedPosition);
                    this.fixedPosition.positionInRow++;
                    break;
                case MOVE.IN:
                    allFixedPositions.makeSelectedPositionEmpty(this.fixedPosition);
                    this.fixedPosition.row++;
                    break;
                case MOVE.OUT:
                    allFixedPositions.makeSelectedPositionEmpty(this.fixedPosition);
                    this.fixedPosition.row--;
                    break;
            }
            this.updateFixedPositonAsVector();
            allFixedPositions.setPostion(this.fixedPosition, this);
            this.getComponent(ƒ.ComponentTransform).local = ƒ.Matrix4x4.TRANSLATION(this.fixedPostionAsVector);
        }
        createCube(cubeMaterialType, allFixedPositions) {
            this.addComponent(new ƒ.ComponentMesh(this.mesh));
            this.setMaterial(cubeMaterialType);
            this.addComponent(new ƒ.ComponentMaterial(this.material));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(this.fixedPostionAsVector)));
            allFixedPositions.setPostion(this.fixedPosition, this);
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
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.GREEN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREEN));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.GREY:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.GREY, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREY));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.MAGENTA:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.MAGENTA, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.MAGENTA));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.RED:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.RED, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.RED));
                    break;
                case FudgecraftGame.CUBE_MATERIAL_TYPE.YELLOW:
                    this.material = new ƒ.Material(FudgecraftGame.CUBE_MATERIAL_TYPE.YELLOW, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.YELLOW));
                    break;
            }
        }
        updateFixedPositonAsVector() {
            this.fixedPostionAsVector = new ƒ.Vector3(this.fixedPosition.positionInRow, this.fixedPosition.layer, this.fixedPosition.row);
        }
    }
    FudgecraftGame.Cube = Cube;
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Cube.js.map