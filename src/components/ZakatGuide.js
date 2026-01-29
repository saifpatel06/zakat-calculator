import React from 'react';

const ZakatGuide = () => {
  const guideData = [
    {
      title: "1. Cash & Liquid Wealth",
      field: "Savings, Bank Accounts, E-Wallets",
      formula: "Total Amount × 2.5%",
      description: "Any accessible money you own above basic needs. Includes business savings and personal cash.",
      tip: "Include all current and savings account balances."
    },
    {
      title: "2. Precious Metals",
      field: "Gold & Silver Assets",
      formula: "((Weight × Rate) × (Purity/24)) × 2.5%",
      description: "Zakat is due on the market value. For 2026, gold rates are approximately ₹18,000/g (24K).",
      tip: "If you have 22K jewelry, use the 22K rate provided in the calculator."
    },
    {
      title: "3. Business & Stocks",
      field: "Inventory & Investment Portfolios",
      formula: "Market Value × 2.5%",
      description: "For businesses, include 'Stock-in-trade' value. For investors, include fully owned (vested) shares.",
      tip: "Exclude fixed assets like office furniture or machinery."
    },
    {
      title: "4. Liabilities (Deductions)",
      field: "Short-term Debts & Bills",
      formula: "Subtract from Total Assets",
      description: "You can deduct immediate debts like this month's rent, utility bills, or supplier invoices.",
      tip: "Do not deduct the full amount of long-term loans (Home/Car)."
    }
  ];

  return (
    <div className="mt-5 p-4 bg-white rounded shadow-sm border animate-fade">
      <h3 className="fw-bold text-success mb-4 text-center">📖 Calculation Guide</h3>
      
      {/* Formula Banner */}
      <div className="bg-success text-white p-4 rounded mb-4 text-center">
        <h6 className="text-uppercase small fw-bold opacity-75 mb-2">The Zakat Formula</h6>
        <div className="h4 mb-0 fw-bold">
          (Total Assets — Immediate Debts) × 2.5%
        </div>
      </div>

      <div className="row">
        {guideData.map((item, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="p-3 h-100 border-start border-4 border-success bg-light rounded shadow-sm">
              <h6 className="fw-bold mb-1 text-dark">{item.title}</h6>
              <code className="text-primary small mb-2 d-block">{item.field}</code>
              <p className="small text-muted mb-2">{item.description}</p>
              <div className="p-2 rounded bg-white border small">
                <div className="text-success"><strong>Formula:</strong> {item.formula}</div>
                <div className="text-secondary italic mt-1"><strong>💡 Tip:</strong> {item.tip}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZakatGuide;