"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor() {
            super("Fragmenttyp: " + FudgecraftGame.FRAGMENT_TYPE);
            this.componentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0)));
            // Test
            // this.materialType = CUBE_MATERIAL_TYPE.RED;
            // this.fragmentType = FRAGMENT_TYPE.STUFEN_REIHE;
            this.setRandomMaterialType();
            this.setRandomFragmentType();
            this.createFragment();
            this.addComponent(this.componentTransform);
            //this.setPosition(new ƒ.Vector3(2, 0, 0));
        }
        setPosition(position) {
            this.componentTransform.local = ƒ.Matrix4x4.TRANSLATION(position);
        }
        setRotation(rotation) {
            this.componentTransform.local.rotation = rotation;
        }
        createFragment() {
            switch (this.fragmentType) {
                case FudgecraftGame.FRAGMENT_TYPE.DREI_REIHE:
                    this.createDreierReihe();
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.L_REIHE:
                    this.createLReihe();
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.L_REIHE_REVERSE:
                    this.createLReiheReverse();
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.ZWEI_REIHE:
                    this.createZweierReihe();
                    break;
                case FudgecraftGame.FRAGMENT_TYPE.STUFEN_REIHE:
                    this.createStufenReihe();
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
        createDreierReihe() {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            let cube02 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            let cube03 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
        }
        createLReihe() {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            let cube02 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            let cube03 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            let cube04 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(2, 1, 0));
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
        }
        createLReiheReverse() {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            let cube02 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(0, 1, 0));
            let cube03 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            let cube04 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
        }
        createZweierReihe() {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            let cube02 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            this.appendChild(cube01);
            this.appendChild(cube02);
        }
        createStufenReihe() {
            let cube01 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(0, 0, 0));
            let cube02 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(1, 0, 0));
            let cube03 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(1, 1, 0));
            let cube04 = new FudgecraftGame.Cube(this.materialType, new ƒ.Vector3(2, 0, 0));
            this.appendChild(cube01);
            this.appendChild(cube02);
            this.appendChild(cube03);
            this.appendChild(cube04);
        }
    }
    FudgecraftGame.Fragment = Fragment;
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=Fragment.js.map