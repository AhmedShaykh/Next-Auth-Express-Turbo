import express, { Application, Response, Request } from "express";
import { createServer, Server as HttpServer } from "http";
import { limiter } from "./config/rateLimit.js";
import routes from "./routing/index.js";
import { Server } from "socket.io";;
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

const app: Application = express();

const PORT = process.env.PORT || 8080;

const server: HttpServer = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

export { io };

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(limiter);

app.use("/", routes);

server.listen(PORT, () => console.log(`Server Is Running On PORT ${PORT}`));