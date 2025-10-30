import Fastify from "fastify";
import cors from "@fastify/cors";
import pino from "pino";
import { registerRoutes } from "./routes";
import { registerStripeWebhook } from "./routes/webhooks/stripe";
import { withIdempotency } from "./lib/idempo";

const app = Fastify({ logger: pino({ level: process.env.LOG_LEVEL ?? "info" }) });
await app.register(cors, { origin: [/^https:\/\/mybavul\.com$/, /^https:\/\/admin\.mybavul\.com$/] });
withIdempotency(app);\nimport { withRateLimit } from './lib/rate';\nwithRateLimit(app);

await registerRoutes(app);\nimport { enhanceReservations } from './routes/reservations';\nawait enhanceReservations(app);
await registerStripeWebhook(app);\nimport { registerSync } from './routes/sync';\nawait registerSync(app);\nimport { registerPayments } from './routes/payments';\nawait registerPayments(app);\nimport { registerPayouts } from './routes/payouts';\nawait registerPayouts(app);\nimport { registerPartner } from './routes/partner';\nawait registerPartner(app);

await app.listen({ port: Number(process.env.PORT ?? 3001), host: "0.0.0.0" });




\napp.get('/api/v1/openapi.json', async () => (await import('./openapi.json', { assert: { type: 'json' } })).default as any);\n


\nimport { registerConnections } from './routes/connections';\nawait registerConnections(app);\nimport { registerLedger } from './routes/ledger';\nawait registerLedger(app);\n

