"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var fudge = FudgeCore;
    class Fragment extends fudge.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.position = new fudge.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type = Fragment.getRandomEnum(L07_FudgeCraft_Fragments.CUBE_TYPE);
                let vctPosition = fudge.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L07_FudgeCraft_Fragments.Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }
        static getShapeArray() {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L07_FudgeCraft_Fragments.Fragment = Fragment;
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Fragment.js.map