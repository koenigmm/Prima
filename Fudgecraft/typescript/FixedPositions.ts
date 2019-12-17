namespace FudgecraftGame {
    import ƒ = FudgeCore;

    export class FixedPosition {
        public positionInRow: number;
        public row: number;
        public layer: number;
        public isUsed: boolean = false;
        public cubeInPosition: Cube;
        public fixedPosition: ƒ.Vector3;

        constructor(row: number, positionInRow: number, layer: number) {
            this.positionInRow = positionInRow;
            this.row = row;
            this.layer = layer;
        }
    }

    export class AllFixedPositions {
        public allFixedPositionsList: Array<FixedPosition>;
        private edgeSizeForDimension: number;

        constructor(edgeSizeForDimension: number) {
            this.edgeSizeForDimension = edgeSizeForDimension;
            this.allFixedPositionsList = this.createEmptyFixedPositions();
        }


        public isPostionUsed(row: number, layer: number, positionInRow: number): boolean {
            for (let position of this.allFixedPositionsList) {

                if (row === position.row && layer === position.layer && positionInRow === position.positionInRow) {
                    if (position.isUsed) {
                        return true;
                    }
                }
            }
            return false;
        }


        public isPositionInGrid(fixedPosition: FixedPosition): boolean {
            if (fixedPosition.positionInRow >= this.edgeSizeForDimension || fixedPosition.row >= this.edgeSizeForDimension || fixedPosition.layer >= this.edgeSizeForDimension) {
                return false;
            }
            else if (fixedPosition.positionInRow < 0 || fixedPosition.row < 0 || fixedPosition.layer < 0) {
                return false;
            }
            else return true;
        }

        public setPostion(fixedPosition: FixedPosition, cubeToSet: Cube): void {
            let positionInRow: number = fixedPosition.positionInRow;
            let row: number = fixedPosition.row;
            let layer: number = fixedPosition.layer;


            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow == positionInRow && c.row == row && c.layer == layer) {
                    c.isUsed = true;
                    c.cubeInPosition = cubeToSet;
                }
            }
        }


        public makeSelectedPositionEmpty(fixedPosition: FixedPosition): void {
            let positionInRow: number = fixedPosition.positionInRow;
            let row: number = fixedPosition.row;
            let layer: number = fixedPosition.layer;


            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow === positionInRow && c.row === row && c.layer === layer) {
                    c.isUsed = false;
                    c.cubeInPosition = null;
                }
            }
        }

        public makeSelectedPositionUnused(fixedPosition: FixedPosition): void {
            let positionInRow: number = fixedPosition.positionInRow;
            let row: number = fixedPosition.row;
            let layer: number = fixedPosition.layer;


            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow === positionInRow && c.row === row && c.layer === layer) {
                    c.isUsed = false;
                }
            }
        }

        public makeSelectedPositioUsed(fixedPosition: FixedPosition): void {
            let positionInRow: number = fixedPosition.positionInRow;
            let row: number = fixedPosition.row;
            let layer: number = fixedPosition.layer;


            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow === positionInRow && c.row === row && c.layer === layer) {
                    c.isUsed = true;
                }
            }
        }

        private createEmptyFixedPositions(): Array<FixedPosition> {
            let emptyGrid: Array<FixedPosition> = new Array<FixedPosition>();
            for (let index: number = 0; index < this.edgeSizeForDimension; index++) {
                let emptyLayer: Array<FixedPosition> = this.createEmptyLayer(index);

                for (const position of emptyLayer) {
                    emptyGrid.push(position);
                }
            }
            return emptyGrid;
        }

        private createEmptyRow(row: number, layer: number): Array<FixedPosition> {
            let emptyRow: Array<FixedPosition> = new Array<FixedPosition>();
            for (let index: number = 0; index < this.edgeSizeForDimension; index++) {
                let emptyPosition: FixedPosition = new FixedPosition(row, index, layer);
                emptyPosition.fixedPosition = new ƒ.Vector3(index, row, layer);
                //AllFixedPositions.idCounter ++;
                emptyRow.push(emptyPosition);
            }
            return emptyRow;
        }

        private createEmptyLayer(layer: number): Array<FixedPosition> {
            let emptyLayer: Array<FixedPosition> = new Array<FixedPosition>();
            for (let index: number = 0; index < this.edgeSizeForDimension; index++) {
                let emptyRow: Array<FixedPosition> = this.createEmptyRow(index, layer);

                for (const position of emptyRow) {
                    emptyLayer.push(position);
                }
            }
            return emptyLayer;
        }


    }
}