import React, { useEffect, useState } from 'react'
import genreids from '../utilities/genre'

function WatchList({ watchList, handleDeleteFromWatchList }) {

  function sortWatchList() {
    watchList.sort((a, b) => {
      return b.vote_average - a.vote_average
    })
  }

  const [search, setSearch] = useState("")
  const [currGenre, setCurrGenre] = useState("All Genres")
  const [genreIdList, setGenreIdList] = useState([])

  function handleGenre(genre) {
    setCurrGenre(genre)
    console.log("handleGenre")
    console.log(genre)
  }

  useEffect(() => {
    if (watchList.length > 0) {
      sortWatchList()
      getGenreIdList()
    }
  }, [watchList])

  function getGenreIdList() {
    const newGenreIdList = []
    watchList.forEach((movie) => {
      // Ensure movie has genre_ids and it's not undefined
      const genreId = movie.genre_ids?.[0]
      if (genreId && !newGenreIdList.includes(genreId)) {
        newGenreIdList.push(genreId)
      }
    })
    setGenreIdList(newGenreIdList)
  }

  function makeGenreButtons() {
    const duplicatedWatchListGenreIds = watchList.map((movObj) => movObj.genre_ids?.[0]).filter(Boolean); // Safe navigation
    return genreIdList.filter((id) => duplicatedWatchListGenreIds.includes(id))
    .map((id) => {
      const genreName = genreids[id];
      return (
        <div
          onClick={() => { handleGenre(genreName); }}
          key={id}
          style={{
            marginRight: "2rem",
            padding: "0.5rem",
            border: "1px solid orange",
            borderRadius: "0.5rem",
            cursor: "pointer",
            backgroundColor: currGenre === genreName ? "orange" : "#152E3F"
          }}
        >
          {genreName}
        </div>
      );
    });
  }

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  return (
    <div>
      <div className='flex justify-center items-center'>
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
              // Ensure genre exists and matches the current genre filter
              return genreids[movObj.genre_ids?.[0]] === currGenre
            })
            .map((movObj) =>
              <tr style={{ border: "1px solid grey" }} key={movObj.id} className='text-center'>
                <td>
                  <div
                    className="w-[70] h-[105px] bg-contain "
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movObj.poster_path})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                    }}></div>
                  <div style={{ color: "yellow", fontWeight: "bold", fontSize: "10px" }}>{movObj.title}</div>
                </td>
                <td>{movObj.vote_average}</td>
                <td>{movObj.popularity}</td>
                <td>{genreids[movObj.genre_ids?.[0]] || 'Unknown'}</td> {/* Handle missing genre */}
                <td onClick={() => { handleDeleteFromWatchList(movObj.id) }} style={{ cursor: "pointer", color: "red" }}>Remove</td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default WatchList
