import React, { useEffect, useState } from 'react'
import Card from './Card.jsx'
import Banner from './banner.jsx'
import Pagination from './Pagination.jsx'

function Movies() {

  let [data, setData] = useState([])
  let [page, setPage] = useState(1)
  async function getMovies() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=657dd6c48e269a62193ae46179c53394&language=en-US&page=${page}`)
    let result = await response.json()
    setData(result.results)
    console.log(result.results)
  }

  useEffect(() => {
    getMovies()
  }, [page])

  const pageNext=()=>{
    setPage(page+1)
  }
  const pagePrev=()=>{
    if(page>1){setPage(page-1)}
  }

  return (
    <div >
      <Banner />
      <div style={{ fontSize: "2.5rem" ,fontStyle:"italic",fontFamily:"cursive", fontWeight:"bold",color:"yellow",textAlign:"center"}}>Trending Movies</div>
      <div className='flex flex-wrap justify-between'>
        {data.map((mov) => (
          <Card key={mov.id} mov={mov} />
        ))}
      </div>
      <Pagination page={page} pagePrev={pagePrev} pageNext={pageNext}/>
    </div>
  )
}

export default Movies
