import React, { use, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import './App.css'
import WatchList from './components/WatchList.jsx'
import MovieRecommendation from './components/MovieRecommendation.jsx'
import Movies from './components/Movies.jsx'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useEffect } from 'react'

import { MovieContext } from './context/MovieContext.jsx'

function App() {
  let [watchList, setWatchList] = useState([])
  function handleAddToWatchList(movieObj) {
    for(let i=0;i<watchList.length;i++){
      if(watchList[i].id===movieObj.id){
        alert("Already in WatchList")
        return
      }
    }
    let updatedWatchList=[...watchList, movieObj]
    updatedWatchList.sort((a, b) => {
      return b.vote_average - a.vote_average
    })

    localStorage.setItem("watchList",JSON.stringify(updatedWatchList))
    setWatchList(updatedWatchList)
    console.log(updatedWatchList)
  }
  function handleDeleteFromWatchList(id){
    let updatedWatchList=watchList.filter((movObj) => movObj.id !== id)
    localStorage.setItem("watchList",JSON.stringify(updatedWatchList))
    setWatchList(updatedWatchList)
  }
  useEffect(() => {
    let watchListData=localStorage.getItem("watchList")
    if(!watchListData){
      return
    }
    setWatchList(JSON.parse(watchListData))
  },[])
  return (
    <MovieContext.Provider value={{handleAddToWatchList}}>
    <>
      <BrowserRouter>  
        <Navbar/>
        <Routes>
          <Route path="/" element={<><Movies/></>}></Route>
          <Route path="/WatchList"  element={<WatchList  watchList={watchList} handleDeleteFromWatchList={handleDeleteFromWatchList}/>}></Route>
          <Route path="/recommend" element={<MovieRecommendation/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
    </MovieContext.Provider>
  )
}

export default App
