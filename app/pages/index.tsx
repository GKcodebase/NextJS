import Head from 'next/head'
import {useEffect, useState} from 'react'

export default function Home(initialData: any) {
  const [formInputs, setFormInputs] = useState()
  const [searchTerm, setSearchTerm] = useState('women')
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    setSearchResults(initialData.catGiphys.data)
  }, [initialData])

  const handleInputs = (event: { target: { name: any; value: any } }) => {
    let {name, value} = event.target
    setFormInputs({ ...formInputs, [name]: value });
  }

  const search = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=12`)
    giphys = await giphys.json()
    setSearchResults(giphys.data)
    setSearchTerm(formInputs.searchTerm)
  }

  return (
    <div className='container'>
      <Head>
        <title>giphy browser</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>My Giphy Search Engine</h1>

      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInputs} type="text" required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {searchResults.map((each, index) => {
          return(
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title}/>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export async function getStaticProps() {
  let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=women&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=12')
  catGiphys = await catGiphys.json()
  return {props: {catGiphys: catGiphys}}  
}