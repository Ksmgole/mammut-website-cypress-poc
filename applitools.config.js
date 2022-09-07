module.exports = {

    testConcurrency: 4,

    apiKey: 'uBcoJlT1DUtjBwIqFUmmU9yMxh6iw0gGu97iQJa5DXM110',
    
    batchName: 'Mammut Visual Testing',

    browser: [
        {width: 800, height: 600, name: 'chrome'},
        {width: 1024, height: 768, name: 'safari'},

        {deviceName: 'Pixel 2', screenOrientation: 'portrait'},
        {deviceName: 'Nexus 10', screenOrientation: 'landscape'},
    ]
}