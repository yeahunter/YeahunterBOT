module.exports = class Viewer {
    constructor(viewer) {
        this.viewer = viewer;
        this.count = 0;
        
        // 10 percenkent hivodjon meg az api
        this.limit = 10;
    }

    check() {
        this.count++;

        if (this.count > this.limit) {
            // TODO: ITT API HIVAS FOG TORTENNI
            this.count = 0;
        }
    }
}
