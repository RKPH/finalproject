import React from 'react'
import Header from '../../Components/Header'


const DefaultLayout = ({children}) => {
  return (
    <div className='w-full'>  

         <Header className="w-full fixed top-0 left-0 right-0 z-[9999px] bg-white"/>
          <div className='mt-20'>
               {children}
          </div>
       
     </div>     
  )
}

export default DefaultLayout