import React from 'react'

const Hero = ({name = "James Doe", handleAdd}) => {
  return (
    <div className={` bg-[url('/imgs/img.jpg')] object-contain bg-no-repeat bg-cover bg-center py-12 px-8 w-[80%] mx-auto mt-24 rounded-lg`}>
        <h1 className='text-5xl tracking-widest '>Hi! {name}</h1>
        <p className='text-xl my-2 tracking-wide'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse saepe hic illum.</p>
        <button className='px-5 py-2 text-xl tracking-wider bg-violet-500 hover:bg-violet-600 duration-200 rounded-xl mt-20 shadow-md'
        onClick={handleAdd}
        >
            Add CheckIn
        </button>
    </div>
  )
}

export default Hero
