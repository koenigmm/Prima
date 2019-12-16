"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    class FixedPosition {
        constructor(row, positionInRow, layer) {
            this.isUsed = false;
            //this.id = id;
            this.positionInRow = positionInRow;
            this.row = row;
            this.layer = layer;
        }
    }
    FudgecraftGame.FixedPosition = FixedPosition;
    class AllFixedPositions {
        //private amountOfPositions: number;
        constructor(edgeSizeForDimension) {
            this.edgeSizeForDimension = edgeSizeForDimension;
            //this.amountOfPositions = edgeSizeForDimension * edgeSizeForDimension * edgeSizeForDimension;
            this.allFixedPositionsList = this.createEmptyFixedPositions();
            console.log(this.allFixedPositionsList);
        }
        isPositionInGrid(fixedPosition) {
            if (fixedPosition.positionInRow >= this.edgeSizeForDimension || fixedPosition.row >= this.edgeSizeForDimension || fixedPosition.layer >= this.edgeSizeForDimension) {
                return false;
            }
            else if (fixedPosition.positionInRow < 0 || fixedPosition.row < 0 || fixedPosition.layer < 0) {
                return false;
            }
            else
                return true;
        }
        setPostion(fixedPosition, cubeToSet) {
            let positionInRow = fixedPosition.positionInRow;
            let row = fixedPosition.row;
            let layer = fixedPosition.layer;
            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow == positionInRow && c.row == row && c.layer == layer) {
                    c.isUsed = true;
                    c.cubeInPosition = cubeToSet;
                }
            }
        }
        makeSelectedPositionEmpty(fixedPosition) {
            let positionInRow = fixedPosition.positionInRow;
            let row = fixedPosition.row;
            let layer = fixedPosition.layer;
            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow === positionInRow && c.row === row && c.layer === layer) {
                    c.isUsed = false;
                    c.cubeInPosition = null;
                }
            }
        }
        createEmptyFixedPositions() {
            let emptyGrid = new Array();
            for (let index = 0; index < this.edgeSizeForDimension; index++) {
                let emptyLayer = this.createEmptyLayer(index);
                for (const position of emptyLayer) {
                    emptyGrid.push(position);
                }
            }
            return emptyGrid;
        }
        createEmptyRow(row, layer) {
            let emptyRow = new Array();
            for (let index = 0; index < this.edgeSizeForDimension; index++) {
                let emptyPosition = new FixedPosition(row, index, layer);
                emptyPosition.fixedPosition = new ƒ.Vector3(index, row, layer);
                //AllFixedPositions.idCounter ++;
                emptyRow.push(emptyPosition);
            }
            return emptyRow;
        }
        createEmptyLayer(layer) {
            let emptyLayer = new Array();
            for (let index = 0; index < this.edgeSizeForDimension; index++) {
                let emptyRow = this.createEmptyRow(index, layer);
                for (const position of emptyRow) {
                    emptyLayer.push(position);
                }
            }
            return emptyLayer;
        }
    }
    FudgecraftGame.AllFixedPositions = AllFixedPositions;
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=FixedPositions.js.map