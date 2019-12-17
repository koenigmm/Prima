namespace FudgecraftGame {
    import ƒ = FudgeCore;

    export class Fragment extends ƒ.Node {
        private fragmentType: FRAGMENT_TYPE;
        private materialType: CUBE_MATERIAL_TYPE;
        private componentTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))); //Platzhalter
        private listOfCubes: Array<Cube> = new Array<Cube>();

        constructor(allFixedPositions: AllFixedPositions) {
            super("Fragmenttyp: " + FRAGMENT_TYPE);
            this.setRandomMaterialType();
            this.setRandomFragmentType();
            this.createFragment(allFixedPositions);
            this.addComponent(this.componentTransform);
            console.log(this.listOfCubes);
        }

        public move(allFixedPositions: AllFixedPositions, move: MOVE): void {
            // Save Positions
            let copyOfFragmentPositions: Array<FixedPosition> = new Array<FixedPosition>();
            let copyOfCubeList: Array<Cube> = new Array<Cube>();

            for (const cube of this.listOfCubes) {
                let valuePosition: FixedPosition = new FixedPosition(cube.fixedPosition.row, cube.fixedPosition.positionInRow, cube.fixedPosition.layer);
                let valueCube: Cube = new Cube(CUBE_MATERIAL_TYPE.TRANSPARENT, valuePosition, allFixedPositions);
                copyOfFragmentPositions.push(valuePosition);
                copyOfCubeList.push(valueCube);
            }
            
            switch (move) {
                case MOVE.LAYER_UP:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;

                case MOVE.LAYER_DOWN:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;

                case MOVE.LEFT:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;

                case MOVE.RIGHT:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;

                case MOVE.IN:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;

                case MOVE.OUT:
                    if (this.makeTestMove(move, copyOfFragmentPositions, allFixedPositions)) {
                        for (let cube of this.listOfCubes) {
                            cube.move(allFixedPositions, move);
                        }
                    }
                    break;
                default:
                    console.log("Bewegungstyp nicht erkannt");
            }
        }


        private makeTestMove(move: MOVE, copyOfFragmentPositions: Array<FixedPosition>, allFixedPositions: AllFixedPositions): boolean {
            // Test Move
            let success: boolean = false;
            let positionBeforeTestMove: Array<FixedPosition> = new Array<FixedPosition>();

            for (let position of this.listOfCubes) {
                // Copy default position
                let row: number = position.fixedPosition.row;
                let layer: number = position.fixedPosition.layer;
                let positionInRow: number = position.fixedPosition.positionInRow;
                positionBeforeTestMove.push(new FixedPosition(row, positionInRow, layer));

                allFixedPositions.makeSelectedPositionUnused(position.fixedPosition);
            }

            // Maker Move
            switch (move) {
                case MOVE.LAYER_UP:
                    for (let position of copyOfFragmentPositions) {
                        position.layer++;
                    }
                    break;

                case MOVE.LAYER_DOWN:
                    for (let position of copyOfFragmentPositions) {
                        position.layer--;
                    }
                    break;

                case MOVE.LEFT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow--;
                    }
                    break;

                case MOVE.RIGHT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow++;
                    }
                    break;

                case MOVE.IN: {
                    for (let position of copyOfFragmentPositions) {
                        position.row++;
                    }
                    break;
                }

                case MOVE.OUT: {
                    for (let position of copyOfFragmentPositions) {
                        position.row--;
                    }
                    break;
                }

            }
            // Check
            for (let fixedPosition of copyOfFragmentPositions) {
                let row: number = fixedPosition.row;
                let positionInRow: number = fixedPosition.positionInRow;
                let layer: number = fixedPosition.layer;
                console.log(row, layer, positionInRow);

                if (allFixedPositions.isPositionInGrid(fixedPosition) && allFixedPositions.isPostionUsed(row, layer, positionInRow) == false) {
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
                case MOVE.LAYER_UP:
                    for (let position of copyOfFragmentPositions) {
                        position.layer--;
                    }
                    break;

                case MOVE.LAYER_DOWN:
                    for (let position of copyOfFragmentPositions) {
                        position.layer++;
                    }
                    break;

                case MOVE.LEFT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow++;
                    }
                    break;

                case MOVE.RIGHT:
                    for (let position of copyOfFragmentPositions) {
                        position.positionInRow--;
                    }
                    break;

                case MOVE.IN: {
                    for (let position of copyOfFragmentPositions) {
                        position.row--;
                    }
                    break;
                }

                case MOVE.OUT: {
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


        private createFragment(allFixedPositions: AllFixedPositions): void {
            switch (this.fragmentType) {
                case FRAGMENT_TYPE.DREI_REIHE:
                    this.createDreierReihe(allFixedPositions);
                    break;
                case FRAGMENT_TYPE.L_REIHE:
                    this.createLReihe(allFixedPositions);
                    break;
                case FRAGMENT_TYPE.L_REIHE_REVERSE:
                    this.createLReiheReverse(allFixedPositions);
                    break;
                case FRAGMENT_TYPE.ZWEI_REIHE:
                    this.createZweierReihe(allFixedPositions);
                    break;
                case FRAGMENT_TYPE.STUFEN_REIHE:
                    this.createStufenReihe(allFixedPositions);
                    break;
            }

        }

        private setRandomFragmentType(): void {
            let max: number = 5;
            let min: number = 1;
            let randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;

            switch (randomNumber) {
                case 1:
                    this.fragmentType = FRAGMENT_TYPE.DREI_REIHE;
                    break;
                case 2:
                    this.fragmentType = FRAGMENT_TYPE.ZWEI_REIHE;
                    break;
                case 3:
                    this.fragmentType = FRAGMENT_TYPE.L_REIHE;
                    break;
                case 4:
                    this.fragmentType = FRAGMENT_TYPE.L_REIHE_REVERSE;
                    break;
                case 5:
                    this.fragmentType = FRAGMENT_TYPE.STUFEN_REIHE;
                    break;
            }
        }

        private setRandomMaterialType(): void {
            let max: number = 7;
            let min: number = 1;
            let randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;

            switch (randomNumber) {
                case 1:
                    this.materialType = CUBE_MATERIAL_TYPE.BLUE;
                    break;
                case 2:
                    this.materialType = CUBE_MATERIAL_TYPE.CYAN;
                    break;
                case 3:
                    this.materialType = CUBE_MATERIAL_TYPE.GREEN;
                    break;
                case 4:
                    this.materialType = CUBE_MATERIAL_TYPE.GREY;
                    break;
                case 5:
                    this.materialType = CUBE_MATERIAL_TYPE.MAGENTA;
                    break;
                case 6:
                    this.materialType = CUBE_MATERIAL_TYPE.RED;
                    break;
                case 7:
                    this.materialType = CUBE_MATERIAL_TYPE.YELLOW;
                    break;
            }
        }

        private createDreierReihe(allFixedPositions: AllFixedPositions): void {
            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(0, 1, 0), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(0, 2, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            this.listOfCubes.push(cube03);
            console.log("DreierReihe");

        }

        private createLReihe(allFixedPositions: AllFixedPositions): void {
            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(0, 1, 0), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(0, 2, 0), allFixedPositions);
            let cube04: Cube = new Cube(this.materialType, new FixedPosition(0, 2, 1), allFixedPositions);
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

        private createLReiheReverse(allFixedPositions: AllFixedPositions): void {
            console.log("lReihe Reverse");

            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 1), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(0, 1, 0), allFixedPositions);
            let cube04: Cube = new Cube(this.materialType, new FixedPosition(0, 2, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            this.listOfCubes.push(cube03);
            this.listOfCubes.push(cube04);
        }

        private createZweierReihe(allFixedPositions: AllFixedPositions): void {
            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(0, 1, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.listOfCubes.push(cube01);
            this.listOfCubes.push(cube02);
            console.log("Zweier Reihe");
        }

        private createStufenReihe(allFixedPositions: AllFixedPositions): void {
            console.log("Stufen Reihe");

            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(0, 1, 0), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(0, 1, 1), allFixedPositions);
            let cube04: Cube = new Cube(this.materialType, new FixedPosition(0, 2, 0), allFixedPositions);
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
}