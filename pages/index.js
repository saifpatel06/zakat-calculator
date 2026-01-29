import { useState } from 'react';
import Head from 'next/head';
import UniversalZakatWizard from '../src/components/UniversalZakatWizard'; 
import ZakatGuide from '../src/components/ZakatGuide'; 

const Home = () => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="container py-5">
      <Head>
        <title>Universal Zakat Calculator 2026</title>
        <meta name="description" content="Calculate Zakat for Business and Personal Wealth" />
      </Head>

      <main>
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
      </main>

      <footer className="text-center mt-5 py-4 text-muted border-top">
        <small>© 2026 Universal Zakat Wizard | Secure & Universal Calculation</small>
      </footer>
    </div>
  );
};

export default Home;