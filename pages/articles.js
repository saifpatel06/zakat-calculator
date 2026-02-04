import Head from 'next/head';
import Layout from '../src/components/Layout';
import BlogSection from '../src/components/BlogSection';
import Meta from '../src/components/Meta';

const Articles = () => {
  return (
    <Layout>
      <Meta />

      <BlogSection />
    </Layout>
  );
};

export default Articles;