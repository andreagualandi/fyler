export default class Options {
    constructor() {
        this.oFolder = "";
        this.fileName = "out_doc";
        this.exportMode = "single";
        this.newWidth = 1024;
        this.newHeight = 768;
        this.errors = {};
    }

    validate() {
        if (this.oFolder.length === 0) {
            this.errors.oFolder = "Output folder missing";
        }

        if (this.fileName.length === 0) {
            this.errors.fileName = "Filename missing";
        }

        if (this.exportMode !== "single" && this.exportMode !== "multiple") {
            this.errors.exportMode = "Wrong export mode";
        }

        if (this.newWidth <= 200) {
            this.errors.newWidth = "Width must be >= 200";
        }

        if (this.newHeight <= 200) {
            this.errors.newHeight = "Height must be >= 200";
        }

        return Object.keys(this.errors).length === 0;
    }
}
