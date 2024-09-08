import { useState } from 'react'
import HomePage from './components/HomePage'
import ItemsPage from './components/ItemsPage'
import NewPage from './components/NewPage'
import OpenPage from './components/OpenPage'
import SummaryPage from './components/SummaryPage'
import FinishPage from './components/FinishPage'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <main className="font-normal h-scren text-orange-900 bg-zinc-200 h-screen">
      <div className="container mx-auto p-1">
        <BrowserRouter>
          <header className="p-1 text-center flex-1 font-bold text-xl bg-orange-400 rounded-sm bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400">
            Poteando
          </header>
          <div className="bg-zinc-200 p-2">
            <Routes>
              <Route path='/items' element={<ItemsPage />} />
              <Route path='/pepbe/home/:codeId' element={<HomePage />} />
              <Route path='/home/:codeId' element={<HomePage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/pepbe' element={<HomePage />} />
              <Route path='/new' element={<NewPage />} />
              <Route path='/open' element={<OpenPage />} />
              <Route path='/summary' element={<SummaryPage />} />
              <Route path='/finish' element={<FinishPage />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </main>
  )
}

export default App
