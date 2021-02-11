import { serve} from "https://deno.land/std@0.86.0/http/server.ts";
import { Status } from "https://deno.land/std@0.53.0/http/http_status.ts";

class Service {
    constructor() {
        this.start()
    }
    private async start() {
        let s = serve({ port: 8000 })
        for await (const req of s) {
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            switch (req.url) {
                case "/action":
                    req.respond({
                        status: Status.OK,
                        headers: headers,
                        body: JSON.stringify({ message: "ACTION" }),
                    });
                    break;
                case "/event":
                    req.respond({
                        status: Status.OK,
                        headers: headers,
                        body: JSON.stringify({ message: "EVENT" }),
                    });
                    break;
                default:
                    req.respond({
                        status: Status.NotFound,
                        headers: headers,
                        body: JSON.stringify({ message: "UNKOWN SERVICE " }),
                    });
            }
        }
    }
}
export {
    Service
}