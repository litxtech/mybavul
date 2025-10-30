import type { FastifyInstance } from "fastify";
export function withErrors(app: FastifyInstance){
  app.setNotFoundHandler((req, rep)=> rep.code(404).send({ error: 'not_found' }));
  app.setErrorHandler((error, req, rep)=> {
    const sc = (error as any).statusCode || 500;
    req.log.error({ err: error }, 'request_error');
    rep.code(sc).send({ error: sc===500 ? 'internal_error' : (error.message||'error') });
  });
}
