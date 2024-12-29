'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const Location = () => {
    const pathName = usePathname()
    const board: string[] = pathName.split('/')
  return (
    <div className='max-w-7xl py-3 px-6 mx-auto'>
        <p className='uppercase text-2xl'>{board}</p>
    </div>
  )
}

export default Location