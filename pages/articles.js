import Head from 'next/head';
import Layout from '../src/components/Layout';
import BlogSection from '../src/components/BlogSection';

const Articles = () => {
  return (
    <Layout>
      <Head>
        <title>Articles - Zakat Knowledge Hub</title>
        <meta name="description" content="Explore comprehensive guides and insights about Zakat" />
      </Head>

      <BlogSection />
    </Layout>
  );
};

export default Articles;