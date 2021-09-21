import * as https from 'https';
import dotenv from 'dotenv'; dotenv.config();
declare var process: {
    env: {
        CLOCKIFY_WORKSPACE_ID: string
        CLOCKIFY_USER_ID: string
        CLOCKIFY_API_KEY: string
    }
};

export class ClockifyService {
    public async getTimeEntries() {
        try {
            await this.send({
                path: "workspaces/" + process.env.CLOCKIFY_WORKSPACE_ID! + "/user/" + process.env.CLOCKIFY_USER_ID! + "/time-entries?description=6221",
                method: 'GET',
            });
        } catch ({ message }) {
            console.log(`Error making API request to Clockify: ${message}`);
        }
    }
    private async send(request: any = {}) {
        const options = {
            hostname: 'api.clockify.me',
            port: 443,
            path: `/api/v1/${request.path}`,
            method: request.method,
            headers: {
                'X-Api-Key': process.env.CLOCKIFY_API_KEY!,
                'Content-Type': 'application/json',
            }
        };

        const callback = function (response: any) {
            var str: string = '';
            response.on('data', (chunck: string) => {
              str += chunck;
            });

            response.on('end', function () {
                console.log(response.data)
                console.log(str)
            });
        }

        const req = https.request( options, callback ).end();
    }
}