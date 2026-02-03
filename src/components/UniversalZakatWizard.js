import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Zakat.module.css';

const numberToWords = (num) => {
  if (!num || num <= 0) return "";
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const makeWords = (n) => {
    if (n < 20) return a[Math.floor(n)];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + "Hundred " + (n % 100 !== 0 ? makeWords(n % 100) : "");
    if (n < 100000) return makeWords(Math.floor(n / 1000)) + "Thousand " + (n % 1000 !== 0 ? makeWords(n % 1000) : "");
    if (n < 10000000) return makeWords(Math.floor(n / 100000)) + "Lakh " + (n % 100000 !== 0 ? makeWords(n % 100000) : "");
    
    // Fix: This allows the logic to scale infinitely above 1 Crore
    return makeWords(Math.floor(n / 10000000)) + "Crore " + (n % 10000000 !== 0 ? makeWords(n % 10000000) : "");
  };

  return makeWords(Math.floor(num)).trim() + " Rupees Only";
};

const UniversalZakatWizard = () => {
  const [step, setStep] = useState(1);
  const [nisabType, setNisabType] = useState('silver');
  const [prices, setPrices] = useState({ gold: 16195, silver: 375 });
  const [activeTooltip, setActiveTooltip] = useState(null);
  
  // Market Trend Mock Data
  const [marketTrend] = useState({ gold: 'stable', silver: 'increasing', change: '+1.2%' });

  const [fitrCount, setFitrCount] = useState(0);
  const fitrRate = 250; 

  const [assets, setAssets] = useState({
    cash: 0, crypto: 0, goldWeight: 0, goldPurity: 22,
    silverWeight: 0, pension: 0, inventory: 0, investments: 0, rentalIncome: 0 
  });
  
  const [liabilities, setLiabilities] = useState(0);

  // Reset function to clear all inputs
  const resetAll = () => {
    setAssets({
      cash: 0, crypto: 0, goldWeight: 0, goldPurity: 22,
      silverWeight: 0, pension: 0, inventory: 0, investments: 0, rentalIncome: 0 
    });
    setLiabilities(0);
    setFitrCount(0);
    setStep(1);
    setActiveTooltip(null);
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/metal-prices');
        const data = await res.json();
        setPrices({ gold: data.gold, silver: data.silver });
      } catch (e) { console.log("Using Fallback Prices"); }
    };
    fetchRates();
  }, []);

  const toggleTooltip = (id) => setActiveTooltip(activeTooltip === id ? null : id);

  const goldVal = assets.goldWeight * prices.gold * (assets.goldPurity / 24);
  const silverVal = assets.silverWeight * prices.silver;
  const totalAssets = assets.cash + assets.crypto + assets.pension + assets.inventory + assets.investments + assets.rentalIncome + goldVal + silverVal;
  const netWealth = Math.max(0, totalAssets - liabilities);
  
  // Logic for Nisab Thresholds
  const nisabThreshold = nisabType === 'gold' ? prices.gold * 87.48 : prices.silver * 612.32;
  const isZakatMandatory = netWealth >= nisabThreshold;
  const zakatDue = isZakatMandatory ? netWealth * 0.025 : 0;
  const totalFitrana = fitrCount * fitrRate;

  const updateAsset = (key, val) => setAssets(prev => ({ ...prev, [key]: parseFloat(val) || 0 }));
  const formatINR = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

  const copyToClipboard = () => {
    const text = `--- Zakat Report 2026 ---
      Total Wealth: ${formatINR(totalAssets)}
      Net Zakatable: ${formatINR(netWealth)}
      Status: ${isZakatMandatory ? 'Mandatory' : 'Below Nisab'}
      Zakat Due (2.5%): ${formatINR(zakatDue)}
      Fitrana Due: ${formatINR(totalFitrana)}
      -------------------------
      Generated via Universal Zakat Wizard`;
          navigator.clipboard.writeText(text);
          alert("Summary copied to clipboard!");
    };

  return (
    <div className="container-fluid min-vh-100 bg-light py-5">
      <Head><title>Universal Zakat Wizard 2026</title></Head>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className={`card ${styles.calculatorCard}`}>
            
            <div className={styles.header}>
              <h1 className="fw-bold h2 mb-2">Universal Zakat Wizard</h1>
              <p className="opacity-75 mb-0 small">Real-time valuation based on 2026 Market Rates</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className={styles.progressBarContainer}>
                <div className={styles.progressFill} style={{ width: `${(step / 4) * 100}%` }}></div>
              </div>

              {/* STEP 1: PERSONAL ASSETS */}
              {step === 1 && (
                <div className="animate-fade">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0 text-success">1. Personal Assets</h5>
                    <span className={styles.badgeCustom}>Step 1/4</span>
                  </div>
                  
                  <div className="alert alert-info border-0 py-2 px-3 mb-4 d-flex align-items-center" style={{fontSize: '0.8rem'}}>
                    <span className="me-2">📈</span>
                    <span><strong>Market Trend:</strong> Gold is {marketTrend.gold} today. Silver is {marketTrend.change} this week.</span>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className={styles.formLabel}>Cash in Hand & Bank (₹)</label>
                      <input type="number" value={assets.cash || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('cash', e.target.value)} placeholder="0" />
                      {assets.cash > 0 && <div className="text-muted extra-small mt-1 italic" style={{fontSize: '0.7rem'}}>✨ {numberToWords(assets.cash)}</div>}
                    </div>
                    <div className="col-md-6 mb-3 position-relative">
                      <label className={styles.formLabel}>
                        Digital Assets (Crypto/Wallets) (₹) 
                        <span className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" onClick={() => toggleTooltip('crypto')}>?</span>
                      </label>
                      <input type="number" value={assets.crypto || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('crypto', e.target.value)} placeholder="0" />
                      {assets.crypto > 0 && <div className="text-muted extra-small mt-1 italic" style={{fontSize: '0.7rem'}}>✨ {numberToWords(assets.crypto)}</div>}
                      {activeTooltip === 'crypto' && <div className="small text-success mt-1 fw-bold animate-fade">Rule: Valuation based on today's spot price.</div>}
                    </div>
                  </div>

                  <div className="row g-3 mt-2">
                    <div className="col-12 col-md-4">
                      <label className={styles.formLabel}>Gold (g)</label>
                      <input type="number" value={assets.goldWeight || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('goldWeight', e.target.value)} placeholder="0g" />
                      <span className="text-muted" style={{fontSize: '0.65rem'}}>
                        ≈ {(assets.goldWeight / 11.66).toFixed(2)} Tola
                      </span>
                    </div>
                    <div className="col-12 col-md-4">
                      <label className={styles.formLabel}>Gold Purity (Karat)</label>
                      <select className={`form-select ${styles.inputField}`} value={assets.goldPurity} onChange={(e) => updateAsset('goldPurity', e.target.value)}>
                        <option value="24">24K</option>
                        <option value="22">22K</option>
                        <option value="21">21K</option>
                        <option value="18">18K</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4">
                      <label className={styles.formLabel}>Silver (g)</label>
                      <input type="number" value={assets.silverWeight || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('silverWeight', e.target.value)} placeholder="0g" />
                      <span className="text-muted d-block mt-1" style={{fontSize: '0.65rem'}}>
                        ≈ {(assets.silverWeight / 11.66).toFixed(2)} Tola
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded border mb-4 shadow-sm" style={{backgroundColor: '#f8fafc', borderLeft: '4px solid #059669'}}>
                    <h6 className="fw-bold text-dark mb-2 small text-uppercase">Zakat Al-Fitr (Fitrana)</h6>
                    <div className="d-flex align-items-center gap-3">
                      <span className="small text-muted">Family Members:</span>
                      <input type="number" value={fitrCount || ''} className="form-control form-control-sm border-success" style={{width: '70px'}} onChange={(e) => setFitrCount(parseInt(e.target.value) || 0)} />
                      <div className="ms-auto text-end">
                        <span className="fw-bold d-block text-success">{formatINR(totalFitrana)}</span>
                      </div>
                    </div>
                  </div>

                  <button className={`btn w-100 mt-4 ${styles.primaryBtn}`} onClick={() => setStep(2)}>Next: Business & Professional</button>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL & BUSINESS */}
              {step === 2 && (
                <div className="animate-fade">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0 text-success">2. Professional & Business Assets</h5>
                    <span className={styles.badgeCustom}>Step 2/4</span>
                  </div>

                  <div className={styles.infoBox}>
                    <strong>Pro Tip:</strong> Only include assets you have full ownership (vesting) of.
                  </div>

                  <div className="mb-3">
                    <label className={styles.formLabel}>Trade Stock (Selling Price) (₹)
                      <span 
                        className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" 
                        onClick={() => toggleTooltip('inventory')}
                        style={{ cursor: 'pointer' }}
                      >
                        ?
                      </span>
                    </label>
                    <input type="number" value={assets.inventory || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('inventory', e.target.value)} />
                    {assets.inventory > 0 && <div className="text-muted extra-small mt-1 italic" style={{fontSize: '0.7rem'}}>✨ {numberToWords(assets.inventory)}</div>}

                    {activeTooltip === 'inventory' && (
                      <div className="small text-success mt-1 fw-bold animate-fade">
                        Rule: Calculation Rule: Value items at their current Retail Selling Price (Market Value), not the original cost price.
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className={styles.formLabel}>
                        Shares & Mutual Funds (₹)
                        <span className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" onClick={() => toggleTooltip('rsu')}>?</span>
                      </label>
                      <input type="number" value={assets.investments || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('investments', e.target.value)} />
                      {assets.investments > 0 && <div className="text-muted extra-small mt-1 italic" style={{fontSize: '0.7rem'}}>✨ {numberToWords(assets.investments)}</div>}
                      {activeTooltip === 'rsu' && <div className="small text-success mt-1 fw-bold">Rule: Market value of vested shares.</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className={styles.formLabel}>
                        Provident Fund & LIC (Paid) (₹)
                        <span className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" onClick={() => toggleTooltip('pf')}>?</span>
                      </label>
                      <input type="number" value={assets.pension || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('pension', e.target.value)} />
                      {assets.pension > 0 && <div className="text-muted extra-small mt-1 italic" style={{fontSize: '0.7rem'}}>✨ {numberToWords(assets.pension)}</div>}
                      {activeTooltip === 'pf' && (
                        <div className="p-2 mt-1 rounded border bg-white animate-fade" style={{fontSize: '0.75rem', borderLeft: '4px solid #059669'}}>
                          <p className="mb-1"><strong>Should you include this?</strong></p>
                          <ul className="ps-3 mb-0">
                            <li><strong>YES:</strong> If you can withdraw this money today (even as a loan).</li>
                            <li><strong>NO:</strong> If the money is strictly locked until retirement.</li>
                          </ul>
                          <div className="mt-2 text-muted italic">
                            *If locked, you will pay Zakat for the year you eventually withdraw it.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className={styles.formLabel}>Net Rental Savings (₹)
                      <span 
                        className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" 
                        onClick={() => toggleTooltip('rental')}
                      >
                        ?
                      </span>
                    </label>
                    <input type="number" value={assets.rentalIncome || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('rentalIncome', e.target.value)} />
                    {assets.rentalIncome > 0 && ( <div className="text-muted extra-small mt-1 italic" style={{fontSize: '0.7rem'}}> ✨ {numberToWords(assets.rentalIncome)} </div> )}
                    {activeTooltip === 'rental' && (
                      <div className="small text-success mt-1 fw-bold animate-fade">
                        Rule: The property itself is NOT zakatable. Only include the rent money you have actually saved and still hold in your hand/bank.
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-3">
                    <button className="btn btn-light border px-4" onClick={() => setStep(1)}>Back</button>
                    <button className={`btn flex-grow-1 ${styles.primaryBtn}`} onClick={() => setStep(3)}>Next: Review & Debt</button>
                  </div>
                </div>
              )}

              {/* STEP 3: LIABILITIES & REVIEW BREAKDOWN */}
              {step === 3 && (
                <div className="animate-fade">
                  <h5 className="fw-bold mb-3 text-success">3. Review & Liabilities</h5>
                  
                  <div className="table-responsive mb-4 rounded border shadow-sm" style={{fontSize: '0.85rem'}}>
                    <table className="table table-sm table-borderless mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="ps-3 py-2">Asset Type</th>
                          <th className="text-end pe-3 py-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-bottom">
                          <td className="ps-3 pt-2 text-muted small uppercase fw-bold" colSpan="2">Personal Assets</td>
                        </tr>
                        <tr>
                          <td className="ps-4">Liquid Cash & Crypto</td>
                          <td className="text-end pe-3">{formatINR(assets.cash + assets.crypto)}</td>
                        </tr>
                       <tr>
                          <td className="ps-4">
                            Gold <span className="text-muted" style={{fontSize: '0.7rem'}}>({assets.goldWeight}g @ {assets.goldPurity}K)</span>
                          </td>
                          <td className="text-end pe-3">{formatINR(goldVal)}</td>
                        </tr>
                        <tr>
                          <td className="ps-4">Silver ({assets.silverWeight}g)</td>
                          <td className="text-end pe-3">{formatINR(silverVal)}</td>
                        </tr>
                        <tr className="border-bottom">
                          <td className="ps-3 pt-3 text-muted small uppercase fw-bold" colSpan="2">Professional</td>
                        </tr>
                        <tr>
                          <td className="ps-4">Investments & PF</td>
                          <td className="text-end pe-3">{formatINR(assets.investments + assets.pension)}</td>
                        </tr>
                        <tr>
                          <td className="ps-4">Business & Rental</td>
                          <td className="text-end pe-3">{formatINR(assets.inventory + assets.rentalIncome)}</td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-light">
                        <tr>
                          <th className="ps-3 py-2">Gross Assets</th>
                          <th className="text-end pe-3 py-2 text-success">{formatINR(totalAssets)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mb-4">
                    <label className={styles.formLabel}>Immediate Deductible Liabilities (₹)</label>
                    <input type="number" value={liabilities || ''} className={`form-control ${styles.inputField}`} onChange={(e) => setLiabilities(parseFloat(e.target.value) || 0)} placeholder="Monthly EMI (Non-interest), Bills, and Business Creditors"/>
                    <div className="p-2 mt-2 rounded border" style={{backgroundColor: '#fffef0', fontSize: '0.75rem', borderColor: '#fde047'}}>
                      <div className="d-flex gap-2">
                        <span>🚫</span>
                        <div>
                          <strong>Do Not Deduct:</strong> Future interest, total home/car loan balances, or unpaid luxury expenses.
                        </div>
                      </div>
                      <div className="d-flex gap-2 mt-1">
                        <span>✅</span>
                        <div>
                          <strong>Deduct Only:</strong> Immediate business debts, utility bills, and the <strong>principal portion</strong> of your current month's EMI.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex gap-3">
                    <button className="btn btn-light border px-4" onClick={() => setStep(2)}>Back</button>
                    <button className={`btn flex-grow-1 ${styles.primaryBtn}`} onClick={() => setStep(4)}>Final Calculation</button>
                  </div>
                </div>
              )}

              {/* STEP 4: FINAL RESULTS & NISAB ALERT */}
              {step === 4 && (
                <div className="text-center animate-fade">
                  <h4 className="fw-bold mb-2">Purification Summary</h4>
                  
                  <div className={styles.resultBox}>
                    <span className="text-muted small text-uppercase fw-bold">Total Zakat to Pay (2.5%)</span>
                    <h1 className="display-4 fw-bold text-success mt-2">{formatINR(zakatDue)}</h1>
                    
                    {/* THRESHOLD ALERT BANNER */}
                    <div className={`mt-3 p-2 rounded small fw-bold ${isZakatMandatory ? 'bg-success-light text-success' : 'bg-warning-light text-dark'}`} style={{fontSize: '11px', border: '1px solid currentColor'}}>
                      {isZakatMandatory ? (
                        <span>✓ Your wealth exceeds the Nisab ({formatINR(nisabThreshold)}). Zakat is mandatory.</span>
                      ) : (
                        <span>ℹ Below Nisab threshold ({formatINR(nisabThreshold)}). Payment is voluntary (Sadaqah).</span>
                      )}
                    </div>

                    <button onClick={copyToClipboard} className="btn btn-sm btn-outline-success mt-3 rounded-pill px-3">
                      Copy Report 📋
                    </button>
                  </div>
                  
                  <div className="row g-2 mb-4">
                    <div className="col-6"><div className="p-3 bg-light rounded shadow-sm"><small className="text-muted d-block" style={{fontSize: '10px'}}>Net Zakatable Wealth</small><span className="fw-bold">{formatINR(netWealth)}</span></div></div>
                    <div className="col-6"><div className="p-3 bg-light rounded shadow-sm"><small className="text-muted d-block" style={{fontSize: '10px'}}>Fitrana Due</small><span className="fw-bold">{formatINR(totalFitrana)}</span></div></div>
                  </div>

                  <div className="text-start mt-4">
                    <h6 className="fw-bold small text-uppercase text-muted border-bottom pb-2">Where to Pay? (Recommended)</h6>
                    <div className="row g-2 mt-1">
                      <div className="col-6">
                        <div className="p-2 border rounded small bg-white shadow-sm h-100">
                          🏠 <strong>Needy Kin</strong><br/>
                          <span className="text-muted" style={{fontSize: '10px'}}>Siblings or relatives who aren't your dependents.</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-2 border rounded small bg-white shadow-sm h-100">
                          🛠️ <strong>Livelihood</strong><br/>
                          <span className="text-muted" style={{fontSize: '10px'}}>Tools (sewing machines, carts) to make them self-reliant.</span>
                        </div>
                      </div>
                      <div className="col-6 mt-2">
                        <div className="p-2 border rounded small bg-white shadow-sm h-100">
                          🎓 <strong>Skill-Building</strong><br/>
                          <span className="text-muted" style={{fontSize: '10px'}}>Student fees, laptops, or vocational training costs.</span>
                        </div>
                      </div>
                      <div className="col-6 mt-2">
                        <div className="p-2 border rounded small bg-white shadow-sm h-100">
                          🏥 <strong>Medical Debt</strong><br/>
                          <span className="text-muted" style={{fontSize: '10px'}}>Directly paying hospital bills for poor patients.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-dark w-100 py-3 fw-bold rounded-pill shadow mt-4" onClick={resetAll}>New Calculation</button>
                </div>
              )}
            </div>

            {/* PERSISTENT FOOTER */}
            <div className="card-footer bg-light p-4 d-flex flex-wrap justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <span className="small text-muted d-block mb-1 fw-bold">Threshold Base</span>
                
                <div className="btn-group shadow-sm">
                  <button onClick={() => setNisabType('gold')} className={`btn btn-sm ${nisabType === 'gold' ? 'btn-success' : 'btn-white bg-white border'}`}>Gold</button>
                  <button onClick={() => setNisabType('silver')} className={`btn btn-sm ${nisabType === 'silver' ? 'btn-success' : 'btn-white bg-white border'}`}>Silver</button>
                </div>
                <div className="extra-small text-success mt-1" style={{fontSize: '0.6rem'}}>
                  {nisabType === 'silver' ? "★ Recommended for Cash-holders" : ""}
                </div>
                <div className="mt-2 small text-muted">
                  <span className="badge bg-success me-1">Live</span> 
                  1g Gold: <strong>{formatINR(prices.gold)}</strong>
                </div>
              </div>
              <div className="text-md-end">
                <span className="small text-muted d-block fw-bold">Live Asset Total</span>
                <span className="h5 fw-bold text-success mb-0">{formatINR(totalAssets)}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalZakatWizard;