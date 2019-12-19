"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(allFixedPositions) {
            super("Fragmenttyp: " + FudgecraftGame.FRAGMENT_TYPE);
            this.componentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))); //Platzhalter
            this.listOfCubes = new Array();
            this.setRandomMaterialType();
            this.setRandomFragmentType();
            this.createFragment(allFixedPositions);
            this.addComponent(this.componentTransform);
            console.log(this.listOfCubes);
        }
        move(allFixedPositions, move) {
            // Save Positions
            let copyOfFragmentPositions = new Array();
            let copyOfCubeList = new Array();
            let success = false;
            for (const cube of this.listOfCubes) {
                let valuePosition = new FudgecraftGame.FixedPosition(cube.fixedPosition.row, cube.fixedPosition.positionInRow, cube.fixedPosition.layer);
                let valueCube = new FudgecraftGame.Cube(FudgecraftGame.CUBE_MATERIAL_TYPE.TRANSPARENT, valuePosition, allFixedPositions);
                copyOfFragmentPositions.push(valuePosition);
                copyOfCubeList.push(valueCube);
            }
            switch (move) {
                case FudgecraftGame.MOVE.LAYER_UP:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        success = true;
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;
                case FudgecraftGame.MOVE.LAYER_DOWN:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        success = true;
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;
                case FudgecraftGame.MOVE.LEFT:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        success = true;
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;
                case FudgecraftGame.MOVE.RIGHT:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        success = true;
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;
                case FudgecraftGame.MOVE.IN:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        success = true;
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;
                case FudgecraftGame.MOVE.OUT:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        success = true;
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;
                default:
                    console.log("Bewegungstyp nicht erkannt");
            }
            /*
            Das ist ist nur ein Testblock
            Die detectComboMethoden sollten in einer eignen Methode ausgeführt werden
            Die so erkannten würfel sollten gelöscht werden
            */
            if (success) {
                if (allFixedPositions.detectComboInVerticalRow(4, 0, 3)) {
                    FudgecraftGame.comboCounter++;
                    document.getElementById("combocounter").innerText = FudgecraftGame.comboCounter.toString();
                }
                //allFixedPositions.detectComboInRow(4, 0, 4);
            }
        }
        makeTestMove(move, copyOfFragmentPositions, allFixedPositions) {
            // Test Move
            let success = false;
            let positionBeforeTestMove = new Array();
            for (let position of this.listOfCubes) {
                // Copy default position
                let row = position.fixedPosition.row;
                let layer = position.fixedPosition.layer;
                let positionInRow = position.fixedPosition.positionInRow;
                positionBeforeTestMove.push(new FudgecraftGame.FixedPosition(row, positionInRow, layer));
                allFixedPositions.makeSelectedPositionUnused(position.fixedPosition);
            }
            // Maker Move
            switch (move) {
                case FudgecraftGame.MOVE.LAYER_UP:
                    for (let position of copyOfFragmentPositions) {
                        position.layer++;
                    }
                    break;
                case FudgecraftGame.MOVE.LAYER_DOWN:
                    for (let position of copyOfFragmentPositions) {
                        position.layer--;
                    }
                    break;
                case FudgecraftGame.MOVE.LEFT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow--;
                    }
                    break;
                case FudgecraftGame.MOVE.RIGHT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow++;
                    }
                    break;
                case FudgecraftGame.MOVE.IN: {
                    for (let position of copyOfFragmentPositions) {
                        position.row++;
                    }
                    break;
                }
                case FudgecraftGame.MOVE.OUT: {
                    for (let position of copyOfFragmentPositions) {
                        position.row--;
                    }
                    break;
                }
            }
            // Check
            for (let fixedPosition of copyOfFragmentPositions) {
                let row = fixedPosition.row;
                let positionInRow = fixedPosition.positionInRow;
                let layer = fixedPosition.layer;
                //console.log(row, layer, positionInRow);
                if (allFixedPositions.isPositionInGrid(fixedPosition) && allFixedPositions.isPositionUsed(row, layer, positionInRow) == false) {
                    success = true;
                    continue;
                }
                else {
                    success = false;
                    break;
                }
            }
            // Reverse Move
            switch (move) {
                case FudgecraftGame.MOVE.LAYER_UP:
                    for (let position of copyOfFragmentPositions) {
                        position.layer--;
                    }
                    break;
                case FudgecraftGame.MOVE.LAYER_DOWN:
                    for (let position of copyOfFragmentPositions) {
                        position.layer++;
                    }
                    break;
                case FudgecraftGame.MOVE.LEFT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow++;
                    }
                    break;
                case FudgecraftGame.MOVE.RIGHT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow--;
                    }
                    break;
                case FudgecraftGame.MOVE.IN: {
                    for (let position of copyOfFragmentPositions) {
                        position.row--;
                    }
                    break;
                }
                case FudgecraftGame.MOVE.OUT: {
                    for (let position of copyOfFragmentPositions) {
                        position.row++;
                    }
                    break;
                }
            }
            //allFixedPositions.makeSelectedPositioUsed(pseudoSetupPosition);
            for (let position of positionBeforeTestMove) {
                allFixedPositions.makeSelectedPositioUsed(position);
            }
            return success;
        }
        createFragment(allFixedPositions) {
            switch (this.fragmentType) {
                case FudgecraftGame.FRAGMENT_TYPE.DREI_REIHE:
                    this.createDreierReihe(allFixedPositions);
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.L_REIHE:
                    this.createLReihe(allFixedPositions);
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.L_REIHE_REVERSE:
                    this.createLReiheReverse(allFixedPositions);
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.ZWEI_REIHE:
                    this.createZweierReihe(allFixedPositions);
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.STUFEN_REIHE:
                    this.createStufenReihe(allFixedPositions);
                    break;
            }
        }
        setRandomFragmentType() {
            let max = 5;
            let min = 1;
            let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            switch (randomNumber) {
                case 1:
                    this.fragmentType = FudgecraftGame.FRAGMENT_TYPE.DREI_REIHE;
                    break;
                case 2:
                    this.fragmentType = FudgecraftGame.FRAGMENT_TYPE.ZWEI_REIHE;
                    break;
                case 3:
                    this.fragmentType = FudgecraftGame.FRAGMENT_TYPE.L_REIHE;
                    break;
                case 4:
                    this.fragmentType = FudgecraftGame.FRAGMENT_TYPE.L_REIHE_REVERSE;
                    break;
                case 5:
                    this.fragmentType = FudgecraftGame.FRAGMENT_TYPE.STUFEN_REIHE;
                    break;
            }
        }
        setRandomMaterialType() {
            let max = 7;
            let min = 1;
            let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            switch (randomNumber) {
                case 1:
                    this.materialType = FudgecraftGame.CUBE_MATERIAL_TYPE.BLUE;
                    break;
                case 2:
                    this.materialType = FudgecraftGame.CUBE_MATERIAL_TYPE.CYAN;
                    break;
                case 3:
                    this.materialType = FudgecraftGame.CUBE_MATERIAL_TYPE.GREEN;
                    break;
                case 4:
                    this.materialType = FudgecraftGame.CUBE_MATERIAL_TYPE.GREY;
                    break;
                case 5:
                    this.materialType = FudgecraftGame.CUBE_MATERIAL_TYPE.MAGENTA;
                    break;
                case 6:
                    this.materialType = FudgecraftGame.CUBE_MATERIAL_TYPE.RED;
                    break;
                case 7:
                    this.materialType = FudgecraftGame.CUBE_MATERIAL_TYPE.YELLOW;
                    break;
            }
        }
        createDreierReihe(allFixedPositions) {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 1, 0), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 2, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            this.listOfCubes.push(cube03);
            console.log("DreierReihe");
        }
        createLReihe(allFixedPositions) {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 1, 0), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 2, 0), allFixedPositions);
            let cube04 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 2, 1), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            this.listOfCubes.push(cube03);
            this.listOfCubes.push(cube04);
            console.log("LREIHE");
        }
        createLReiheReverse(allFixedPositions) {
            console.log("lReihe Reverse");
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 1), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 1, 0), allFixedPositions);
            let cube04 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 2, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            this.listOfCubes.push(cube03);
            this.listOfCubes.push(cube04);
        }
        createZweierReihe(allFixedPositions) {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 1, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            console.log("Zweier Reihe");
        }
        createStufenReihe(allFixedPositions) {
            console.log("Stufen Reihe");
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 1, 0), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 1, 1), allFixedPositions);
            let cube04 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 2, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            this.listOfCubes.push(cube03);
            this.listOfCubes.push(cube04);
        }
    }
    FudgecraftGame.Fragment = Fragment;
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Fragment.js.map