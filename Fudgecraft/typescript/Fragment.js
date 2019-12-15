"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(allFixedPositions) {
            super("Fragmenttyp: " + FudgecraftGame.FRAGMENT_TYPE);
            this.componentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0)));
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
        setRotation(rotation) {
            this.componentTransform.local.rotation = rotation;
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
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(1, 0, 0), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(2, 0, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            console.log("DreierReihe");
        }
        createLReihe(allFixedPositions) {
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            // let cube03: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            // let cube04: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 1, 0));
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(1, 0, 0), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(2, 0, 0), allFixedPositions);
            let cube04 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(2, 0, 1), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
            console.log("LREIHE");
        }
        createLReiheReverse(allFixedPositions) {
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 1, 0));
            // let cube03: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            // let cube04: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            console.log("lReihe Reverse");
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(1, 0, 0), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(2, 0, 0), allFixedPositions);
            let cube04 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(2, 0, 1), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
        }
        createZweierReihe(allFixedPositions) {
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(1, 0, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            console.log("Zweier Reihe");
        }
        createStufenReihe(allFixedPositions) {
            console.log("Stufen Reihe");
            // let cube01: Cube = new Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            // let cube02: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            // let cube03: Cube = new Cube(this.materialType, new ƒ.Vector3(1, 1, 0));
            // let cube04: Cube = new Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            let cube01 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(0, 0, 0), allFixedPositions);
            let cube02 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(1, 0, 0), allFixedPositions);
            let cube03 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(1, 0, 1), allFixedPositions);
            let cube04 = new FudgecraftGame.Cube(this.materialType, new FudgecraftGame.FixedPosition(2, 0, 0), allFixedPositions);
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
        }
    }
    FudgecraftGame.Fragment = Fragment;
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Fragment.js.map