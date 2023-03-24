import { getOrCreateApp } from "../editor/scene/AppProxy";
import { SELECTION_CHANGE } from "./types";

export const selectionChange = selection => {
    getOrCreateApp().then(app => {
        const { name } = selection.element;

        app.selectElementByName(name);
    });

    return {
        type: SELECTION_CHANGE,
        selection,
    };
};
