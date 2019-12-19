"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    class FixedPosition {
        constructor(row, positionInRow, layer) {
            this.isUsed = false;
            this.positionInRow = positionInRow;
            this.row = row;
            this.layer = layer;
        }
    }
    FudgecraftGame.FixedPosition = FixedPosition;
    class AllFixedPositions {
        constructor(edgeSizeForDimension) {
            this.edgeSizeForDimension = edgeSizeForDimension;
            this.allFixedPositionsList = this.createEmptyFixedPositions();
        }
        detectComboInRow(rowToCheck, layerToCheck, amountOfCubesForCombo) {
            let counter = 0;
            let cubesInRow = this.getAllCubesInRow(rowToCheck, layerToCheck);
            let firstCubeToCompare = cubesInRow[0];
            for (let cube of cubesInRow) {
                if (cube != null && cube != undefined) {
                    if (cube.material.name === firstCubeToCompare.material.name) {
                        counter++;
                        firstCubeToCompare = cube;
                    }
                    else
                        counter = 0;
                }
                if (counter == amountOfCubesForCombo) {
                    console.log(true);
                    return true;
                }
            }
            console.log(false);
            return false;
        }
        detectComboInVerticalRow(positionInRow, rowToCheck, amountOfCubesForCombo) {
            let counter = 0;
            let cubesInVerticalRow = this.getAllCubesInVerticalRow(rowToCheck, positionInRow);
            let firstCubeToCompare = cubesInVerticalRow[0];
            for (let cube of cubesInVerticalRow) {
                if (cube != null && cube != undefined) {
                    if (cube.material.name === firstCubeToCompare.material.name) {
                        counter++;
                        firstCubeToCompare = cube;
                    }
                    else
                        counter = 0;
                }
                if (counter == amountOfCubesForCombo) {
                    console.log(true);
                    return true;
                }
            }
            console.log(false);
            return false;
        }
        isPositionUsed(row, layer, positionInRow) {
            for (let position of this.allFixedPositionsList) {
                if (row === position.row && layer === position.layer && positionInRow === position.positionInRow) {
                    if (position.isUsed) {
                        return true;
                    }
                }
            }
            return false;
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
        setPosition(fixedPosition, cubeToSet) {
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
        makeSelectedPositionUnused(fixedPosition) {
            let positionInRow = fixedPosition.positionInRow;
            let row = fixedPosition.row;
            let layer = fixedPosition.layer;
            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow === positionInRow && c.row === row && c.layer === layer) {
                    c.isUsed = false;
                }
            }
        }
        makeSelectedPositioUsed(fixedPosition) {
            let positionInRow = fixedPosition.positionInRow;
            let row = fixedPosition.row;
            let layer = fixedPosition.layer;
            for (let c of this.allFixedPositionsList) {
                if (c.positionInRow === positionInRow && c.row === row && c.layer === layer) {
                    c.isUsed = true;
                }
            }
        }
        getAllCubesInRow(row, layer) {
            let listOfCubes = new Array();
            for (let position of this.allFixedPositionsList) {
                if (position.cubeInPosition != undefined) {
                    if (position.layer == layer && position.row == row) {
                        listOfCubes.push(position.cubeInPosition);
                    }
                }
            }
            return listOfCubes;
        }
        getAllCubesInVerticalRow(row, positionInRow) {
            let listOfCubes = new Array();
            for (let position of this.allFixedPositionsList) {
                if (position.cubeInPosition != undefined) {
                    if (position.row == row && position.positionInRow == positionInRow) {
                        listOfCubes.push(position.cubeInPosition);
                    }
                }
            }
            return listOfCubes;
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