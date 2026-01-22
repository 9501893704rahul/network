import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import AIContextFlow from './pages/AIContextFlow'
import SmartProfiles from './pages/SmartProfiles'
import ExtensionDemo from './pages/ExtensionDemo'
import ContextManager from './pages/ContextManager'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/ai-context-flow" element={<AIContextFlow />} />
        <Route path="/smart-profiles" element={<SmartProfiles />} />
        <Route path="/extension" element={<ExtensionDemo />} />
        <Route path="/context-manager" element={<ContextManager />} />
      </Routes>
    </Router>
  )
}

export default App
