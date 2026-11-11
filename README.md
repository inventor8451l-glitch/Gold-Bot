# Gold Signals

A lightweight, mobile-friendly XAU/USD (gold) market-signal dashboard.

## Features

- Requests historical XAU/USD candles from the Twelve Data time-series API.
- Analyses the 15-minute, 1-hour, and 4-hour timeframes.
- Uses EMA 20/50/200, MACD, RSI, ATR, and a 20-bar breakout check.
- Displays a BUY, SELL, or NO TRADE indication with an illustrative entry, stop-loss, and take-profit calculation when a directional signal is present.
- Includes a light/dark colour scheme based on the device preference.

## Run it

This is a static HTML application. The homepage is `index.html`.

1. Deploy the repository to a static hosting provider such as Vercel.
2. Open the deployed website.
3. Enter a valid Twelve Data API key in the key field.
4. Select **Analyse gold** to request the latest available candle data and calculate the indicators.

The key is saved in the browser's `localStorage` on that device. Do not use a key with permissions or quotas you cannot afford to expose in a browser. For a production application, proxy data-provider requests through a server-side endpoint and keep provider credentials in server-side environment variables.

## Configuration

The `CONFIG` object near the beginning of the script in `index.html` controls:

- `API_KEY`: optional key embedded in the page (prefer entering it in the app instead).
- `SYMBOL`: defaults to `XAU/USD`.
- `TIMEFRAMES`: defaults to `15min`, `1h`, and `4h`.
- `SIGNAL_TF`: initially selected timeframe.
- `SL_ATR`, `TP_ATR`: ATR multipliers used for the displayed levels.
- `MIN_SCORE`: minimum indicator score required for a directional signal.

## Important risk notice

This project is an indicator-based educational tool, not an automated trading system or a guarantee of market direction. Its BUY/SELL/NO TRADE output can be wrong, delayed, or affected by missing data, API limits, and market volatility. The displayed confidence is a simple indicator-score proportion, not a statistically validated probability of success. Nothing here is financial advice. Verify data independently and make trading decisions carefully.

## Data provider

Market data is requested from [Twelve Data](https://twelvedata.com/). API availability, symbol support, and request limits depend on the provider and the user's plan.
