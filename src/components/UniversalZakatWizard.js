import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../../styles/Zakat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCheckCircle, faInfoCircle, faTrophy, faStar, faFire, faChartPie } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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
    return makeWords(Math.floor(n / 10000000)) + "Crore " + (n % 10000000 !== 0 ? makeWords(n % 10000000) : "");
  };

  return makeWords(Math.floor(num)).trim() + " Rupees Only";
};

const UniversalZakatWizard = () => {
  const [step, setStep] = useState(1);
  const [nisabType, setNisabType] = useState('silver');
  const [prices, setPrices] = useState({ gold: 16195, silver: 375 });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [pulsingFields, setPulsingFields] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalFieldsFilled, setTotalFieldsFilled] = useState(0);
  const [showChart, setShowChart] = useState(false);
  
  const [marketTrend, setMarketTrend] = useState({
    gold: { direction: 'stable', change: '0%' },
    silver: { direction: 'stable', change: '0%' }
  });
  const [fitrCount, setFitrCount] = useState(0);
  const fitrRate = 250;

  const [assets, setAssets] = useState({
    cash: 0, crypto: 0, silverWeight: 0, pension: 0, inventory: 0, investments: 0, rentalIncome: 0 
  });

  const [goldEntries, setGoldEntries] = useState([
    { id: Date.now(), weight: 0, purity: 22 }
  ]);
  
  const [liabilities, setLiabilities] = useState(0);
  const audioRef = useRef(null);

  // Achievement System
  const checkAchievements = (fieldName, value) => {
    const newAchievements = [];
    
    if (step === 4 && !achievements.includes('calculator_complete')) {
      newAchievements.push({ id: 'calculator_complete', name: 'Calculator Master', icon: '🎓', desc: 'Completed calculation' });
    }
    
    newAchievements.forEach(ach => {
      setShowAchievement(ach);
      setAchievements(prev => [...prev, ach.id]);
      setTimeout(() => setShowAchievement(null), 3000);
    });
  };

  const resetAll = () => {
    setAssets({
      cash: 0, crypto: 0, silverWeight: 0, pension: 0, inventory: 0, investments: 0, rentalIncome: 0 
    });
    setGoldEntries([{ id: Date.now(), weight: 0, purity: 22 }]);
    setLiabilities(0);
    setFitrCount(0);
    setStep(1);
    setActiveTooltip(null);
    setCompletedSteps({});
    setShowConfetti(false);
    setShowFireworks(false);
    setTotalFieldsFilled(0);
    setShowChart(false);
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/metal-prices');
        const data = await res.json();
        setPrices({ gold: data.gold, silver: data.silver });
        console.log("Pirce: ", data);
        if (data.marketTrend) {
          setMarketTrend(data.marketTrend);
        }
      } catch (e) { console.log("Using Fallback Prices"); }
    };
    fetchRates();
  }, []);

  const goToNextStep = (nextStep) => {
    setCompletedSteps(prev => ({ ...prev, [step]: true }));
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Sound effect simulation (visual pulse)
    document.body.style.animation = 'flash 0.3s';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 300);
  };

  useEffect(() => {
    if (step === 4) {
      checkAchievements('step', 4);
    }
  }, [step]);

  const handleFieldChange = (fieldName, value, setter) => {
    setter(value);
    if (value > 0) {
      setPulsingFields(prev => ({ ...prev, [fieldName]: true }));
      setTotalFieldsFilled(prev => prev + 1);
      checkAchievements(fieldName, value);
      
      setTimeout(() => {
        setPulsingFields(prev => ({ ...prev, [fieldName]: false }));
      }, 600);
    }
  };

  const toggleTooltip = (id) => setActiveTooltip(activeTooltip === id ? null : id);

  const BUYBACK_ADJUSTMENT = 0.97;
  const goldVal = goldEntries.reduce((total, entry) => {
    const currentSellableRate = prices.gold * (entry.purity / 24) * BUYBACK_ADJUSTMENT;
    return total + (entry.weight * currentSellableRate);
  }, 0);
  
  const addNewGoldRow = () => {
    setGoldEntries([...goldEntries, { id: Date.now(), weight: 0, purity: 22 }]);
  };
  
  const updateGoldEntry = (id, field, val) => {
    setGoldEntries(goldEntries.map(e => e.id === id ? { ...e, [field]: parseFloat(val) || 0 } : e));
  };
  
  const silverVal = assets.silverWeight * prices.silver;
  const totalAssets = assets.cash + assets.crypto + assets.pension + assets.inventory + assets.investments + assets.rentalIncome + goldVal + silverVal;
  const netWealth = Math.max(0, totalAssets - liabilities);
  
  const nisabThreshold = nisabType === 'gold' ? prices.gold * 87.48 : prices.silver * 612.32;
  const isZakatMandatory = netWealth >= nisabThreshold;
  const zakatDue = isZakatMandatory ? netWealth * 0.025 : 0;
  const totalFitrana = fitrCount * fitrRate;
  const nisabProgress = Math.min((netWealth / nisabThreshold) * 100, 100);

  const updateAsset = (key, val) => {
    const numVal = parseFloat(val) || 0;
    handleFieldChange(key, numVal, (v) => setAssets(prev => ({ ...prev, [key]: v })));
  };
  
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
    
    // Visual feedback
    const btn = document.querySelector(`.${styles.copyBtn}`);
    if (btn) {
      btn.textContent = '✅ Copied!';
      btn.style.background = '#059669';
      btn.style.color = 'white';
      setTimeout(() => {
        btn.textContent = '📋 Copy Report';
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    }
  };

  const getStepCompletion = () => {
    if (step === 1) {
      const fields = [assets.cash, assets.crypto, goldEntries[0].weight, assets.silverWeight];
      const filled = fields.filter(f => f > 0).length;
      return (filled / fields.length) * 100;
    }
    if (step === 2) {
      const fields = [assets.inventory, assets.investments, assets.pension, assets.rentalIncome];
      const filled = fields.filter(f => f > 0).length;
      return (filled / fields.length) * 100;
    }
    return 100;
  };

  // Asset Distribution for Chart
  const getAssetDistribution = () => {
    const total = totalAssets;
    if (total === 0) return [];
    
    return [
      { name: 'Cash & Crypto', value: assets.cash + assets.crypto, percent: ((assets.cash + assets.crypto) / total * 100).toFixed(1), color: '#3b82f6' },
      { name: 'Gold', value: goldVal, percent: (goldVal / total * 100).toFixed(1), color: '#fbbf24' },
      { name: 'Silver', value: silverVal, percent: (silverVal / total * 100).toFixed(1), color: '#9ca3af' },
      { name: 'Investments', value: assets.investments + assets.pension, percent: ((assets.investments + assets.pension) / total * 100).toFixed(1), color: '#059669' },
      { name: 'Business', value: assets.inventory + assets.rentalIncome, percent: ((assets.inventory + assets.rentalIncome) / total * 100).toFixed(1), color: '#8b5cf6' }
    ].filter(item => item.value > 0);
  };

  return (
    <div className="container-fluid min-vh-100 bg-light py-5">
      {showConfetti && <div className={styles.confetti}></div>}
      {showFireworks && (
        <>
          <div className={styles.firework} style={{ left: '20%', animationDelay: '0s' }}></div>
          <div className={styles.firework} style={{ left: '80%', animationDelay: '0.5s' }}></div>
          <div className={styles.firework} style={{ left: '50%', animationDelay: '1s' }}></div>
        </>
      )}
      
      {/* Achievement Notification */}
      {showAchievement && (
        <div className={styles.achievementNotif}>
          <div className={styles.achievementIcon}>{showAchievement.icon}</div>
          <div className={styles.achievementContent}>
            <div className={styles.achievementTitle}>Achievement Unlocked!</div>
            <div className={styles.achievementName}>{showAchievement.name}</div>
            <div className={styles.achievementDesc}>{showAchievement.desc}</div>
          </div>
        </div>
      )}
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className={`card ${styles.calculatorCard}`}>
            
            {/* Gamification Stats Bar */}
            {/* <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faStar} className={styles.statIcon} />
                <span>{achievements.length} Achievements</span>
              </div>
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faFire} className={styles.statIcon} />
                <span>{totalFieldsFilled} Fields Filled</span>
              </div>
              <div className={styles.statItem}>
                <FontAwesomeIcon icon={faTrophy} className={styles.statIcon} />
                <span>Step {step}/4</span>
              </div>
            </div> */}

            <div className={styles.header}>
              <h1 className="fw-bold h2 mb-2">Zakat Calculator</h1>
              <p className="opacity-75 mb-0 small">Real-time valuation based on 2026 Market Rates</p>
            </div>

            <div className="card-body p-4 p-md-5">
              
              {/* Enhanced Progress Bar with Step Indicators */}
              <div className={styles.stepIndicators}>
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={styles.stepIndicatorWrapper}>
                    <div 
                      className={`${styles.stepDot} ${step >= s ? styles.stepActive : ''} ${completedSteps[s] ? styles.stepCompleted : ''}`}
                      onClick={() => s < step && setStep(s)}
                    >
                      {completedSteps[s] ? <FontAwesomeIcon icon={faCheckCircle} size="sm" /> : s}
                    </div>
                    <div className={styles.stepLabel}>
                      {s === 1 && 'Personal'}
                      {s === 2 && 'Business'}
                      {s === 3 && 'Review'}
                      {s === 4 && 'Results'}
                    </div>
                    {s < 4 && <div className={`${styles.stepLine} ${step > s ? styles.stepLineActive : ''}`}></div>}
                  </div>
                ))}
              </div>

              {/* Animated Completion Bar */}
              {step < 4 && (
                <div className={styles.completionContainer}>
                  <div className={styles.completionBar}>
                    <div className={styles.completionFill} style={{ width: `${getStepCompletion()}%` }}>
                      <div className={styles.completionShimmer}></div>
                    </div>
                  </div>
                  <div className={styles.completionText}>
                    <span>{Math.round(getStepCompletion())}% Complete</span>
                    {getStepCompletion() === 100 && <span className={styles.completionBadge}>✨ Ready to proceed!</span>}
                  </div>
                </div>
              )}

              {/* STEP 1: PERSONAL ASSETS */}
              {step === 1 && (
                <div className={styles.stepContent}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0 text-success">💰 Personal Assets</h5>
                    <span className={styles.badgeCustom}>Step 1/4</span>
                  </div>
                  
                  {/* <div className={styles.trendAlert}>
                    <div className={styles.trendPulse}></div>
                    <span className="me-2">📈</span>
                    <span><strong>Live Market:</strong> Gold is  {marketTrend.gold.direction} ({marketTrend.gold.change}) • Silver is {marketTrend.silver.direction} ({marketTrend.silver.change})</span>
                  </div> */}
                  
                  {/* Cash Input with Counter Animation */}
                  <div className={`${styles.inputGroup} ${pulsingFields.cash ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>💵</span>
                      Cash in Hand & Bank (₹)
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={assets.cash || ''} 
                        className={`form-control ${styles.inputField} ${assets.cash > 0 ? styles.inputFilled : ''}`} 
                        onChange={(e) => updateAsset('cash', e.target.value)} 
                        placeholder="Enter amount..."
                      />
                      {assets.cash > 0 && (
                        <div className={styles.inputCheckmark}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                      )}
                      {assets.cash > 0 && (
                        <div className={styles.inputProgress}>
                          <div className={styles.inputProgressBar}></div>
                        </div>
                      )}
                    </div>
                    {assets.cash > 0 && (
                      <div className={styles.wordsDisplay}>
                        <span className={styles.sparkle}>✨</span> {numberToWords(assets.cash)}
                      </div>
                    )}
                  </div>

                  <div className={`${styles.inputGroup} ${pulsingFields.crypto ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>₿</span>
                      Digital Assets (Crypto/Wallets) (₹)
                      <span 
                        className={styles.infoIcon} 
                        onClick={() => toggleTooltip('crypto')}
                        onMouseEnter={() => setActiveTooltip('crypto')}
                        onMouseLeave={() => setTimeout(() => setActiveTooltip(null), 2000)}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={assets.crypto || ''} 
                        className={`form-control ${styles.inputField} ${assets.crypto > 0 ? styles.inputFilled : ''}`} 
                        onChange={(e) => updateAsset('crypto', e.target.value)} 
                        placeholder="Enter amount..."
                      />
                      {assets.crypto > 0 && (
                        <>
                          <div className={styles.inputCheckmark}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <div className={styles.inputProgress}>
                            <div className={styles.inputProgressBar}></div>
                          </div>
                        </>
                      )}
                    </div>
                    {assets.crypto > 0 && (
                      <div className={styles.wordsDisplay}>
                        <span className={styles.sparkle}>✨</span> {numberToWords(assets.crypto)}
                      </div>
                    )}
                    {activeTooltip === 'crypto' && (
                      <div className={styles.tooltipBox}>
                        <div className={styles.tooltipArrow}></div>
                        📌 Rule: Valuation based on today's spot price.
                      </div>
                    )}
                  </div>

                  <div className={styles.sectionDivider}>
                    <span>🪙 PRECIOUS METALS</span>
                    <span 
                      className={styles.infoIcon} 
                      onClick={() => toggleTooltip('goldRate')}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </div>

                  {activeTooltip === 'goldRate' && (
                    <div className={styles.tooltipBox}>
                      <div className={styles.tooltipArrow}></div>
                      📌 We deduct 3% for actual "Buy-back" value.
                    </div>
                  )}

                  {/* Gold Entries with Animation */}
                  {goldEntries.map((entry, index) => (
                    <div className={`${styles.goldRow} ${styles.fadeIn}`} key={entry.id} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={styles.goldWeight}>
                        {index === 0 && <label className={styles.miniLabel}>Gold Weight (g)</label>}
                        <input 
                          type="number" 
                          value={entry.weight || ''} 
                          className={`form-control ${styles.inputField}`} 
                          onChange={(e) => updateGoldEntry(entry.id, 'weight', e.target.value)} 
                          placeholder="0g" 
                        />
                        <div className={styles.conversion}>
                          <span>≈ {(entry.weight / 11.66).toFixed(2)} Tola</span>
                          <span className={styles.rate}>
                            {formatINR(prices.gold * (entry.purity / 24) * 0.97)}/g
                          </span>
                        </div>
                      </div>

                      <div className={styles.goldPurity}>
                        {index === 0 && <label className={styles.miniLabel}>Purity</label>}
                        <select 
                          className={`form-select ${styles.inputField}`} 
                          value={entry.purity} 
                          onChange={(e) => updateGoldEntry(entry.id, 'purity', e.target.value)}
                        >
                          <option value="24">24K </option>
                          <option value="22">22K </option>
                          <option value="21">21K </option>
                          <option value="18">18K </option>
                        </select>
                      </div>

                      <div className={styles.goldAction}>
                        {index === 0 && <label className={styles.miniLabel} style={{ visibility: 'hidden' }}>Action</label>}
                        {index === 0 ? (
                          <button type="button" className={styles.addBtn} onClick={addNewGoldRow}>
                            <FontAwesomeIcon icon={faPlus} className={styles.btnIcon} />
                          </button>
                        ) : (
                          <button 
                            type="button" 
                            className={styles.deleteBtn} 
                            onClick={() => setGoldEntries(goldEntries.filter(e => e.id !== entry.id))}
                          >
                            <FontAwesomeIcon icon={faTrash} size="sm" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className={`${styles.inputGroup} ${pulsingFields.silverWeight ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>⚪</span>
                      Silver Weight (g)
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={assets.silverWeight || ''} 
                        className={`form-control ${styles.inputField} ${assets.silverWeight > 0 ? styles.inputFilled : ''}`} 
                        onChange={(e) => updateAsset('silverWeight', e.target.value)} 
                        placeholder="0g" 
                      />
                      {assets.silverWeight > 0 && (
                        <>
                          <div className={styles.inputCheckmark}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <div className={styles.inputProgress}>
                            <div className={styles.inputProgressBar}></div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.conversion}>
                      <span>≈ {(assets.silverWeight / 11.66).toFixed(2)} Tola</span>
                      <span className={styles.rate}>
                        {formatINR(prices.silver * 0.97)}/g
                      </span>
                    </div>
                  </div>

                  {/* Animated Fitrana Box */}
                  <div className={styles.fitranaBox}>
                    <div className={styles.fitranaHeader}>
                      <h6><span className={styles.moonIcon}>🌙</span> Zakat Al-Fitr (Fitrana)</h6>
                    </div>
                    <div className={styles.fitranaContent}>
                      <div>
                        <label>Family Members:</label>
                        <input 
                          type="number" 
                          value={fitrCount || ''} 
                          className={`form-control ${styles.fitranaInput}`}
                          onChange={(e) => setFitrCount(parseInt(e.target.value) || 0)} 
                        />
                      </div>
                      <div className={styles.fitranaTotal}>
                        <div className={styles.fitranaLabel}>Total</div>
                        <div className={`${styles.fitranaAmount} ${fitrCount > 0 ? styles.countUp : ''}`}>
                          {formatINR(totalFitrana)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    className={`btn w-100 mt-4 ${styles.primaryBtn} ${styles.btnPulse}`} 
                    onClick={() => goToNextStep(2)}
                  >
                    <span>Next: Business & Professional</span>
                    <span className={styles.btnArrow}>→</span>
                  </button>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL & BUSINESS */}
              {step === 2 && (
                <div className={styles.stepContent}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0 text-success">💼 Professional & Business</h5>
                    <span className={styles.badgeCustom}>Step 2/4</span>
                  </div>

                  <div className={styles.proTipBox}>
                    <div className={styles.tipIcon}>💡</div>
                    <strong>Pro Tip:</strong> Only include assets with full ownership (vesting).
                  </div>

                  {/* Similar enhanced inputs for Step 2 */}
                  <div className={`${styles.inputGroup} ${pulsingFields.inventory ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>📦</span>
                      Trade Stock (Selling Price) (₹)
                      <span className={styles.infoIcon} onClick={() => toggleTooltip('inventory')}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={assets.inventory || ''} 
                        className={`form-control ${styles.inputField} ${assets.inventory > 0 ? styles.inputFilled : ''}`} 
                        onChange={(e) => updateAsset('inventory', e.target.value)} 
                        placeholder="Enter amount..."
                      />
                      {assets.inventory > 0 && (
                        <>
                          <div className={styles.inputCheckmark}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <div className={styles.inputProgress}>
                            <div className={styles.inputProgressBar}></div>
                          </div>
                        </>
                      )}
                    </div>
                    {assets.inventory > 0 && (
                      <div className={styles.wordsDisplay}>
                        <span className={styles.sparkle}>✨</span> {numberToWords(assets.inventory)}
                      </div>
                    )}
                    {activeTooltip === 'inventory' && (
                      <div className={styles.tooltipBox}>
                        <div className={styles.tooltipArrow}></div>
                        📌 Use current Retail Selling Price, not cost.
                      </div>
                    )}
                  </div>

                  <div className={`${styles.inputGroup} ${pulsingFields.investments ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>📈</span>
                      Shares & Mutual Funds (₹)
                      <span className={styles.infoIcon} onClick={() => toggleTooltip('rsu')}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={assets.investments || ''} 
                        className={`form-control ${styles.inputField} ${assets.investments > 0 ? styles.inputFilled : ''}`} 
                        onChange={(e) => updateAsset('investments', e.target.value)} 
                        placeholder="Enter amount..."
                      />
                      {assets.investments > 0 && (
                        <>
                          <div className={styles.inputCheckmark}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <div className={styles.inputProgress}>
                            <div className={styles.inputProgressBar}></div>
                          </div>
                        </>
                      )}
                    </div>
                    {assets.investments > 0 && (
                      <div className={styles.wordsDisplay}>
                        <span className={styles.sparkle}>✨</span> {numberToWords(assets.investments)}
                      </div>
                    )}
                    {activeTooltip === 'rsu' && (
                      <div className={styles.tooltipBox}>
                        <div className={styles.tooltipArrow}></div>
                        📌 Market value of vested shares only.
                      </div>
                    )}
                  </div>

                  <div className={`${styles.inputGroup} ${pulsingFields.pension ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>🏦</span>
                      Provident Fund & LIC (Paid) (₹)
                      <span className={styles.infoIcon} onClick={() => toggleTooltip('pf')}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={assets.pension || ''} 
                        className={`form-control ${styles.inputField} ${assets.pension > 0 ? styles.inputFilled : ''}`} 
                        onChange={(e) => updateAsset('pension', e.target.value)} 
                        placeholder="Enter amount..."
                      />
                      {assets.pension > 0 && (
                        <>
                          <div className={styles.inputCheckmark}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <div className={styles.inputProgress}>
                            <div className={styles.inputProgressBar}></div>
                          </div>
                        </>
                      )}
                    </div>
                    {assets.pension > 0 && (
                      <div className={styles.wordsDisplay}>
                        <span className={styles.sparkle}>✨</span> {numberToWords(assets.pension)}
                      </div>
                    )}
                    {activeTooltip === 'pf' && (
                      <div className={styles.detailedTooltip}>
                        <strong>Should you include this?</strong>
                        <ul>
                          <li><strong>YES:</strong> Can withdraw today (even as loan)</li>
                          <li><strong>NO:</strong> Locked until retirement</li>
                        </ul>
                        <em>*Pay Zakat when you withdraw locked funds.</em>
                      </div>
                    )}
                  </div>

                  <div className={`${styles.inputGroup} ${pulsingFields.rentalIncome ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>🏠</span>
                      Net Rental Savings (₹)
                      <span className={styles.infoIcon} onClick={() => toggleTooltip('rental')}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={assets.rentalIncome || ''} 
                        className={`form-control ${styles.inputField} ${assets.rentalIncome > 0 ? styles.inputFilled : ''}`} 
                        onChange={(e) => updateAsset('rentalIncome', e.target.value)} 
                        placeholder="Enter amount..."
                      />
                      {assets.rentalIncome > 0 && (
                        <>
                          <div className={styles.inputCheckmark}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <div className={styles.inputProgress}>
                            <div className={styles.inputProgressBar}></div>
                          </div>
                        </>
                      )}
                    </div>
                    {assets.rentalIncome > 0 && (
                      <div className={styles.wordsDisplay}>
                        <span className={styles.sparkle}>✨</span> {numberToWords(assets.rentalIncome)}
                      </div>
                    )}
                    {activeTooltip === 'rental' && (
                      <div className={styles.tooltipBox}>
                        <div className={styles.tooltipArrow}></div>
                        📌 Property NOT zakatable. Only saved rent.
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-3 mt-4">
                    <button className={`btn ${styles.secondaryBtn}`} onClick={() => setStep(1)}>
                      <span className={styles.btnArrow} style={{ transform: 'rotate(180deg)' }}>→</span>
                      <span>Back</span>
                    </button>
                    <button className={`btn flex-grow-1 ${styles.primaryBtn} ${styles.btnPulse}`} onClick={() => goToNextStep(3)}>
                      <span>Next: Review & Debt</span>
                      <span className={styles.btnArrow}>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW WITH INTERACTIVE CHART */}
              {step === 3 && (
                <div className={styles.stepContent}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0 text-success">📊 Review & Liabilities</h5>
                    
                  </div>

                  {/* Asset Distribution Chart */}
                  {showChart && totalAssets > 0 && (
                    <div className={styles.chartContainer}>
                      <h6 className={styles.chartTitle}>Asset Distribution</h6>
                      <div className={styles.pieChart}>
                        {getAssetDistribution().map((item, index) => {
                          const rotation = getAssetDistribution()
                            .slice(0, index)
                            .reduce((acc, curr) => acc + (curr.value / totalAssets * 360), 0);
                          
                          return (
                            <div 
                              key={index}
                              className={styles.pieSlice}
                              style={{
                                '--rotation': `${rotation}deg`,
                                '--percentage': `${item.value / totalAssets * 100}%`,
                                '--color': item.color
                              }}
                            ></div>
                          );
                        })}
                      </div>
                      <div className={styles.chartLegend}>
                        {getAssetDistribution().map((item, index) => (
                          <div key={index} className={styles.legendItem}>
                            <div className={styles.legendColor} style={{ background: item.color }}></div>
                            <div className={styles.legendLabel}>
                              <span>{item.name}</span>
                              <span className={styles.legendPercent}>{item.percent}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Animated Review Table */}
                  <div className={styles.reviewTable}>
                    <div className={styles.tableSection}>
                      <div className={styles.tableSectionHeader}>
                        <span>Personal Assets</span>
                      </div>
                      <div className={`${styles.tableRow} ${styles.slideInLeft}`} style={{ animationDelay: '0.1s' }}>
                        <span>💵 Cash & Crypto</span>
                        <span className={styles.amountPulse}>{formatINR(assets.cash + assets.crypto)}</span>
                      </div>
                      <div className={`${styles.tableRow} ${styles.slideInLeft}`} style={{ animationDelay: '0.2s' }}>
                        <span>🪙 Gold ({goldEntries.reduce((sum, e) => sum + (parseFloat(e.weight) || 0), 0)}g)</span>
                        <span className={styles.amountPulse}>{formatINR(goldVal)}</span>
                      </div>
                      <div className={`${styles.tableRow} ${styles.slideInLeft}`} style={{ animationDelay: '0.3s' }}>
                        <span>⚪ Silver ({assets.silverWeight}g)</span>
                        <span className={styles.amountPulse}>{formatINR(silverVal)}</span>
                      </div>
                    </div>

                    <div className={styles.tableSection}>
                      <div className={styles.tableSectionHeader}>
                        <span>Professional Assets</span>
                      </div>
                      <div className={`${styles.tableRow} ${styles.slideInLeft}`} style={{ animationDelay: '0.4s' }}>
                        <span>📈 Investments & PF</span>
                        <span className={styles.amountPulse}>{formatINR(assets.investments + assets.pension)}</span>
                      </div>
                      <div className={`${styles.tableRow} ${styles.slideInLeft}`} style={{ animationDelay: '0.5s' }}>
                        <span>💼 Business & Rental</span>
                        <span className={styles.amountPulse}>{formatINR(assets.inventory + assets.rentalIncome)}</span>
                      </div>
                    </div>

                    <div className={`${styles.tableTotal} ${styles.totalPulse}`}>
                      <span>Gross Assets</span>
                      <span>{formatINR(totalAssets)}</span>
                    </div>
                  </div>

                  <div className={`${styles.inputGroup} ${pulsingFields.liabilities ? styles.pulse : ''}`}>
                    <label className={styles.formLabel}>
                      <span className={styles.labelIcon}>💳</span>
                      Immediate Deductible Liabilities (₹)
                    </label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="number" 
                        value={liabilities || ''} 
                        className={`form-control ${styles.inputField}`} 
                        onChange={(e) => handleFieldChange('liabilities', parseFloat(e.target.value) || 0, setLiabilities)} 
                        placeholder="Monthly EMI principal, Bills, etc."
                      />
                    </div>
                    <div className={styles.debtGuidance}>
                      <div className={styles.debtWarning}>
                        <span>🚫</span>
                        <div><strong>Don't Deduct:</strong> Future interest, total loans</div>
                      </div>
                      <div className={styles.debtSuccess}>
                        <span>✅</span>
                        <div><strong>Deduct Only:</strong> Business debts, bills, EMI principal</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex gap-3 mt-4">
                    <button className={`btn ${styles.secondaryBtn}`} onClick={() => setStep(2)}>
                      <span className={styles.btnArrow} style={{ transform: 'rotate(180deg)' }}>→</span>
                      <span>Back</span>
                    </button>
                    <button className={`btn flex-grow-1 ${styles.primaryBtn} ${styles.btnPulse}`} onClick={() => goToNextStep(4)}>
                      <span>Calculate Zakat</span>
                      <span className={styles.btnArrow}>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: RESULTS WITH CELEBRATIONS */}
              {step === 4 && (
                <div className={`text-center ${styles.stepContent}`}>
                  <div className={styles.resultHeader}>
                    <h4 className="fw-bold mb-2">
                      Purification Summary
                    </h4>
                  </div>
                  
                  <div className={styles.resultBox}>
                    <div className={styles.resultLabel}>Total Zakat to Pay (2.5%)</div>
                    <div className={`${styles.resultAmount} ${styles.countUp}`}>{formatINR(zakatDue)}</div>
                    
                    {/* Animated Nisab Progress */}
                    <div className={styles.nisabProgress}>
                      <div className={styles.nisabBar}>
                        <div 
                          className={styles.nisabFill} 
                          style={{ width: `${nisabProgress}%` }}
                        >
                          <div className={styles.nisabShimmer}></div>
                        </div>
                      </div>
                      <div className={styles.nisabText}>
                        {isZakatMandatory ? (
                          <span className={styles.nisabSuccess}>
                            ✓ Above Nisab ({formatINR(nisabThreshold)}) - Zakat is Mandatory
                          </span>
                        ) : (
                          <span className={styles.nisabWarning}>
                            ℹ Below Nisab ({formatINR(nisabThreshold)}) - Payment is Voluntary
                          </span>
                        )}
                      </div>
                    </div>

                    <button onClick={copyToClipboard} className={`btn ${styles.copyBtn}`}>
                      📋 Copy Report
                    </button>
                  </div>
                  
                  <div className={styles.summaryGrid}>
                    <div className={`${styles.summaryCard} ${styles.slideInUp}`} style={{ animationDelay: '0.1s' }}>
                      <div className={styles.summaryIcon}>💰</div>
                      <div className={styles.summaryLabel}>Net Zakatable</div>
                      <div className={styles.summaryValue}>{formatINR(netWealth)}</div>
                    </div>
                    <div className={`${styles.summaryCard} ${styles.slideInUp}`} style={{ animationDelay: '0.2s' }}>
                      <div className={styles.summaryIcon}>🌙</div>
                      <div className={styles.summaryLabel}>Fitrana Due</div>
                      <div className={styles.summaryValue}>{formatINR(totalFitrana)}</div>
                    </div>
                  </div>

                  <div className={styles.feedbackLink}>
                    <Link href="/feedback" className={styles.feedbackButton}>
                      💬 Share Feedback or Report Bug
                    </Link>
                  </div>

                  {/* Animated Recommendations */}
                  <div className={styles.recommendations}>
                    <h6 className={styles.recommendationsTitle}>
                      💚 Where to Pay Your Zakat?
                    </h6>
                    <div className={styles.recommendationsGrid}>
                      {[
                        { icon: '🏠', title: 'Needy Kin', desc: 'Siblings or relatives', delay: '0.1s' },
                        { icon: '🛠️', title: 'Livelihood', desc: 'Tools for self-reliance', delay: '0.2s' },
                        { icon: '🎓', title: 'Education', desc: 'Student fees & training', delay: '0.3s' },
                        { icon: '🏥', title: 'Medical', desc: 'Hospital bills', delay: '0.4s' }
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className={`${styles.recommendCard} ${styles.scaleIn}`}
                          style={{ animationDelay: item.delay }}
                        >
                          <div className={styles.recommendIcon}>{item.icon}</div>
                          <div className={styles.recommendTitle}>{item.title}</div>
                          <div className={styles.recommendDesc}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className={`btn ${styles.resetBtn}`} onClick={resetAll}>
                    🔄 New Calculation
                  </button>
                </div>
              )}
            </div>

            {/* ANIMATED FOOTER */}
            <div className={styles.footer}>
              <div className={styles.footerLeft}>
                <div className={styles.footerLabel}>Threshold Base</div>
                <div className={styles.nisabToggle}>
                  <button 
                    onClick={() => setNisabType('gold')} 
                    className={nisabType === 'gold' ? styles.nisabActive : ''}
                  >
                    <span className={styles.metalIcon}>🪙</span> Gold
                  </button>
                  <button 
                    onClick={() => setNisabType('silver')} 
                    className={nisabType === 'silver' ? styles.nisabActive : ''}
                  >
                    <span className={styles.metalIcon}>⚪</span> Silver
                  </button>
                </div>
                {nisabType === 'silver' && (
                  <div className={`${styles.recommendText} ${styles.fadeIn}`}>
                    ⭐ Recommended for Cash-holders
                  </div>
                )}
              </div>
              <div className={styles.footerRight}>
                <div className={styles.footerLabel}>Live Asset Total</div>
                <div className={`${styles.footerAmount} ${totalAssets > 0 ? styles.countUp : ''}`}>
                  {formatINR(totalAssets)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalZakatWizard;