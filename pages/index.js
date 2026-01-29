import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Zakat.module.css';

const UniversalZakatWizard = () => {
  const [step, setStep] = useState(1);
  const [nisabType, setNisabType] = useState('silver');
  const [prices, setPrices] = useState({ gold: 16195, silver: 375 });
  const [activeTooltip, setActiveTooltip] = useState(null); // Track which tooltip is open
  
  const [fitrCount, setFitrCount] = useState(0);
  const fitrRate = 250; 

  const [assets, setAssets] = useState({
    cash: 0, crypto: 0, goldWeight: 0, goldPurity: 22,
    silverWeight: 0, pension: 0, inventory: 0, investments: 0, rentalIncome: 0 
  });
  
  const [liabilities, setLiabilities] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/metal-prices');
        const data = await res.json();
        setPrices({ gold: data.gold, silver: data.silver });
      } catch (e) { console.log("Using Fallback"); }
    };
    fetchRates();
  }, []);

  const toggleTooltip = (id) => setActiveTooltip(activeTooltip === id ? null : id);

  const goldVal = assets.goldWeight * prices.gold * (assets.goldPurity / 24);
  const silverVal = assets.silverWeight * prices.silver;
  const totalAssets = assets.cash + assets.crypto + assets.pension + assets.inventory + assets.investments + assets.rentalIncome + goldVal + silverVal;
  const netWealth = totalAssets - liabilities;
  const nisabThreshold = nisabType === 'gold' ? prices.gold * 87.48 : prices.silver * 612.36;
  const zakatDue = netWealth >= nisabThreshold ? netWealth * 0.025 : 0;
  const totalFitrana = fitrCount * fitrRate;

  const updateAsset = (key, val) => setAssets(prev => ({ ...prev, [key]: parseFloat(val) || 0 }));
  const formatINR = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="container-fluid min-vh-100 bg-light py-5">
      <Head><title>Universal Zakat Wizard 2026</title></Head>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className={`card ${styles.calculatorCard}`}>
            
            <div className={styles.header}>
              <h1 className="fw-bold h2 mb-2">Universal Zakat Wizard</h1>
              <p className="opacity-75 mb-0">For Professionals, Business Owners & Individuals</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className={styles.progressBarContainer}>
                <div className={styles.progressFill} style={{ width: `${(step / 4) * 100}%` }}></div>
              </div>

              {/* STEP 1: PERSONAL WEALTH */}
              {step === 1 && (
                <div className="animate-fade">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">1. Personal Liquid Assets</h5>
                    <span className={styles.badgeCustom}>Step 1/4</span>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className={styles.formLabel}>Cash & Bank Balance (₹)</label>
                      <input type="number" value={assets.cash || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('cash', e.target.value)} placeholder="0" />
                    </div>
                    <div className="col-md-6 mb-3 position-relative">
                      <label className={styles.formLabel}>
                        Crypto & E-Wallets (₹) 
                        <span className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" onClick={() => toggleTooltip('crypto')}>?</span>
                      </label>
                      <input type="number" value={assets.crypto || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('crypto', e.target.value)} placeholder="0" />
                      {activeTooltip === 'crypto' && <div className="small text-success mt-1 fw-bold animate-fade">Calculate based on current market value today.</div>}
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-4 mb-3">
                      <label className={styles.formLabel}>Gold (g)</label>
                      <input type="number" value={assets.goldWeight || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('goldWeight', e.target.value)} placeholder="0g" />
                    </div>
                    <div className="col-4 mb-3">
                      <label className={styles.formLabel}>Purity</label>
                      <select className={`form-select ${styles.inputField}`} value={assets.goldPurity} onChange={(e) => updateAsset('goldPurity', e.target.value)}>
                        <option value="24">24K</option>
                        <option value="22">22K</option>
                        <option value="21">21K</option>
                        <option value="18">18K</option>
                      </select>
                    </div>
                    <div className="col-4 mb-3">
                      <label className={styles.formLabel}>Silver (g)</label>
                      <input type="number" value={assets.silverWeight || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('silverWeight', e.target.value)} placeholder="0g" />
                    </div>
                  </div>

                  <div className="p-3 rounded border mb-4" style={{backgroundColor: '#f8fafc'}}>
                    <h6 className="fw-bold text-dark mb-2 small text-uppercase">Zakat Al-Fitr (Fitrana)</h6>
                    <div className="d-flex align-items-center gap-3">
                      <span className="small text-muted">Family Members:</span>
                      <input type="number" value={fitrCount || ''} className="form-control form-control-sm" style={{width: '70px'}} onChange={(e) => setFitrCount(parseInt(e.target.value) || 0)} />
                      <div className="ms-auto text-end">
                        <span className="fw-bold d-block">{formatINR(totalFitrana)}</span>
                      </div>
                    </div>
                  </div>

                  <button className={`btn w-100 mt-4 ${styles.primaryBtn}`} onClick={() => setStep(2)}>Next: Professional & Business</button>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL & BUSINESS */}
              {step === 2 && (
                <div className="animate-fade">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">2. Professional & Business Assets</h5>
                    <span className={styles.badgeCustom}>Step 2/4</span>
                  </div>

                  <div className={styles.infoBox}>
                    <strong>Guidance:</strong> Click the <span className="badge bg-white border text-dark">?</span> icons for Shariah rules.
                  </div>

                  <div className="mb-3">
                    <label className={styles.formLabel}>Business Inventory / Stock (₹)</label>
                    <input type="number" value={assets.inventory || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('inventory', e.target.value)} />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className={styles.formLabel}>
                        Vested RSUs / Stocks (₹)
                        <span className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" onClick={() => toggleTooltip('rsu')}>?</span>
                      </label>
                      <input type="number" value={assets.investments || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('investments', e.target.value)} />
                      {activeTooltip === 'rsu' && <div className="small text-success mt-1 fw-bold">Only include stocks you already own (vested). Ignore unvested grants.</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className={styles.formLabel}>
                        Withdrawable PF (₹)
                        <span className="ms-2 badge rounded-pill bg-light text-dark border cursor-pointer" onClick={() => toggleTooltip('pf')}>?</span>
                      </label>
                      <input type="number" value={assets.pension || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('pension', e.target.value)} />
                      {activeTooltip === 'pf' && <div className="small text-success mt-1 fw-bold">Include only the amount you can currently withdraw if you resigned today.</div>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className={styles.formLabel}>Saved Rental Income (₹)</label>
                    <input type="number" value={assets.rentalIncome || ''} className={`form-control ${styles.inputField}`} onChange={(e) => updateAsset('rentalIncome', e.target.value)} />
                    <small className="text-muted">Do not include the flat's market value, only saved rent.</small>
                  </div>

                  <div className="d-flex gap-3">
                    <button className="btn btn-light border px-4" onClick={() => setStep(1)}>Back</button>
                    <button className={`btn flex-grow-1 ${styles.primaryBtn}`} onClick={() => setStep(3)}>Next: Liabilities</button>
                  </div>
                </div>
              )}

              {/* STEP 3 & 4: LIABILITIES & FINAL (Same as previous) */}
              {step === 3 && (
                <div className="animate-fade">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">3. Liabilities & Debts</h5>
                    <span className={styles.badgeCustom}>Step 3/4</span>
                  </div>
                  <div className="mb-4">
                    <label className={styles.formLabel}>Short-term Debts & Bills (₹)</label>
                    <input type="number" value={liabilities || ''} className={`form-control ${styles.inputField}`} onChange={(e) => setLiabilities(parseFloat(e.target.value) || 0)} />
                    <div className="form-text mt-3 text-secondary italic">Include only debts due within 12 months.</div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-light border px-4" onClick={() => setStep(2)}>Back</button>
                    <button className={`btn flex-grow-1 ${styles.primaryBtn}`} onClick={() => setStep(4)}>Final Calculation</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center animate-fade">
                  <h4 className="fw-bold mb-2">Purification Summary</h4>
                  <div className={styles.resultBox}>
                    <span className="text-muted small text-uppercase fw-bold">Total Zakat Due</span>
                    <h1 className="display-4 fw-bold text-success mt-2">{formatINR(zakatDue)}</h1>
                  </div>
                  <div className="row g-2 mb-4">
                    <div className="col-6"><div className="p-3 bg-light rounded"><small className="text-muted d-block" style={{fontSize: '10px'}}>Net Wealth</small><span className="fw-bold">{formatINR(netWealth)}</span></div></div>
                    <div className="col-6"><div className="p-3 bg-light rounded"><small className="text-muted d-block" style={{fontSize: '10px'}}>Fitrana Due</small><span className="fw-bold">{formatINR(totalFitrana)}</span></div></div>
                  </div>
                  <button className="btn btn-dark w-100 py-3 fw-bold rounded-pill" onClick={() => setStep(1)}>New Calculation</button>
                </div>
              )}
            </div>

            <div className="card-footer bg-light p-4 d-flex flex-wrap justify-content-between align-items-center">
              <div>
                <span className="small text-muted d-block mb-1 fw-bold">Threshold Base</span>
                <div className="btn-group shadow-sm">
                  <button onClick={() => setNisabType('gold')} className={`btn btn-sm ${nisabType === 'gold' ? 'btn-success' : 'btn-white bg-white border'}`}>Gold</button>
                  <button onClick={() => setNisabType('silver')} className={`btn btn-sm ${nisabType === 'silver' ? 'btn-success' : 'btn-white bg-white border'}`}>Silver</button>
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