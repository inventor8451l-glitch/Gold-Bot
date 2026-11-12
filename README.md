# Gold Bot — Market Intelligence

A mobile-first, read-only educational dashboard for studying gold-market structure. It includes a TradingView chart embed, multi-timeframe technical readings, simple historical pattern observations, and a hypothetical scenario calculator.

## Current capabilities

- TradingView embedded chart for **OANDA:XAUUSD**.
- Twelve Data historical candles for XAU/USD at 15-minute, 1-hour and 4-hour intervals.
- EMA 20/50/200, RSI, MACD histogram and ATR calculations.
- Transparent market-regime descriptions and rule-based pattern observations.
- Data-feed status, timestamps and unavailable-data messaging.
- Hypothetical arithmetic calculator. It does not recommend a position size, entry, stop, target or trade duration.
- Responsive dark interface designed for phone screens first.

## Deploy on Vercel

The repository includes a Vercel serverless endpoint at `/api/market`. The Twelve Data credential is read only on the server.

1. Open the **Gold Bot** project in Vercel.
2. Go to **Settings → Environment Variables**.
3. Add `TWELVE_DATA_API_KEY` with your Twelve Data API key. Select the Production and Preview environments you intend to use.
4. Save the variable and redeploy the latest deployment.
5. Open the site and check that the header reports **DATA CONNECTED**.

Do not paste the provider key into `index.html`, commit it to GitHub, or share it in chat. If a key was previously embedded in a page or shared publicly, rotate it with the provider.

## Data-source limitations

The TradingView chart is configured for **OANDA:XAUUSD**. The indicator calculations use Twelve Data's **XAU/USD** candles. Neither source is authenticated to the user's Exness account, and neither is guaranteed to match Exness's broker-specific **XAUUSDm** quotes, spread, candle boundaries or execution prices. The dashboard labels these as external reference data.

The Twelve Data endpoint requires a plan that supports the requested symbol and intervals. Provider quotas, symbol availability, latency and market-session conditions can affect updates. The dashboard refreshes the readings once per minute, but provider data may update less frequently. A displayed refresh time is not a guarantee of tick-by-tick data.

## Calculator assumptions

The scenario calculator uses:

`(hypothetical exit price - hypothetical entry price) × lot quantity × contract units per lot - entered costs`

The contract units per lot field is intentionally left blank: users must consult the relevant instrument specification rather than assume every broker uses identical contract settings. The result is a simplified educational illustration, not an estimate of an actual account outcome.

## Scope and safety

Gold Bot is read-only. It does not connect to MT5, authenticate to a brokerage account, submit or manage orders, or generate actionable BUY/SELL instructions, entry levels, stop-loss levels, take-profit levels or trade-duration recommendations. Market-regime labels and pattern observations describe historical data; they are not predictions or validated probabilities of success.

## Local development

This is a static front end plus a Vercel Node.js serverless function. Run it with the Vercel CLI to test the `/api/market` route locally; a plain static file preview will show the interface but cannot execute the serverless API route.
