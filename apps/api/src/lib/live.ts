const LIVE_CURRENCIES = new Set([''usd'',''eur'',''try'']);
function ensureLive(req: any) {
  const goLive = process.env.GO_LIVE === 'true' && process.env.NODE_ENV === 'production';
  if (!goLive) throw Object.assign(new Error('forbidden'), { statusCode: 403 });
}
function validateAmountCurrency(amountMinor: number, currency: string) {
  if (!Number.isInteger(amountMinor) || amountMinor < 50) throw Object.assign(new Error('invalid_amount'), { statusCode: 400 });
  const cur = (currency||'usd').toLowerCase();
  if (!LIVE_CURRENCIES.has(cur)) throw Object.assign(new Error('unsupported_currency'), { statusCode: 400 });
  return cur;
}
export { ensureLive, validateAmountCurrency };
