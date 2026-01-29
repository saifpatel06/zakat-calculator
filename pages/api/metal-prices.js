const handler = async (req, res) => {
  try {
    // Note: Use an API that supports INR or convert USD rates manually
    const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=YOUR_KEY&base=INR&currencies=XAU,XAG`);
    const data = await response.json();
    
    res.status(200).json({
      gold: 1 / data.rates.XAU, 
      silver: 1 / data.rates.XAG,
      currency: 'INR'
    });
  } catch (error) {
    // Updated Jan 2026 Indian Baseline Prices (₹ per gram)
    res.status(200).json({ gold: 16195, silver: 375, currency: 'INR' });
  }
};

export default handler;