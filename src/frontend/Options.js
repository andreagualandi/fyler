export default class Options {
    constructor() {
        this.oFolder = "";
        this.fileName = "output_file";
        this.exportMode = "pdf";
        this.newWidth = 1024;
        this.newHeight = 768;
        this.quality = 90;
        this.errors = {};
    }

    validate() {
        this.errors = {};
        if (this.oFolder.length === 0) {
            this.errors.oFolder = "Output folder missing";
        }

        if (this.exportMode === "pdf" && this.fileName.length === 0) {
            this.errors.fileName = "Filename missing";
        }

        if (this.exportMode !== "pdf" && this.exportMode !== "jpg") {
            this.errors.exportMode = "Wrong export mode";
        }

        if (this.quality < 1 || this.quality > 100) {
            this.errors.quality = "Quality must be between 1 and 100";
        }

        this.isResolutionValid();

        return Object.keys(this.errors).length === 0;
    }

    isResolutionValid() {
        if (this.newWidth <= 200) {
            this.errors.resolution = "Width and Height must be >= 200";
            return false;
        }
        return true;
    }
}
