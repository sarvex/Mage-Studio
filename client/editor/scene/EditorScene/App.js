import {
    Level,
    Models,
    Scene,
    Scripts,
    Controls,
    Images,
    THREE,
    Grid,
    AmbientLight,
    SunLight,
    PointLight,
    SpotLight,
    HemisphereLight,
    Cube,
    Sphere,
    Cylinder,
    Cone,
    Box,
    Plane,
    Color,
    math,
    constants,
} from "mage-engine";
import { hierarchyChange } from "../../../actions/hierarchy";

import { GLOBAL_SPACE, LOCAL_SPACE, ROTATE_CONTROL } from "../../../lib/constants";
import { getRandomPrototypeTexture, pickRandomPosition } from "../../../lib/util";
export class EditorScene extends Level {
    constructor(options) {
        super(options);
    }

    dispatchUpdatedHierarchy = () => {
        console.log("dispatching hierarchy change", Scene.getHierarchy());
        this.dispatchEvent({
            type: "hierarchyChange",
            graph: Scene.getHierarchy(),
        });
    };

    addAmbientLight = () => {
        AmbientLight.create({
            color: 0xeeeeee,
            intensity: 1,
        }).addHelpers();

        this.dispatchUpdatedHierarchy();
    };

    addSunLight = () => {
        const light = SunLight({
            color: 0xeeeeee,
            intensity: 1,
            position: { x: 40, y: 40, z: 40 },
            target: { x: 1, y: 1, z: 1 },
        });
        light.addHelpers();
        light.setPosition(pickRandomPosition());

        this.dispatchUpdatedHierarchy();
    };

    addPointLight = () => {
        const pointLight = PointLight.create({
            color: Color.randomColor(true),
            intensity: 1,
            distance: 20,
            decay: 1,
        });

        pointLight.addHelpers();
        pointLight.setPosition(pickRandomPosition());

        this.dispatchUpdatedHierarchy();
    };

    addSpotLight = () => {
        const spotlight = SpotLight.create({
            color: Color.randomColor(true),
            intensity: 1,
            distance: 10,
        });

        spotlight.addHelpers();
        spotlight.setPosition(pickRandomPosition());

        this.dispatchUpdatedHierarchy();
    };

    addHemisphereLight = () => {
        const hemispherelight = HemisphereLight.create({
            color: {
                sky: constants.PALETTES.BASE.WHITE,
                ground: constants.PALETTES.BASE.BLACK,
            },
            intensity: 1,
        });

        hemispherelight.addHelpers();
        hemispherelight.setPosition(pickRandomPosition());

        this.dispatchUpdatedHierarchy();
    };

    addCube = () => {
        const cube = new Cube(20, 0xeeeeee);

        cube.setPosition(pickRandomPosition());
        cube.setTextureMap(getRandomPrototypeTexture());

        this.dispatchUpdatedHierarchy();
    };

    addSphere = () => {
        const sphere = new Sphere(20, 0xffff00);
        sphere.setPosition(pickRandomPosition());
        sphere.setTextureMap(getRandomPrototypeTexture());

        this.dispatchUpdatedHierarchy();
    };

    addCylinder = () => {
        const cylinder = new Cylinder(10, 10, 30, 0x0fff00);
        cylinder.setPosition(pickRandomPosition());
        cylinder.setTextureMap(getRandomPrototypeTexture());

        this.dispatchUpdatedHierarchy();
    };

    addCone = () => {
        const radius = 10;
        const height = 15;

        const cone = new Cone(radius, height);
        cone.setPosition(pickRandomPosition());
        cone.setTextureMap(getRandomPrototypeTexture());

        this.dispatchUpdatedHierarchy();
    };

    addBox = () => {
        const width = math.randomIntFromInterval(10, 20);
        const height = math.randomIntFromInterval(10, 20);
        const depth = math.randomIntFromInterval(10, 20);

        const box = new Box(width, height, depth, Color.randomColor(true));

        box.setPosition(pickRandomPosition());
        box.setTextureMap(getRandomPrototypeTexture());

        this.dispatchUpdatedHierarchy();
    };

    addPlane = () => {
        const height = math.randomIntFromInterval(10, 50);
        const width = math.randomIntFromInterval(10, 50);

        const plane = new Plane(height, width, { color: Color.randomColor(true) });

        plane.setPosition(pickRandomPosition());
        plane.setTexture(getRandomPrototypeTexture(), constants.TEXTURES.MAP);

        this.dispatchUpdatedHierarchy();
    };

    loadModel(model) {
        const parsed = Models.parseModel(model);
        parsed.setScale({ x: 5, y: 5, z: 5 });
        parsed.setPosition({ x: 0, y: 0, z: 0 });
    }

    loadScript(scriptContent) {
        const script = Scripts.createFromString(scriptContent);
        this.currentElement.addScript(script.name());
    }

