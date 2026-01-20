import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogs } from '../data/blogs';

const Blogs = () => {
  const categories = ['ALL', 'BLOG', 'TUTORIAL', 'DEVELOPER'];
  
  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
              <span className="text-sm font-medium text-[#A78BFA]">KNOWLEDGE BASE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-4">
              <span className="text-white">Latest </span>
              <span className="gradient-text">Blogs & Insights</span>
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              Stay ahead of the AI curve with insights on AI memory systems, context management, and productivity hacks.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-xl mx-auto mb-16">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-[#1A1333] border border-[#8B5CF6]/20 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-xl text-white font-medium hover:shadow-lg hover:shadow-[#8B5CF6]/30 transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-[#94A3B8] mt-2 text-center">Join thousands of forward-thinking professionals.</p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === 'ALL'
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white'
                    : 'bg-[#1A1333] text-[#94A3B8] border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.id}`}
                className="group"
              >
                <article className="h-full rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 overflow-hidden hover:border-[#8B5CF6]/40 transition-all hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#8B5CF6]/10">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 flex items-center justify-center">
                    <span className="text-6xl">{blog.image}</span>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium text-white bg-[#8B5CF6] rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-medium text-[#94A3B8] bg-[#0F0A1F]/80 rounded-full">
                        {blog.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8] mb-3">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>By {blog.author}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#A78BFA] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-[#94A3B8] line-clamp-2 mb-4">{blog.excerpt}</p>

                    <div className="flex items-center gap-2 text-[#8B5CF6] group-hover:text-[#A78BFA] transition-colors">
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

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-full text-[#E2E8F0] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
