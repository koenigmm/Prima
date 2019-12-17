"use strict";
var FudgecraftGame;
(function (FudgecraftGame) {
    var ƒ = FudgeCore;
    class OrbitCamera extends ƒ.Node {
        constructor(distance, backgroundColor, directionalLightColor, ambientLightColor, lightTarget) {
            super("Orbit Camera");
            // Camera
            this.cmpCamera = new ƒ.ComponentCamera();
            this.tranform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0)));
            //this.cmpCamera.projectCentral();
            this.distance = distance;
            this.cmpCamera.backgroundColor = backgroundColor;
            this.cmpCamera.pivot.translation = new ƒ.Vector3(0, 0, this.distance);
            this.addComponent(this.cmpCamera);
            this.lightTarget = lightTarget;
            this.addComponent(this.tranform);
            this.ambientLight = new ƒ.LightAmbient(ambientLightColor);
            this.directionalLight = new ƒ.LightDirectional(directionalLightColor);
            this.cmpLightDirectional = new ƒ.ComponentLight(this.directionalLight);
            this.cmpLightDirectional.pivot.lookAt(this.lightTarget);
            this.cmpLightAmbient = new ƒ.ComponentLight(this.ambientLight);
            this.addComponent(this.cmpLightDirectional);
            this.addComponent(this.cmpLightAmbient);
            this.getComponent(ƒ.ComponentTransform).local.rotation = new ƒ.Vector3(-20, 0, 0);
        }
        get cameraComponent() {
            return this.cmpCamera;
        }
        rotate(angle) {
            this.getComponent(ƒ.ComponentTransform).local.rotation = new ƒ.Vector3(-20, angle, 0);
        }
    }
    FudgecraftGame.OrbitCamera = OrbitCamera;
})(FudgecraftGame || (FudgecraftGame = {}));
//# sourceMappingURL=OrbitCamera.js.map