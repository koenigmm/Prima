namespace FudgecraftGame {
    import ƒ = FudgeCore;

    export enum VIEW {
        VORNE = "vorne",
        HINTEN = "hinten",
        LINKS = "links",
        RECHTS = "rechts"
    }

    export class OrbitCamera extends ƒ.Node {
        public view: VIEW = VIEW.VORNE;
        // Camera
        private cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        private distance: number;
        //private positionCamera: ƒ.Vector3 = new ƒ.Vector3(0 , 0, 0);
        // Light
        private cmpLightDirectional: ƒ.ComponentLight;
        private cmpLightAmbient: ƒ.ComponentLight;
        private directionalLight: ƒ.LightDirectional;
        private lightTarget: ƒ.Vector3;
        private ambientLight: ƒ.LightAmbient;
        private tranform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0)));

        constructor(distance: number, backgroundColor: ƒ.Color, directionalLightColor: ƒ.Color, ambientLightColor: ƒ.Color, lightTarget: ƒ.Vector3) {
            super("Orbit Camera");
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

        public get cameraComponent(): ƒ.ComponentCamera {
            return this.cmpCamera;
        }

        public rotate(angle: number): void {
            this.getComponent(ƒ.ComponentTransform).local.rotation = new ƒ.Vector3(-20, angle, 0);
        } 

    }

}