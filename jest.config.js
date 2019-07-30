module.exports = {
    clearMocks: true,
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
        'app/**/*.{js,jsx,mjs}',
        'server/**/*.{js,jsx,mjs}'
    ],
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    // An array of file extensions your modules use
    moduleFileExtensions: [
        'js',
        'json',
        'jsx'
    ],
    // The paths to modules that build some code to configure or set up the testing environment before each test
    setupFiles: ['<rootDir>/enzyme.config.js'],
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.js?$": "babel-jest"
    },
    // The glob patterns Jest uses to detect test files
    testMatch: [x   
        '**/__tests__/**/*.js?(x)',
        '**/?(*.)+(spec|test).js?(x)'
    ],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: 'http://localhost',
    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    // transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleNameMapper: {
        "\\.(scss|less)$": "identity-obj-proxy"
    },
    // Indicates whether each individual test should be reported during the build
    verbose: false,
    maxConcurrency: 50
};