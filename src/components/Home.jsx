import React from 'react'
import { DashboardSongs, Header } from '.'

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <Header /> 
      <DashboardSongs />
    </div>
  )
}

export default Home