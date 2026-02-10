import Head from 'next/head';
import Layout from '../../src/components/Layout';
import RamadanDashboard from '../../src/components/Ramadan/RamadanDashboard';
import Ramadaneducation from '../../src/components/Ramadan/Ramadaneducation';
import Meta from '../../src/components/Meta';

const Ramadan = () => {
  return (
    <Layout>
      <Meta />
      <RamadanDashboard />
      <Ramadaneducation />
    </Layout>
  );
};

export default Ramadan;