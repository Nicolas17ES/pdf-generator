import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import { UploadProvider } from './context/UploadContext'




function App() {
  return (
    <UploadProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={Home} />
          </Routes>
        </main>
      </Router>
    </UploadProvider>
  );
}

export default App;
