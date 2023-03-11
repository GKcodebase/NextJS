import Head from 'next/head'

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Giphy browser</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>My Giphy Search App</h1>
    </div>
  )
}