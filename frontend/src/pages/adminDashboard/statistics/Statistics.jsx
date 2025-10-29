import React from 'react'

export default function Statistics() {
  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        API Calls Today:{' '}
        <span className='text-purple-400 font-semibold'>12,456</span>
      </div>
      <div className='text-sm text-white/70'>
        Server Uptime:{' '}
        <span className='text-green-400 font-semibold'>99.9%</span>
      </div>
      <div className='text-sm text-white/70'>
        Active Sessions:{' '}
        <span className='text-blue-400 font-semibold'>234</span>
      </div>
      <div className='text-sm text-white/70'>
        Data Points: <span className='text-yellow-400 font-semibold'>2.3M</span>
      </div>
    </div>
  )
}
