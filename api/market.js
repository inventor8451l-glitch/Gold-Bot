const ALLOWED = new Set(["15min", "1h", "4h"]);

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate=30");
  res.setHeader("X-Content-Type-Options", "nosniff");

  const interval = String(req.query.interval || "1h");
  if (!ALLOWED.has(interval)) {
    return res.status(400).json({ error: "Unsupported interval." });
  }

  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Market data is not configured. Add TWELVE_DATA_API_KEY in Vercel project environment variables."
    });
  }

  try {
    const url = new URL("https://api.twelvedata.com/time_series");
    url.searchParams.set("symbol", "XAU/USD");
    url.searchParams.set("interval", interval);
    url.searchParams.set("outputsize", "300");
    url.searchParams.set("apikey", apiKey);

    const upstream = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await upstream.json();

    if (!upstream.ok || data.status === "error" || !Array.isArray(data.values)) {
      return res.status(502).json({
        error: data.message || "The market-data provider did not return candle data."
      });
    }

    return res.status(200).json({
      symbol: "XAU/USD",
      interval,
      source: "Twelve Data",
      values: data.values
    });
  } catch (error) {
    return res.status(502).json({ error: "Unable to reach the market-data provider." });
  }
};
