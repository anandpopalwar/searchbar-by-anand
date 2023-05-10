// import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [suggestionList, setSuggestionList] = useState([])
  const [showList, setShowList] = useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      getAPI()
    }, 200)


    return (() => {

      clearTimeout(timer)

    })

  }, [search])

  const getAPI = async () => {
    const json = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${search}`);
    const data = await json.json()
    console.log(data[0], data[1])
    setSuggestionList(data[1])

  }

  return (
    <div className="App">
      <input type='text'
        className='inputBar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => { setShowList(true) }}
      // onBlur={()=>{setShowList(false)}}

      />

      <button className='inputBtn'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg></button>
      {showList && <div className='container '>
        <div type="none" className='ul'>
          {

            suggestionList.map((item) => {
              return (

                <p onClick={() => { setSearch(item) }} key={item
                }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg> {item}</p>
              )

            })
          }
        </div>
        <h2 className='item'></h2>
      </div>

      }

 {
   search.length > 0 &&

    <button onClick={() => setSearch("")} className='cancelBtn' ><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg></button>


      }
    </div>
  );
}

export default App;
