import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Script from 'next/script'; 

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-68EWFF0H8M"
        strategy="afterInteractive"
      />
      
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-68EWFF0H8M');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;