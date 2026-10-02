import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 3000);

const server = createServer((request, response) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

    if (request.method === "GET" && pathname === "/api") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "API is connected" }));
        return;
    }

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Not found" }));
});

server.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
});