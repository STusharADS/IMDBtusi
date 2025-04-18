import React, { use } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import genreids from '../utilities/genre'
function WatchList({ watchList, handleDeleteFromWatchList }) {

  function sortWatchList() {
    watchList.sort((a, b) => {
      return b.vote_average - a.vote_average
    })
  }
  const [search, setSearch] = useState("")
  const [currGenre, setCurrGenre] = useState("All Genres")

  function handleGenre(genre) {
    setCurrGenre(genre)
    console.log("handleGenre")
    console.log(genre)
  }

  console.log("watchList")
  console.log(watchList)
  function handleSearch(e) {
    setSearch(e.target.value)
  }
  useEffect(() => {
    if (watchList.length > 0) {
      sortWatchList()
      getGenreIdList()
      console.log("genreIdList")
      console.log(genreIdList)
    }

  }, [watchList])


  let [genreIdList, setGenreIdList] = useState([])
  function getGenreIdList() {
    for (let i = 0; i < watchList.length; i++) {
      if (!genreIdList.includes(watchList[i].genre_ids[0])) {
        genreIdList.push(watchList[i].genre_ids[0])
      }
    }
    setGenreIdList(genreIdList)
  }

  function makeGenreButtons() {
    let duplicatedWatchListGenreIds = watchList.map((movObj) => movObj.genre_ids[0])
    return genreIdList.filter((id) => {
      if (duplicatedWatchListGenreIds.includes(id)) {
        return true
      }
      return false
    })
      .map((id) => {
        return <div onClick={() => { handleGenre(genreids[id]) }} key={id} style={{ marginRight: "2rem", padding: "0.5rem", border: "1px solid orange", borderRadius: "0.5rem", cursor: "pointer", backgroundColor: currGenre === genreids[id] ? "orange" : "#152E3F" }} >
          {genreids[id]}</div>
      })
  }
  return (
    

    <div>
      
      <div className='flex justify-center items-center ' >
        <img height="120px" width="120px" padding-bottom="1000px" src="https://cdn.dribbble.com/userupload/24769165/file/original-6dc1b792c48efe88f4ef66b99b26fa16.gif" alt="searchicon" />
        <input onChange={handleSearch} placeholder='Search WatchList' className='h-[2rem] w-[18rem] bg-grey-100 px-4 outline-offset-2' />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <div onClick={() => { handleGenre("All Genres") }} style={{ marginRight: "2rem", padding: "0.5rem", border: "1px solid orange", borderRadius: "0.5rem", cursor: "pointer", backgroundColor: currGenre === "All Genres" ? "orange" : "#152E3F" }}>All Genres</div>
        
        {makeGenreButtons()}
      </div>

      <table style={{ width: "100%", border: "1px solid grey", borderCollapse: "collapse", borderSpacing: "0px" }}>
        <thead>
          <tr style={{ border: "1px solid orange", color: "orange" }}>
            <th>Name</th>
            <th>Rating</th>
            <th>Popularity</th>
            <th>Genre</th>
            <th>Delete Movies</th>
          </tr>
        </thead>
        <tbody>
          {watchList
            .filter((movObj) => {
              return movObj.title.toLowerCase().includes(search.toLowerCase())
            })
            .filter((movObj) => {
              if (currGenre === "All Genres") {
                return true
              }
              return genreids[movObj.genre_ids[0]] === currGenre
            })
            .map((movObj) =>
              <tr style={{ border: "1px solid grey" }} key={movObj.id} className='text-center'>
                <td><div
                  className="w-[70] h-[105px] bg-contain "
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movObj.poster_path})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "10px",
                  }}></div>
                  <div style={{ color: "yellow", fontWeight: "bold", fontSize: "10px" }}>{movObj.title}</div >
                </td>
                <td>{movObj.vote_average}</td>
                <td>{movObj.popularity}</td>
                <td>{genreids[movObj.genre_ids[0]]}</td>
                <td onClick={() => { handleDeleteFromWatchList(movObj.id) }} style={{ cursor: "pointer", color: "red" }}>Remove</td>
              </tr>)
          }
        </tbody>

      </table>
    </div>
  )
}

export default WatchList
