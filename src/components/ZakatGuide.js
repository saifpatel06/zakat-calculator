import React from 'react';

const ZakatGuide = () => {
  const guideData = [
    {
      title: "1. Cash & Liquid Wealth",
      field: "Savings, Bank Accounts, E-Wallets",
      formula: "Net Balance × 2.5%",
      description: "All accessible money. Ensure you exclude any interest (Riba) earned from the bank before calculating.",
      tip: "Include cash hidden at home and balances in digital wallets like GPay/Paytm."
    },
    {
      title: "2. Precious Metals",
      field: "Gold & Silver Assets",
      formula: "Weight × Current Market Rate × 2.5%",
      description: "Zakat is due on the resale value today. If the jewelry has stones, subtract their weight first.",
      tip: "The calculator automatically adjusts for 18K, 21K, 22K, and 24K."
    },
    {
      title: "3. Business & Stocks",
      field: "Inventory & Investment Portfolios",
      formula: "Selling Price × 2.5%",
      description: "Value your business stock at its current retail/selling price. For shares, use today's market value.",
      tip: "Exclude 'Fixed Assets' like shop furniture, computers, or delivery vehicles."
    },
    {
      title: "4. Liabilities (Deductions)",
      field: "Immediate Debts & Bills",
      formula: "Subtract from Total Assets",
      description: "Deduct money you owe *now* (unpaid bills, salaries) and the principal part of your EMI for this year.",
      tip: "Only deduct the debt amount that is due within the current lunar year."
    }
  ];

  return (
    <div className="mt-5 p-4 bg-white rounded shadow-sm border animate-fade">
      <h3 className="fw-bold text-success mb-4 text-center">📖 Calculation Guide</h3>
      
      {/* Formula Banner */}
      <div className="bg-success text-white p-4 rounded mb-4 text-center">
        <h6 className="text-uppercase small fw-bold opacity-75 mb-2">The Zakat Formula</h6>
        <div className="h4 mb-0 fw-bold">
          (Total Zakatable Assets — Immediate Debts) × 2.5%
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
      <div className="mt-2 p-3 bg-light-success rounded border-dashed text-center">
        <p className="small mb-0 text-muted">
          <strong>2026 Nisaab Reference:</strong> Silver: <strong>612.32g</strong> (52.5 Tola) 
          <span className="mx-2">|</span> 
          Gold: <strong>87.48g</strong> (7.5 Tola)
        </p>
        <p className="extra-small text-muted mt-1" style={{fontSize: '0.7rem'}}>
          *If your net wealth is below these values, Zakat is not mandatory but highly rewarded as Sadaqah.
        </p>
      </div>
    </div>
  );
};

export default ZakatGuide;