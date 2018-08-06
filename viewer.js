const axios = require("axios");
const config = require("./config");

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
            var _this = this;

            axios.post(config.yeahunterApi.url + '/watchtime', {
                viewer: this.viewer
            })
            .then(function(response) {
                _this.count = 0;
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }
}
