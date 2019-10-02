import sinon from 'sinon';
import ScriptsController from './ScriptsController';
import electron from '../electron';
import Config from '../config';

jest.mock('../electron');
jest.mock('../config');

describe('ScriptsController', () => {

    let mockResponse;

    beforeEach(() => {
        Config.getLocalConfig.mockClear();

        electron.isDesktop.mockClear();
        electron.isDesktop.mockImplementation(() => true);

        mockResponse = {};
        mockResponse.status = sinon.stub().returns(mockResponse);
        mockResponse.json = sinon.stub().returns(mockResponse);
    });

    describe('getAllScripts');

    describe('getScript');

    describe('createScript');

    // describe('getConfig', () => {
    //
    //     const request = {};
    //
    //     it('should return the right config if config is an object', () => {
    //         Config.getLocalConfig.mockImplementation(() => ({ something: 'mage' }));
    //         ScriptsController.getConfig(request, mockResponse);
    //
    //         expect(mockResponse.status.calledWith(200)).toBe(true);
    //         expect(mockResponse.json.calledWithExactly({ something: 'mage' })).toBe(true);
    //     });
    //
    //     it('shold return right  status and message if config is missing', () => {
    //         Config.getLocalConfig.mockImplementation(() => false);
    //         ConfigController.getConfig(request, mockResponse);
    //
    //         expect(mockResponse.status.calledWith(404)).toBe(true);
    //         expect(mockResponse.json.calledWithExactly({ message: 'Configuration is unavailable.' })).toBe(true);
    //     });
    //
    //     it('shold return right  status and message if config is empty', () => {
    //         Config.getLocalConfig.mockImplementation(() => ({}));
    //         ConfigController.getConfig(request, mockResponse);
    //
    //         expect(mockResponse.status.calledWith(404)).toBe(true);
    //         expect(mockResponse.json.calledWithExactly({ message: 'Configuration is unavailable.' })).toBe(true);
    //     });
    // });
});
