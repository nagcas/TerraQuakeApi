import React from 'react'

export default function ListPosts() {
  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        Total Posts: <span className='text-purple-400 font-semibold'>156</span>
      </div>
      <div className='text-sm text-white/70'>
        Published: <span className='text-green-400 font-semibold'>142</span>
      </div>
      <div className='text-sm text-white/70'>
        Drafts: <span className='text-yellow-400 font-semibold'>14</span>
      </div>
      <button className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300'>
        Manage Posts
      </button>
    </div>
  )
}
