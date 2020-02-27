import * as fs from 'fs';
import { PassThrough } from 'stream';

// fs.readFile('filename', function(err, data));
// fs.appendFile('filename', 'data', function(err))
// fs.open('filename', 'mode - w, r, rw', function(err, file))
// fs.writeFile('filename', 'data', function(err))
// fs.unlink('filename', function(err))
// fs.rename('newfilename', 'filename', function(err))

// fs.existsSync(dir)
// fs.mkdirSync(dir)

const buildSettingsFileName = 'buildSettings.json';

function loadSettings() {

    const buff = fs.readFileSync(buildSettingsFileName, 'utf8');
    const str = buff.toString('UTF-8');
    const parsed = JSON.parse(str);

    return parsed;
}

function createDistFolder() {
    // if(fs.existsSync(dir))
}

function main() {
    const settings = loadSettings();
    console.log(settings);
}

main();

