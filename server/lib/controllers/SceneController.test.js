import sinon from 'sinon';
import SceneController from './SceneController';
import electron from '../electron';
import SceneHelper from '../helpers/SceneHelper';
import FileHelper from '../helpers/files/FileHelper';

jest.mock('../helpers/files/FileHelper');
jest.mock('../electron');
jest.mock('../helpers/SceneHelper');

describe('SceneController', () => {

    let mockResponse;

    beforeEach(() => {
        electron.isDesktop.mockClear();
        SceneHelper.exists.mockClear();
        SceneHelper.readSceneData.mockClear();
        FileHelper.fileFromBuffer.mockClear();
        electron.isDesktop.mockImplementation(() => true);

        mockResponse = {};
        mockResponse.status = sinon.stub().returns(mockResponse);
        mockResponse.json = sinon.stub().returns(mockResponse);
    });

    describe('getSceneData', () => {

        it('should return a response with right status and message when param.id is missing', () => {
            const request = { params: {} };

            SceneController.getSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Scene name is missing.' })).toBe(true);
        });

        it('should return a response with right status and message if the scene doesnt exist', () => {
            SceneHelper.exists.mockImplementation(() => false);
            const request = { params: { id: 'scene' } };

            SceneController.getSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(404)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Scene could not be found.' }));
        });

        it('should return a response with the right status and message if cant read the scene', () => {
            SceneHelper.exists.mockImplementation(() => true);
            SceneHelper.readSceneData.mockImplementation(() => ({}));
            const request = { params: { id: 'scene' } };

            SceneController.getSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(404)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Scene could not be found.' }));
        });

        it('should return a response with the right status and message if content has been read', () => {
            SceneHelper.exists.mockImplementation(() => true);
            SceneHelper.readSceneData.mockImplementation(() => ({ content: 'test' }));
            const request = { params: { id: 'scene' } };

            SceneController.getSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(200)).toBe(true);
            expect(mockResponse.json.calledWithExactly('test'));
        });
    });

    describe('updateSceneData', () => {

        let request;

        beforeEach(() => {
            request = {
                params: { id: 'scene' },
                files: {
                    data: {
                        data: {}
                    }
                }
            };
        });

        it('should return a response with right status and message when files missing', () => {
            request.files = null;

            SceneController.updateSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWith({ message: 'Scene data is missing.' })).toBe(true);
        });

        it('should return a response with right status and message when req.params.id missing', () => {
            request.params.id = null;

            SceneController.updateSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(400)).toBe(true);
            expect(mockResponse.json.calledWith({ message: 'Scene name is missing.' })).toBe(true);
        });

        it('should return a response with right status and message if the scene doesnt exist', () => {
            SceneHelper.exists.mockImplementation(() => false);
            SceneController.updateSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(404)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Scene could not be found.' }));
        });

        it('should return a response with right status and message if manages to write content', () => {
            SceneHelper.exists.mockImplementation(() => true);
            FileHelper.fileFromBuffer.mockImplementation(() => ({ write: () => true }));

            SceneController.updateSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(201)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: '' }));
        });

        it('should return a response with right status and message if it fails writing content', () => {
            SceneHelper.exists.mockImplementation(() => true);
            FileHelper.fileFromBuffer.mockImplementation(() => ({ write: () => false }));

            SceneController.updateSceneData(request, mockResponse);

            expect(mockResponse.status.calledWith(204)).toBe(true);
            expect(mockResponse.json.calledWithExactly({ message: 'Something went wrong when creating the scene.json' }));
        });
    });
});