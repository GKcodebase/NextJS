import Head from 'next/head'
import Link from "next/link";
import {useEffect, useState} from 'react'
import Footer from '../components/Footer'


export default function Home(initialData: any) {
  const [formInputs, setFormInputs] = useState()
  const [searchTerm, setSearchTerm] = useState('cats')
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    setSearchResults(initialData.catGiphys.data)
  }, [initialData])

  const handleInputs = (event: { target: { name: any; value: any; }; }) => {
    let {name, value} = event.target
    setFormInputs({ ...formInputs, [name]: value });
  }

  const search = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`)
    giphys = await giphys.json()
    setSearchResults(giphys.data)
    setSearchTerm(formInputs.searchTerm)
  }

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>Giphy Search App</h1>

      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInputs} type="text" required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <p>Share this search with others:
        
      <Link
            href={`http://localhost:3000/search/${searchTerm}`}
            >
      </Link>
     
        </p>

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
      <Footer/>

    </div>
  )
}

export async function getStaticProps() {
  let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6')
  catGiphys = await catGiphys.json()
  return {props: {catGiphys: catGiphys}}  
}