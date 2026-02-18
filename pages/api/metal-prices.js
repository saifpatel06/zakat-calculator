let cachedData = null;
let previousData = null;
let lastFetchTime = null;

const OUNCE_TO_GRAM = 31.1035;
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

const handler = async (req, res) => {
  const now = Date.now();

  // ✅ Serve from cache if within 12 hours
  if (cachedData && lastFetchTime && now - lastFetchTime < TWELVE_HOURS) {
    return res.status(200).json(cachedData);
  }

  try {
    const response = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${process.env.METAL_API_KEY}&base=INR&currencies=XAU,XAG`
    );

    const data = await response.json();

    const goldPerGram = (1 / data.rates.XAU) / OUNCE_TO_GRAM;
    const silverPerGram = (1 / data.rates.XAG) / OUNCE_TO_GRAM;

    const newData = {
      gold: Number(goldPerGram.toFixed(2)),
      silver: Number(silverPerGram.toFixed(2)),
      currency: 'INR',
      lastUpdated: new Date(now).toISOString()
    };

    // ✅ Proper trend structure
    let marketTrend = {
      gold: { direction: 'stable', change: '0%' },
      silver: { direction: 'stable', change: '0%' }
    };

    if (previousData) {
      const goldChange =
        ((newData.gold - previousData.gold) / previousData.gold) * 100;

      const silverChange =
        ((newData.silver - previousData.silver) / previousData.silver) * 100;

      marketTrend = {
        gold: {
          direction:
            goldChange > 0
              ? 'increasing'
              : goldChange < 0
              ? 'decreasing'
              : 'stable',
          change: `${goldChange > 0 ? '+' : ''}${goldChange.toFixed(2)}%`
        },
        silver: {
          direction:
            silverChange > 0
              ? 'increasing'
              : silverChange < 0
              ? 'decreasing'
              : 'stable',
          change: `${silverChange > 0 ? '+' : ''}${silverChange.toFixed(2)}%`
        }
      };
    }

    // 🔥 Important: store previous BEFORE overwriting cache
    previousData = cachedData;
    cachedData = { ...newData, marketTrend };
    lastFetchTime = now;

    return res.status(200).json(cachedData);

  } catch (error) {
    console.log("Metal API failed:", error.message);

    if (cachedData) {
      return res.status(200).json({
        ...cachedData,
        source: 'cache'
      });
    }
    
    return res.status(200).json({
      gold: 14500,
      silver: 300,
      currency: 'INR',
      marketTrend: {
        gold: { direction: 'stable', change: '0%' },
        silver: { direction: 'stable', change: '0%' }
      }
    });
  }
};

export default handler;
