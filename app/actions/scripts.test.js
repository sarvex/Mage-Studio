import sinon from 'sinon';
import * as actions from './scripts';
import axios from 'axios';
import {
    SCRIPTS_FETCH_STARTED,
    SCRIPTS_FETCH_COMPLETED,
    SCRIPTS_FETCH_FAILED,
    SCRIPTS_NEW_FILE_MODAL,
    SCRIPTS_SINGLE_FETCH_COMPLETED
} from './types';
jest.mock('axios');

describe('Scripts', () => {

    beforeEach(() => {
        axios.mockClear();
        axios.get.mockClear();
        axios.post.mockClear();
    });

    it('scriptsFetchStarted should return the right type', () => {
        expect(actions.scriptsFetchStarted()).toEqual({ type: SCRIPTS_FETCH_STARTED });
    });

    it('scriptsFetchCompleted should return the right type', () => {
        const response = { data: [] };
        expect(actions.scriptsFetchCompleted(response)).toEqual({
            type: SCRIPTS_FETCH_COMPLETED,
            list: []
        });
    });

    it('scriptsFetchFailed should return the right type', () => {
        expect(actions.scriptsFetchFailed()).toEqual({ type: SCRIPTS_FETCH_FAILED });
    });

    it('singleScriptFetchCompleted should return the right type', () => {
        const data = 'content';
        expect(actions.singleScriptFetchCompleted(data)).toEqual({
            type: SCRIPTS_SINGLE_FETCH_COMPLETED,
            data
        });
    });

    it('displayNewScriptModal should return the right type and value when its visible', () => {
        expect(actions.displayNewScriptModal(true)).toEqual({
            type: SCRIPTS_NEW_FILE_MODAL,
            visible: true
        })
    });

    it('displayNewScriptModal should return the right type and value when its invisible', () => {
        expect(actions.displayNewScriptModal(false)).toEqual({
            type: SCRIPTS_NEW_FILE_MODAL,
            visible: false
        })
    });

    describe('getScripts', () => {

        it('should make the call to the right endpoint', () => {
            const project = 'fake';
            const fakeDispatch = f => f;
            actions.getScripts(project)(fakeDispatch);

            expect(axios.get).toHaveBeenCalledWith('/api/projects/fake/scripts');
        });
    });

    describe('newScript', () => {
        it('should make the call to the right endpoint and right payload');
    });

    describe('loadSingleScript', () => {
        it('should make the call to the right endpoint and right payload');
    })
});
