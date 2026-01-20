import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBlogById, getRecentBlogs } from '../data/blogs';

const BlogPost = () => {
  const { id } = useParams();
  const blog = getBlogById(id);
  const recentBlogs = getRecentBlogs(3).filter(b => b.id !== id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0F0A1F]">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
          <Link to="/blogs" className="text-[#8B5CF6] hover:text-[#A78BFA]">
            ← Back to Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-8">
            <Link to="/" className="hover:text-[#8B5CF6]">Home</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-[#8B5CF6]">Blogs</Link>
            <span>/</span>
            <span className="text-[#A78BFA]">{blog.category}</span>
          </div>

          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 text-xs font-medium text-white bg-[#8B5CF6] rounded-full">
              {blog.category}
            </span>
            <span className="text-sm text-[#94A3B8]">{blog.fullDate}</span>
            <span className="text-sm text-[#94A3B8]">•</span>
            <span className="text-sm text-[#94A3B8]">{blog.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center text-white font-bold">
              {blog.author[0]}
            </div>
            <div>
              <p className="text-white font-medium">{blog.author}</p>
              <p className="text-sm text-[#94A3B8]">Content Writer at Plurality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-64 md:h-96 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 flex items-center justify-center border border-[#8B5CF6]/20">
            <span className="text-9xl">{blog.image}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-invert prose-lg max-w-none">
                <div 
                  className="text-[#E2E8F0] leading-relaxed blog-content"
                  dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
                />
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-[#8B5CF6]/20">
                <div className="flex flex-wrap gap-2">
                  {['AI Memory', 'ChatGPT', 'Claude', 'Gemini', 'Context Management'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-[#94A3B8] bg-[#1A1333] rounded-full border border-[#8B5CF6]/20"
                    >
                      #{tag.replace(' ', '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-[#94A3B8]">Share:</span>
                <div className="flex gap-3">
                  {['X', 'LinkedIn', 'Facebook'].map((platform) => (
                    <button
                      key={platform}
                      className="w-10 h-10 rounded-full bg-[#1A1333] border border-[#8B5CF6]/20 flex items-center justify-center text-[#94A3B8] hover:text-[#8B5CF6] hover:border-[#8B5CF6] transition-all"
                    >
                      {platform[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#F59E0B]/20 border border-[#8B5CF6]/30">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to try AI Context Flow?
                </h3>
                <p className="text-[#94A3B8] mb-6">
                  Stop rebuilding context every time you switch AI platforms. Create your knowledge base once and use it everywhere.
                </p>
                <a
                  href="https://app.plurality.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#8B5CF6]/30 transition-all"
                >
                  Get Started Free
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Table of Contents */}
                <div className="p-6 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 mb-6">
                  <h4 className="text-white font-semibold mb-4">Table of Contents</h4>
                  <nav className="space-y-2">
                    {extractHeadings(blog.content).map((heading, i) => (
                      <a
                        key={i}
                        href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-sm text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"
                      >
                        {heading}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Related Posts */}
                <div className="p-6 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10">
                  <h4 className="text-white font-semibold mb-4">Related Posts</h4>
                  <div className="space-y-4">
                    {recentBlogs.slice(0, 2).map((post) => (
                      <Link
                        key={post.id}
                        to={`/blogs/${post.id}`}
                        className="block group"
                      >
                        <p className="text-sm text-[#E2E8F0] group-hover:text-[#8B5CF6] transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-[#94A3B8] mt-1">{post.date}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="relative py-16 border-t border-[#8B5CF6]/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">More Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentBlogs.map((post) => (
              <Link
                key={post.id}
                to={`/blogs/${post.id}`}
                className="group p-6 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/40 transition-all"
              >
                <span className="text-4xl">{post.image}</span>
                <h3 className="text-white font-semibold mt-4 mb-2 group-hover:text-[#8B5CF6] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#94A3B8]">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Helper function to format markdown-like content to HTML
function formatContent(content) {
  return content
    .replace(/^## (.*$)/gim, '<h2 id="$1" class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold text-white mt-6 mb-2">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 text-[#94A3B8]">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-2 my-4">$&</ul>')
    .replace(/\n\n/g, '</p><p class="text-[#94A3B8] my-4">')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return `<tr>${cells.map(c => `<td class="border border-[#8B5CF6]/20 px-4 py-2 text-[#94A3B8]">${c.trim()}</td>`).join('')}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-[#8B5CF6]/20">$&</table></div>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-[#0F0A1F] p-4 rounded-xl overflow-x-auto my-6 border border-[#8B5CF6]/20"><code class="text-sm text-[#A78BFA]">$2</code></pre>');
}

// Helper function to extract headings for TOC
function extractHeadings(content) {
  const matches = content.match(/^## (.*$)/gim) || [];
  return matches.map(h => h.replace('## ', ''));
}

export default BlogPost;
