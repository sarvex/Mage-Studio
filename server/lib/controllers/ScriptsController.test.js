import sinon from 'sinon';
import ScriptsController from './ScriptsController';
import electron from '../electron';
import Config from '../config';
import AssetsHelper from '../helpers/AssetsHelper';
import FileHelper from '../helpers/files/FileHelper';

jest.mock('../electron');
jest.mock('../helpers/AssetsHelper');
jest.mock('../helpers/files/FileHelper');
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

        AssetsHelper.getScripts.mockClear();
        FileHelper.fileFromBuffer.mockClear();
    });

    describe('getAllScripts', () => {

        it('should return the right payload if project is missing', () => {
            const request = { params: { id: undefined } };
            ScriptsController.getAllScripts(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Project name is missing.' })).toBe(true);
        });

        it('should return the right payload if project is not the current', () => {
            Config.getLocalConfig.mockImplementation(() => ({ project: 'mage' }));
            const request = { params: { id: 'something' } };
            ScriptsController.getAllScripts(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Selected project is unavailable.' })).toBe(true);
        });

        it('should call Assets.getScripts', () => {
            Config.getLocalConfig.mockImplementation(() => ({ project: 'mage' }));
            AssetsHelper.getScripts.mockImplementation(() => Promise.resolve([]));
            const request = { params: { id: 'mage' } };
            ScriptsController.getAllScripts(request, mockResponse);

            expect(AssetsHelper.getScripts).toHaveBeenCalledTimes(1);
        });

        it('should return right payload if everything goes right', (done) => {
            Config.getLocalConfig.mockImplementation(() => ({ project: 'mage' }));
            AssetsHelper.getScripts.mockImplementation(() => Promise.resolve(['lol']));

            const request = { params: { id: 'mage' } };
            ScriptsController.getAllScripts(request, mockResponse);

            setTimeout(() => {
                expect(mockResponse.status.calledWith(200)).toBe(true);
                expect(mockResponse.json.calledWithExactly(['lol'])).toBe(true);
                done();
            });
        });

        it('should return right payload if there are no scripts', (done) => {
            Config.getLocalConfig.mockImplementation(() => ({ project: 'mage' }));
            AssetsHelper.getScripts.mockImplementation(() => Promise.resolve([]));

            const request = { params: { id: 'mage' } };
            ScriptsController.getAllScripts(request, mockResponse);

            setTimeout(() => {
                expect(mockResponse.status.calledWith(200)).toBe(true);
                expect(mockResponse.json.calledWithExactly([])).toBe(true);
                done();
            });
        });
    });

    describe('getScript', () => {

        it('should return the right payload if project is missing', () => {
            const request = { params: { id: undefined } };
            ScriptsController.getScript(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Project name is missing.' })).toBe(true);
        });

        it('should return the right payload if scriptid is missing', () => {
            const request = { params: { id: 'ok' } };
            ScriptsController.getScript(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Script name is missing.' })).toBe(true);
        });

        it('should return the right payload if project is not the current', () => {
            Config.getLocalConfig.mockImplementation(() => ({ project: 'mage' }));
            const request = { params: { id: 'something', scriptid: 'marco' } };
            ScriptsController.getScript(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Selected project is unavailable.' })).toBe(true);
        });

        it('should call Assets.getScripts', () => {
            Config.getLocalConfig.mockImplementation(() => ({ project: 'mage' }));
            AssetsHelper.getScript.mockImplementation(() => Promise.resolve([]));
            const request = { params: { id: 'mage', scriptid: 'marco' } };

            ScriptsController.getScript(request, mockResponse);

            expect(AssetsHelper.getScript).toHaveBeenCalledTimes(1);
        });

        it('should return right payload if everything goes right', (done) => {
            Config.getLocalConfig.mockImplementation(() => ({ project: 'mage' }));
            AssetsHelper.getScript.mockImplementation(() => Promise.resolve('somecontent'));
            const request = { params: { id: 'mage', scriptid: 'marco' } };

            ScriptsController.getScript(request, mockResponse);

            setTimeout(() => {
                expect(mockResponse.status.calledWith(200)).toBe(true);
                expect(mockResponse.json.calledWithExactly('somecontent')).toBe(true);
                done();
            });
        });
    });

    describe('createScript', () => {

        it('should return right payload if project name is missing', () => {
            const request = { params: { id: undefined }, body: {} };
            ScriptsController.createScript(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Project name is missing.' })).toBe(true);
        });

        it('should return the right payload if filename is missing', () => {
            const request = { params: { id: 'something' }, body: { filename: undefined } };
            ScriptsController.createScript(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Script name is missing.' })).toBe(true);
        });

        it('should return the right payload if it fails to create file', () => {
            const request = { params: { id: 'something' }, body: { filename: 'marco.js' } };
            FileHelper.fileFromBuffer.mockImplementation(() => ({ write: () => false }));
            ScriptsController.createScript(request, mockResponse);

            expect(mockResponse.status.calledWith(204)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Could not write file' })).toBe(true);
        });
    });
});
