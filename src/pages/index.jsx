import React from 'react'
import Hero from '../components/index_page_components/Hero'
import Header from '../components/index_page_components/Header'
import Card from '../components/index_page_components/Card'
import '../css/shared/global.css'

function IndexPage() {
  const card = []
  for (let i = 0; i <= 10; i++) {
    card.push(
      <div className='p-3'>
        <Card />
      </div>
    )
  }
  return (
    <>
      <Header />
      <Hero />
      {/* Cards */}
      <div className='d-flex flex-wrap p-2 justify-content-center'>{card}</div>
    </>
  )
}

export default IndexPage
