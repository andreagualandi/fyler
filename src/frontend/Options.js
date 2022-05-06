export default class Options {
    constructor() {
        this.oFolder = "";
        this.fileName = "out_doc";
        this.exportMode = "single";
        this.fileSuffix = "_new";
        this.newWidth = 1024;
        this.newHeight = 768;
    }

    validate() {
        if (this.oFolder.length === 0) {
            console.log("Output folder missing");
            return false;
        }

        if (this.fileName.length === 0) {
            console.log("Filename missing");
            return false;
        }

        if (this.exportMode !== "single" && this.exportMode !== "multiple") {
            console.log("Wrong export mode");
            return false;
        }

        if (this.newWidth <= 0 || this.newHeight <= 0) {
            console.log("Wrong sizes");
            return false;
        }

        return true;
    }
}
