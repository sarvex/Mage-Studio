import {
    Box,
    Color,
    Cone,
    constants,
    Cube,
    Cylinder,
    math,
    Plane,
    Sphere,
    store,
} from "mage-engine";
import { hierarchyChange } from "../../../../actions/hierarchy";
import { getRandomPrototypeTexture, pickRandomPosition } from "../../../../lib/util";

export const addCube = () => {
    const cube = new Cube(20, 0xeeeeee);

    cube.setPosition(pickRandomPosition());
    cube.setTextureMap(getRandomPrototypeTexture());

    store.dispatch(hierarchyChange());
};

export const addSphere = () => {
    const sphere = new Sphere(20, 0xffff00);
    sphere.setPosition(pickRandomPosition());
    sphere.setTextureMap(getRandomPrototypeTexture());

    store.dispatch(hierarchyChange());
};

export const addCylinder = () => {
    const cylinder = new Cylinder(10, 10, 30, 0x0fff00);
    cylinder.setPosition(pickRandomPosition());
    cylinder.setTextureMap(getRandomPrototypeTexture());

    store.dispatch(hierarchyChange());
};

export const addCone = () => {
    const radius = 10;
    const height = 15;

    const cone = new Cone(radius, height);
    cone.setPosition(pickRandomPosition());
    cone.setTextureMap(getRandomPrototypeTexture());

    store.dispatch(hierarchyChange());
};

export const addBox = () => {
    const width = math.randomIntFromInterval(10, 20);
    const height = math.randomIntFromInterval(10, 20);
    const depth = math.randomIntFromInterval(10, 20);

    const box = new Box(width, height, depth, Color.randomColor(true));

    box.setPosition(pickRandomPosition());
    box.setTextureMap(getRandomPrototypeTexture());

    store.dispatch(hierarchyChange());
};

export const addPlane = () => {
    const height = math.randomIntFromInterval(10, 50);
    const width = math.randomIntFromInterval(10, 50);

    const plane = new Plane(height, width, { color: Color.randomColor(true) });

    plane.setPosition(pickRandomPosition());
    plane.setTexture(getRandomPrototypeTexture(), constants.TEXTURES.MAP);

    store.dispatch(hierarchyChange());
};
