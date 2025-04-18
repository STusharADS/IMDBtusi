import React from 'react'

function Pagination({page, pagePrev, pageNext}) {
  return (
    <div className=' p-4 h-[50px] w-full mt-8 flex justify-center'>
        <div className='px-8' onClick={pagePrev}><i className="fa-solid fa-arrow-left" ></i></div>
        <div>{page}</div>
        <div className='px-8' onClick={pageNext}><i className="fa-solid fa-arrow-right" ></i></div>
    </div>
  )
}

export default Pagination