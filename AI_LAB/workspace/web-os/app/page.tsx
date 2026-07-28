import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-slate-100">
        <div className="text-xl font-bold tracking-tight text-indigo-600">
          MyNextApp
        </div>
        <div className="flex gap-6 font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link href="/services" className="hover:text-indigo-600 transition">Services</Link>
        </div>
        <div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Welcome to Your <span className="text-indigo-600">Next.js</span> App
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          You have successfully replaced the placeholder code. Now start building beautiful layouts, lighting fast APIs, and dynamic routes.
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="#features" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            Explore Features
          </a>
          <a 
            href="https://nextjs.org/docs" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition"
          >
            Read Docs
          </a>
        </div>
      </main>

       <section id="features" className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-200">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Built-in Superpowers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">App Router</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Leverage React Server Components out of the box for faster page loads.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Tailwind Styled</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Utility-first CSS classes make layout changes quick and easily maintainable.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Optimised Production</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Automatic code-splitting, image optimization, and static generation pre-built.</p>
          </div>
        </div>
      </section>
      
      {/* Basic Footer */}
      <footer className="text-center py-8 text-sm text-slate-400 border-t border-slate-100 bg-white mt-12">
        <p>© {new Date().getFullYear()} MyNextApp. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
