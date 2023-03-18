import { math } from "mage-engine";

export const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
};

export const upperCaseFirst = (text = "") => {
    const split = text.split("");
    return split.length ? split.shift().toUpperCase().concat(split.join("")) : "";
};

const PROTOTYPE_TEXTURES = [
    "cube_prototype_green",
    "cube_prototype_dark",
    "cube_prototype_light",
    "cube_prototype_orange",
    "cube_prototype_purple",
];

export const getRandomPrototypeTexture = () => math.pickRandom(PROTOTYPE_TEXTURES);

export const pickRandomPosition = () => ({
    x: math.randomIntFromInterval(-100, 100),
    y: math.randomIntFromInterval(-100, 100),
    z: math.randomIntFromInterval(-100, 100),
});
