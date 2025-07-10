import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  // New state: to explicitly trigger highlight for a specific section
  const [highlightTarget, setHighlightTarget] = useState<string | null>(null); 

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Pass highlightTarget setter to Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        setHighlightTarget={setHighlightTarget} // Pass setter here
      />
      
      <main 
        className="flex justify-center p-8 md:p-12 
                   ml-0 lg:ml-[220px] 
                   flex-grow" 
      >
        {/* Pass highlightTarget and its setter to MainContent */}
        <MainContent 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          highlightTarget={highlightTarget} // Pass the target section ID
          setHighlightTarget={setHighlightTarget} // Pass setter to clear it after highlight
        />
      </main>
    </div>
  );
};

export default App;