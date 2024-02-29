import React from 'react'
import Header from '../../Components/Header'


const DefaultLayout = ({children}) => {
  return (
    <div className='w-full'>  

         <Header className="w-full"/>
          <div className='name'>
               {children}
          </div>
       
     </div>     
  )
}

export default DefaultLayout