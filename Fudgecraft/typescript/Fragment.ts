namespace FudgecraftGame {
    import ƒ = FudgeCore;

    export class Fragment extends ƒ.Node {
        private fragmentType: FRAGMENT_TYPE;
        private materialType: CUBE_MATERIAL_TYPE;
        private componentTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0)));

        constructor(allFixedPositions: AllFixedPositions) {
            super("Fragmenttyp: " + FRAGMENT_TYPE);
            // Test
            // this.materialType = CUBE_MATERIAL_TYPE.RED;
            // this.fragmentType = FRAGMENT_TYPE.STUFEN_REIHE;
            this.setRandomMaterialType();
            this.setRandomFragmentType();
            this.createFragment(allFixedPositions);
            this.addComponent(this.componentTransform);
            //this.setPosition(new ƒ.Vector3(2, 0, 0));
        }

        //Platzhalter
        // public setPosition(position: ƒ.Vector3): void {
        //     this.componentTransform.local = ƒ.Matrix4x4.TRANSLATION(position);
        // }

        //Platzhalter
        public setRotation(rotation: ƒ.Vector3): void {
            this.componentTransform.local.rotation = rotation;
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
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(1, 0, 0), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(2, 0, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            console.log("DreierReihe");
            
        }

        private createLReihe(allFixedPositions: AllFixedPositions): void {
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            // let cube03: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            // let cube04: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 1, 0));
            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(1, 0, 0), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(2, 0, 0), allFixedPositions);
            let cube04: Cube = new Cube(this.materialType, new FixedPosition(2, 0, 1), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
            console.log("LREIHE");
            
        }

        private createLReiheReverse(allFixedPositions: AllFixedPositions): void {
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 1, 0));
            // let cube03: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            // let cube04: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            console.log("lReihe Reverse");
            
            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(1, 0, 0), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(2, 0, 0), allFixedPositions);
            let cube04: Cube = new Cube(this.materialType, new FixedPosition(2, 0, 1), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
        }

        private createZweierReihe(allFixedPositions: AllFixedPositions): void {
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(1, 0, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            console.log("Zweier Reihe");
            
        }

        private createStufenReihe(allFixedPositions: AllFixedPositions): void {
            console.log("Stufen Reihe");
            
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            // let cube03: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 1, 0));
            // let cube04: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            let cube01: Cube = new Cube(this.materialType, new FixedPosition(0, 0, 0), allFixedPositions);
            let cube02: Cube = new Cube(this.materialType, new FixedPosition(1, 0, 0), allFixedPositions);
            let cube03: Cube = new Cube(this.materialType, new FixedPosition(1, 0, 1), allFixedPositions);
            let cube04: Cube = new Cube(this.materialType, new FixedPosition(2, 0, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
        }

    }
}