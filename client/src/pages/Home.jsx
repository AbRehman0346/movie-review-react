import React from "react";
import Header from "../components/index_page_components/Header";
import * as fun from "../functions/general_functions.js";
import * as db from "../services/mongodb.js";
import { useState, useEffect } from "react";

function Home() {
  const [useCards, setCards] = new useState();
  // It generates 10 cards to be displayed on the screen as placeholder.

  const getData = async (filter = null) => {
    let response = await db.get();
    if (filter) {
      for (let key in response) {
        let item = response[key];
        if (!item.title.toLowerCase().includes(filter.toLowerCase())) {
          delete response[key];
        }
      }
    }
    setCards(fun.generateCards(response));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      {/* Hero Image */}
      <div className='background-image'>
        <div className='search-box'>
          <input
            id='home-page-search-text-field'
            className='input'
            type='text'
            placeholder='Search'
          />
          <button
            className='roundedButton'
            onClick={async () => {
              let text = document.getElementById(
                "home-page-search-text-field"
              ).value;
              await getData(text);
            }}
          >
            Search
          </button>
        </div>
      </div>
      {/* Hero Image End */}
      <div className='d-flex flex-wrap p-2 justify-content-center'>
        {useCards}
      </div>
    </>
  );
}

export default Home;
