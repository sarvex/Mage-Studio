import sinon from 'sinon';
import axios from 'axios';
import * as actions from './assets';
import * as types from './types';
jest.mock('axios');

describe('actions - assets', () => {

    beforeEach(() => {
        axios.mockClear();
        axios.get.mockClear();
        axios.post.mockClear();
    });

    it('assetsLoading should return right type', () => {
        expect(actions.assetsLoading()).toEqual({ type: types.ASSETS_LOADING });
    });

    it('assetsCompleted should return right type', () => {
        expect(actions.assetsCompleted({ data: 'completed' })).toEqual({ type: types.ASSETS_COMPLETED, data: 'completed' });
    });

    it('assetsFailure should return right type', () => {
        expect(actions.assetsFailure()).toEqual({ type: types.ASSETS_FAILURE });
    });

    describe('getAllAssets', () => {

        it('should make a GET to right url if project is provided', (done) => {
            axios.get.mockReturnValue(Promise.resolve());
            actions.getAllAssets('project')(f => f);

            setTimeout(() => {
                expect(axios.get).toHaveBeenCalledWith('api/projects/project/assets');
                done();
            });
        });

        it('should do nothing if the project is missing', () => {
            axios.get.mockReturnValue(Promise.resolve());
            actions.getAllAssets()(f => f);

            setTimeout(() => {
                expect(axios.get).toHaveBeenCalledTimes(0);
                done();
            });
        });
    });
});
