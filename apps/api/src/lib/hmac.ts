import crypto from "node:crypto";

export function verifyHmacSignature(body: string, timestamp: string, signature: string, secret: string, toleranceSec = 300) {
  const ts = Number(timestamp);
  if (!ts || Math.abs(Date.now()/1000 - ts) > toleranceSec) return false;
  const payload = `${timestamp}.${body}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
