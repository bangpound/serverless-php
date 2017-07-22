'use strict';

const execSync = require('child_process').execSync;

class Symfony {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        this.hooks = {
            'before:deploy:deploy': this.beforeDeploy.bind(this)
        };
    }

    beforeDeploy() {
        const command = 'rm -fr var/cache/prod && APP_ENV=prod APP_DEBUG=0 bin/console cache:warmup';
        this.serverless.cli.log(`Running command: "${command}"`);
        const output = execSync(command).toString();
        if (output) {
            this.serverless.cli.log(output);
        }
    }
}

module.exports = Symfony;
