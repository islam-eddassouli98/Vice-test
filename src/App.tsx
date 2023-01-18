import react from 'react'
import './App.css'
import MetricsLista from './components/MetricsLista'
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Metrics from './components/Metrics'


function App() {


  return (
    //Crezione del router per gesitre Operazioni e Liste
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Metrics/>}/>
        <Route path='/metrics' element={<MetricsLista/>}/>
      </Routes>
    </BrowserRouter>
    
    
    </div>
      
  )
}

export default App
