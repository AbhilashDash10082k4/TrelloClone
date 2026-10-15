import pinoHttp from "pino-http";
import { randomUUID } from "node:crypto";

export const requestLogger = pinoHttp({
  genReqId: (_req, res) => {
    const id = randomUUID();
    res.setHeader("X-Request-Id", id);
    return id;
  },
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie"],
    censor: "[REDACTED]",
  },
});
