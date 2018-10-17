const fs = require("fs");
var stdin = process.openStdin();
const filesArray = [
    "src/launchConfig.ts",
    "src/loggerConfig.ts",
    "src/viewportConfig.ts",
    "src/scripts/twitter-timeline-image-scraper/loginData.ts"
];

const modesArray = [
    "release",
    "debug",
    "github"
];

const configDirectory = "/configs/";

(async () => {
    await fs.access(__dirname + configDirectory, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if (err) {
            throw new Error(err);
        }
    });
    for (const file of filesArray) {
        await fs.access(__dirname + '/' + file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
            if (err) {
                throw new Error(err);
            }
        });
    }
    for (const file of fs.readdirSync(__dirname + configDirectory)) {
        await fs.access(__dirname + configDirectory + file, fs.constants.R_OK, (err) => {
            if (err) {
                throw new Error(err);
            }
        })
    }
    for (const file of filesArray) {
        for (const mode of modesArray) {
            let filename = await file.slice(file.lastIndexOf('/') + 1);
            filename = await filename.slice(0, filename.lastIndexOf('.')) + '.' + mode + '.ts';
            await fs.access(__dirname + configDirectory + filename, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        }
    }
})().then(() => {
    console.log("Enter data mode: ");
    stdin.addListener("data", async (d) => {
        let valid = false;
        for (const mode of modesArray) {
            if (d.toString().trim() === mode) valid = true
        }
        if (d.toString().trim() === "exit") {
            console.log("Program closing");
            process.exit();
        }
        if (!valid) throw new Error("The mode is not valid;")
        for (const file of filesArray) {
            let filename = await file.slice(file.lastIndexOf('/') + 1);
            await fs.copyFile(__dirname + configDirectory + filename.slice(0, filename.lastIndexOf('.ts')) + '.' + d.toString().trim() + '.ts', file, (err) => {
                if (err) throw new Error(`Error while copy: ${__dirname + configDirectory + filename.slice(0, filename.lastIndexOf('.ts')) + '.' + d.toString().trim() + '.ts'} file`)
            })
        }
        for (const file of filesArray) {
            await fs.readFile(file, (err, data) => {
                if (err) {
                    throw new Error(err);
                }
                console.log(` `);
                console.log(`########` + file + `########`);
                console.log(data.toString('utf8'));
            })
        }
    })
})