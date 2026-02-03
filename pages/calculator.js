import { useState } from 'react';
import Head from 'next/head';
import Layout from '../src/components/Layout';
import UniversalZakatWizard from '../src/components/UniversalZakatWizard';
import ZakatGuide from '../src/components/ZakatGuide';

const Calculator = () => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <Layout>
      <Head>
        <title>Zakat Calculator - Calculate Your Zakat</title>
        <meta name="description" content="Calculate your Zakat accurately with our comprehensive calculator" />
      </Head>

      <div className="container">
        {/* Main Calculator */}
        <UniversalZakatWizard />

        {/* Toggle Button */}
        <div className="text-center mt-5">
          <button 
            className="btn rounded-pill px-4 guide-toggle-btn"
            onClick={() => setShowGuide(!showGuide)}
          >
            {showGuide ? "⬆ Hide Calculation Logic" : "⬇ How is this calculated? (Guide)"}
          </button>
        </div>

        {/* Conditional Guide */}
        {showGuide && <ZakatGuide />}
      </div>
    </Layout>
  );
};

export default Calculator;