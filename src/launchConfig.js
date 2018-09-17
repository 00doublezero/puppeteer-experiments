'use strict';
const launchConfig = {
    args: ["--start-fullscreen", "--disable-infobars"],
    headless: false,
    executablePath: "chromium-browser",
    userDataDir: "/home/kryger/.config/chromium/"
}
module.exports = launchConfig;