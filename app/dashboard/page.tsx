import FileList from '@/components/FileList'
import Location from '@/components/Location'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  
  return (
    <main>
      <Navbar />
      <Location />
      <FileList />
    </main>
  )
}

export default page