    updateCurrentElement(name = "", position, rotation, scale) {
        if (this.currentElement && this.hasSelection) {
            this.currentElement.setPosition(position);
            this.currentElement.setRotation(rotation);
            this.currentElement.setScale(scale);
            this.currentElement.setName(name, { replace: true });

            this.dispatchEvent({
                type: "elementChanged",
                name: this.currentElement.name,
                position,
                rotation,
                scale,
            });
        }
    }

    getCurrentElement() {
        return this.currentElement;
    }

    onElementClick({ elements = [] }) {
        const { element } = elements[0];
        this.currentElement = element;
        this.hasSelection = true;
        this.transform.attach(element);

        this.dispatchEvent({
            type: "elementAttached",
            name: element.name,
            rotation: element.getRotation(),
            scale: element.getScale(),
            position: element.getPosition(),
        });
    }

    onElementDeselect() {
        console.log("deselecting");
        this.hasSelection = false;
        this.dispatchEvent({ type: "elementDetached" });
    }

    onKeyDown(e) {
        console.log(e);
    }
    onKeyUp(e) {}

    onKeyPress({ event }) {
        switch (event.key) {
            case "q": // Q
                this.transform.setSpace(this.transform.space === "local" ? "world" : "local");
                break;
            case "ctrl": // Ctrl
                this.transform.setTranslationSnap(100);
                this.transform.setRotationSnap(THREE.Math.degToRad(15));
                break;
            // case "w": // W
            //     this.transform.setMode(TRANSLATE_CONTROL);
            //     break;
            // case "e": // E
            //     this.transform.setMode(ROTATE_CONTROL);
            //     break;
            // case "r": // R
            //     this.transform.setMode(SCALE_CONTROL);
            //     break;
            case 187:
            case 107: // +, =, num+
                this.transform.setSize(this.transform.size + 0.1);
                break;
            case 189:
            case 109: // -, _, num-
                this.transform.setSize(Math.max(this.transform.size - 0.1, 0.1));
                break;
            case "x": // X
                this.transform.showX = !this.transform.showX;
                break;
            case "y": // Y
                this.transform.showY = !this.transform.showY;
                break;
            case "z": // Z
                this.transform.showZ = !this.transform.showZ;
                break;
            case 32: // Spacebar
                this.transform.enabled = !this.transform.enabled;
                break;
            case "escape":
                this.transform.detach();
                break;
        }
    }

    setTranformControls() {
        Controls.setOrbitControl();
        Controls.setTransformControl();

        this.transform = Controls.getControl("transform");
        this.transform.addEventListener("objectChange", this.dispatchElementChange.bind(this));
    }

    changeTransformControl(control) {
        if (this.transform) {
            if (this.transform.getMode() != control) {
                console.log(control, ROTATE_CONTROL, control === ROTATE_CONTROL);
                this.transform.setMode(control);
            }
        }
    }

    toggleTransformSpace() {
        if (this.transform) {
            const current = this.transform.getSpace();
            this.transform.setSpace(current === GLOBAL_SPACE ? LOCAL_SPACE : GLOBAL_SPACE);
        }
    }

    changeTransformSnap(enabled = false, value = 10) {
        if (this.transform) {
            if (enabled) {
                this.transform.setTranslationSnap(value);
                this.transform.setRotationSnap(THREE.Math.degToRad(value / 10));
            } else {
                this.transform.setTranslationSnap(null);
                this.transform.setRotationSnap(null);
            }
        }
    }

    changeFog(fog) {
        if (fog.color && fog.density && fog.enabled) {
            Scene.fog(fog.color, fog.density / 1000);
        }
    }

    changeTexture(textureId, texturePath) {
        if (this.currentElement) {
            Images.loadSingleTexture(textureId, texturePath).then(texture => {
                this.currentElement.setTexture(textureId);
            });
        }
    }

    changeMaterial(materialName) {
        if (this.currentElement) {
            this.currentElement.setMaterialFromName(materialName);
        }
    }

    dispatchElementChange() {
        if (!this.transform.object || !this.currentElement) return;

        this.dispatchEvent({
            type: "elementChanged",
            name: this.currentElement.name,
            rotation: this.currentElement.getRotation(),
            scale: this.currentElement.getScale(),
            position: this.currentElement.getPosition(),
        });
    }

    handleSceneChange(state) {
        if (state.requested) {
            this.dispatchEvent({
                type: "sceneExported",
                data: this.toJSON(),
            });
        }
    }

    resize(width, height) {
        Scene.resize(width, height);
    }

    onCreate() {
        Scene.getCamera().setPosition({ y: 70, z: 150 });
        Scene.getCamera().lookAt(0, 0, 0);
        Scene.setClearColor(0x040d10);

        // this.dispatchUpdatedHierarchy();

        this.setTranformControls();

        this.grid = new Grid(2000, 100, 0xfb9d60, 0x5a6668);
    }
}
