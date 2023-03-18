import { HIERARCHY_CHANGE } from "./types";

export const hierarchyChange = graph => {
    return {
        type: HIERARCHY_CHANGE,
        graph,
    };
};
