import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-5 py-2 w-[80%] mx-auto my-10'>
        <button className='px-5 py-2 text-base md:text-xl tracking-wider bg-violet-500 hover:bg-violet-600 duration-200 rounded-md'>LogIn</button>
        <div>
            <button className='px-5 py-2 text-base md:text-xl tracking-wider bg-violet-500 hover:bg-violet-600 duration-200 rounded-md'>Feedback</button>
        </div>
    </nav>
  )
}

export default Navbar