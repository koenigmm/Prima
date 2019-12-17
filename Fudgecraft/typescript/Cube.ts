namespace FudgecraftGame {
    import ƒ = FudgeCore;
    //let cubeCounter: number = 0;

    export enum MOVE {
        LAYER_UP = "Layer Up",
        LAYER_DOWN = "Layer Down",
        RIGHT = "Right",
        LEFT = "LEFT",
        IN = "In",
        OUT = "Out"
    }

    export class Cube extends ƒ.Node {
        public fixedPosition: FixedPosition;
        private mesh: ƒ.MeshCube = new ƒ.MeshCube;
        private material: ƒ.Material;
        private fixedPostionAsVector: ƒ.Vector3;

        constructor(cubeMaterialType: CUBE_MATERIAL_TYPE, postion: FixedPosition, allFixedPositions: AllFixedPositions) {
            super("cube");
            this.fixedPosition = postion;
            //this.fixedPostionAsVector = new ƒ.Vector3(this.fixedPosition.positionInRow, this.fixedPosition.layer, this.fixedPosition.row);
            this.updateFixedPositonAsVector();
            this.createCube(cubeMaterialType, allFixedPositions);

        }

        // public getFixedPosition(): FixedPosition {
        //     return this.fixedPosition;
        // }


        public move(allFixedPositions: AllFixedPositions, move: MOVE): void {
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


        private createCube(cubeMaterialType: CUBE_MATERIAL_TYPE, allFixedPositions: AllFixedPositions): void {
            this.addComponent(new ƒ.ComponentMesh(this.mesh));
            this.setMaterial(cubeMaterialType);
            this.addComponent(new ƒ.ComponentMaterial(this.material));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(this.fixedPostionAsVector)));
            allFixedPositions.setPostion(this.fixedPosition, this);
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
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.GREEN, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREEN));
                    break;
                case CUBE_MATERIAL_TYPE.GREY:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.GREY, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.GREY));
                    break;
                case CUBE_MATERIAL_TYPE.MAGENTA:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.MAGENTA, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.MAGENTA));
                    break;
                case CUBE_MATERIAL_TYPE.RED:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.RED, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.RED));
                    break;
                case CUBE_MATERIAL_TYPE.YELLOW:
                    this.material = new ƒ.Material(CUBE_MATERIAL_TYPE.YELLOW, ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.YELLOW));
                    break;
            }
        }

        private updateFixedPositonAsVector(): void {
            this.fixedPostionAsVector = new ƒ.Vector3(this.fixedPosition.positionInRow, this.fixedPosition.layer, this.fixedPosition.row);
        }

    }
}