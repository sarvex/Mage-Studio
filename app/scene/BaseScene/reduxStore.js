import { isEqual } from 'lodash';

export const observeStore = (store, onChange) => {
    let currentState;

    function handleChange() {
        let nextState = select(store.getState());
        if (!isEqual(nextState, currentState)) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}

export const select = (state) => {
    const { controls = {}, fog = {}, snap = {}, rightsidebar } = state;
    const { element, position, rotation, scale } = rightsidebar;

    return {
        snap,
        controls,
        fog,
        element,
        position,
        rotation,
        scale
    };
}
