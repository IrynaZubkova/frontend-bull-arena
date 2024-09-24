import './App.css'
import ArenaWithBull from './components/ArenaWithBull'
import { Matador } from './components/Matador'
import OldMatador from './components/OldMatador'; 
import React, { useState } from 'react';

function App() {

    const [matadorPosition, setMatadorPosition] = useState(0);
    const [applause, setApplause] = useState(0);
  
    // This function is just for demonstration. You should replace it with your actual logic.
    const handleApplauseChange = (newApplause: number) => {
      setApplause(newApplause);
  };
  return (
    <div className="App">
      <ArenaWithBull
        matador={
            <OldMatador
              applause={applause}
              setMatarodPosition={setMatadorPosition}
              matadorPosition={matadorPosition}
            />
          }
        />
      </div>
  )
}

export default App
