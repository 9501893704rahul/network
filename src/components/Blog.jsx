import { Link } from 'react-router-dom';

const Blog = () => {
  const blogs = [
    {
      id: 'best-universal-ai-memory-extensions-2026',
      title: 'Best AI Memory Extensions for ChatGPT, Claude and Gemini (2026 Comparison)',
      excerpt: 'Compare the top AI memory extensions available in 2026 and find the best solution for your workflow.',
      category: 'BLOG',
      date: '1 WEEK AGO',
      image: '🧠',
    },
    {
      id: 'switch-between-gemini-and-chatgpt',
      title: 'How to Switch Between Gemini AI and ChatGPT Without Losing Your Chat History',
      excerpt: 'Learn how to seamlessly transition between AI platforms while keeping all your context intact.',
      category: 'BLOG',
      date: '2 WEEKS AGO',
      image: '🔄',
    },
    {
      id: 'ai-contextual-refinement-persistent-vs-portable-ai-memory',
      title: 'AI Contextual Refinement With Persistent vs Portable AI Memory',
      excerpt: 'Understanding the difference between persistent and portable AI memory and why it matters.',
      category: 'BLOG',
      date: '3 WEEKS AGO',
      image: '💾',
    },
  ];

  return (
    <section id="blogs" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1F] to-[#1A1333]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            <span className="text-white">Latest </span>
            <span className="gradient-text">Blogs</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              to={`/blogs/${blog.id}`}
              className="group"
            >
              <article className="h-full rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 overflow-hidden hover:border-[#8B5CF6]/40 transition-all hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#8B5CF6]/10">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 flex items-center justify-center">
                  <span className="text-6xl">{blog.image}</span>
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium text-white bg-[#8B5CF6] rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="text-xs text-[#94A3B8] mb-3">{blog.date}</div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#A78BFA] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-[#94A3B8] line-clamp-2">{blog.excerpt}</p>

                  {/* Read More */}
                  <div className="mt-4 flex items-center gap-2 text-[#8B5CF6] group-hover:text-[#A78BFA] transition-colors">
                    <span className="text-sm font-medium">Read More</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#E2E8F0] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all"
          >
            View All Blogs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
