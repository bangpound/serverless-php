'use strict';

const execSync = require('child_process').execSync;

class Composer {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        this.hooks = {
            'before:deploy:deploy': this.beforeDeploy.bind(this)
        };
    }

    beforeDeploy() {
        const command = 'composer install -o --no-dev --no-scripts';
        this.serverless.cli.log(`Running command: "${command}"`);
        const output = execSync(command).toString();
        if (output) {
            this.serverless.cli.log(output);
        }
    }
}

module.exports = Composer;
