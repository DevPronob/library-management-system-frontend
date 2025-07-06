import  { type ReactNode } from 'react'

function AppLayout({children}:{children:ReactNode}) {
  return (
    <div className='max-w-7xl mx-auto py-12'>
        {children}
    </div>
  )
}

export default AppLayout