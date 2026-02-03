'use client';
import styles from '../../styles/Blogsection.module.css';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Spiritual Significance of Zakat in Ramadan",
      excerpt: "Discover why Ramadan is the most blessed time to fulfill your Zakat obligation and how it purifies both wealth and soul.",
      date: "March 15, 2024",
      category: "Spirituality",
      readTime: "5 min read",
      image: "🌙"
    },
    {
      id: 2,
      title: "Understanding Nisab: Gold vs Silver Standard",
      excerpt: "A comprehensive guide to calculating your Zakat threshold using both gold and silver standards in today's economy.",
      date: "March 10, 2024",
      category: "Calculation",
      readTime: "7 min read",
      image: "💰"
    },
    {
      id: 3,
      title: "Real Stories: How Your Zakat Changes Lives",
      excerpt: "Meet families whose lives were transformed through Zakat contributions - from education to healthcare and beyond.",
      date: "March 5, 2024",
      category: "Impact Stories",
      readTime: "6 min read",
      image: "❤️"
    },
    {
      id: 4,
      title: "Zakat on Business Assets: A Complete Guide",
      excerpt: "Learn how to calculate Zakat on your business inventory, receivables, and profits according to Islamic principles.",
      date: "February 28, 2024",
      category: "Business",
      readTime: "8 min read",
      image: "📊"
    },
    {
      id: 5,
      title: "Modern Investments and Zakat: Stocks, Crypto & More",
      excerpt: "Navigate the complexities of calculating Zakat on contemporary investment vehicles including stocks and cryptocurrency.",
      date: "February 20, 2024",
      category: "Investments",
      readTime: "6 min read",
      image: "📈"
    },
    {
      id: 6,
      title: "The Difference Between Zakat and Sadaqah",
      excerpt: "Understanding the unique characteristics, rules, and spiritual rewards of obligatory Zakat versus voluntary Sadaqah.",
      date: "February 15, 2024",
      category: "Education",
      readTime: "4 min read",
      image: "🤲"
    }
  ];

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.badge}>Latest Articles</span>
            <h2 className={styles.title}>Zakat Knowledge Hub</h2>
            <p className={styles.subtitle}>
              Explore comprehensive guides, real-world impact stories, and expert insights 
              to deepen your understanding of Zakat and its importance
            </p>
          </div>
        </div>

        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <div className={styles.cardImage}>
                <span className={styles.emoji}>{post.image}</span>
                <span className={styles.categoryBadge}>{post.category}</span>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                
                <button className={styles.readMoreBtn}>
                  Read Article
                  <span className={styles.arrow}>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <h3 className={styles.ctaTitle}>Want to contribute?</h3>
          <p className={styles.ctaText}>
            Share your Zakat story or knowledge with our community. Help others learn and grow in their understanding of this beautiful pillar of Islam.
          </p>
          <button className={styles.ctaButton}>Submit Your Story</button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;