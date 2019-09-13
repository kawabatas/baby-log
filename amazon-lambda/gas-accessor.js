const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = process.env['CLIENT_ID'];
const CLIENT_SECRET = process.env['CLIENT_SECRET'];
const ACCESS_TOKEN = process.env['ACCESS_TOKEN'];
const REFRESH_TOKEN = process.env['REFRESH_TOKEN'];
const SCRIPT_ID = process.env['SCRIPT_ID'];
const DEV_MODE = process.env['DEV_MODE'] ? /^true$/i.test(process.env['DEV_MODE']) : false;

const gasAccessor = {};

gasAccessor.executeFunction = function (functionName, opt_parameter) {
    console.log('executeFunction started [functionName=' + functionName + ', parameter=' + opt_parameter);
    const auth = new OAuth2(CLIENT_ID, CLIENT_SECRET);
    auth.setCredentials({
        access_token: ACCESS_TOKEN,
        refresh_token: REFRESH_TOKEN
    });
    const script = google.script('v1');
    return new Promise((resolve, reject) => {
        script.scripts.run({
            auth: auth,
            scriptId: SCRIPT_ID,
            resource: {
                function: functionName,
                parameters: [opt_parameter],
                devMode: DEV_MODE
            }
        }, (err, result) => {
            if (err || result.data.error) {
                console.log(err);
                reject(new Error(err));
            } else {
                resolve(result.data.response.result);
            }
        });
    });
};

module.exports = gasAccessor;
