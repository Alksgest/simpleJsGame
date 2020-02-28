import * as fs from 'fs';

// fs.readFile('filename', function(err, data));
// fs.appendFile('filename', 'data', function(err))
// fs.open('filename', 'mode - w, r, rw', function(err, file))
// fs.writeFile('filename', 'data', function(err))
// fs.unlink('filename', function(err)) // delete
// fs.rename('newfilename', 'filename', function(err))

// fs.existsSync(dir)
// fs.mkdirSync(dir)

const buildSettingsFileName = 'build-settings.json';


/*
    @ load settings from build-settings.json
*/
function loadSettings() {

    const str = readFileToString(buildSettingsFileName);
    const parsed = JSON.parse(str);

    return parsed;
}

function readFileToString(file) {
    const buff = fs.readFileSync(file, 'utf8');
    const str = buff.toString('UTF-8');
    return str;
}

function removeFilesFromDistDirectory() {
    var files = fs.readdirSync(settings.distFolder);
    for (var file in files) {
        fs.unlinkSync(file);
    }
}

function createDistFolder(settings) {
    if (settings) {
        if (settings.distFolder) {
            if (!fs.existsSync(settings.distFolder)) {
                fs.mkdirSync(settings.distFolder);
            } else {
                console.log(`Directory ${settings.distFolder} already exists.`);
                // removeFilesFromDistDirectory();
            }

        }
    }
}

function writeString(fileName, str) {
    fs.writeFile(fileName, str, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

function mergeJsFiles(appFolder, files) {
    let merged = '';
    const importReg = /(import)[^;]+(;|'|")/gi;
    const exportReg = /export/g;
    files.map(f => appFolder + '/' + f).forEach(file => {
        if (fs.existsSync(file)) {
            const str = readFileToString(file);
            // const match = importReg.exec(str); // for testing purpose
            const importFree = str.replace(importReg, '');
            const exportFree = importFree.replace(exportReg, '');

            merged += exportFree;
        }
    });

    return merged;
}

function copyHtmlCss(settings) {
    const html = settings.htmlFiles[0];
    const css = settings.cssFiles[0];

    const distFolder = settings.distFolder + '/';
    const appFolder = settings.appFolder + '/';

    if (fs.existsSync(appFolder + html)) {
        fs.copyFileSync(appFolder + html, distFolder + html);
    }
    if (fs.existsSync(appFolder + css)) {
        fs.copyFileSync(appFolder + css, distFolder + css);
    }
}

function main() {
    const settings = loadSettings();

    createDistFolder(settings);

    const merged = mergeJsFiles(settings.appFolder, settings.jsFiles);

    const distMainJs = settings.distFolder + '/' + settings.jsMainFile;

    writeString(distMainJs, merged);
    copyHtmlCss(settings);
}

main();

