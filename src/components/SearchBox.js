import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import CountryList from './CountryList';
import country from '../data';
import { useGlobalContext } from '../context'
import { FiArrowRightCircle } from "react-icons/fi";

const SearchBox = () => {
  const { tags, setTags, showList, setShowList } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState({});
  const [save, setSave] = useState(false);

  useEffect(() => {
    fetchCountriesData();
  }, [search]);

  const fetchCountriesData = () => {
    // here api will be called to fetch data
    setCountries(country);
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

  const searchValueUpdate = (e) => {
    setSearch(e.target.value);
    findCountry(e.target.value);
  }

  const findCountry = (str) => {
    for (var i = 0; i < countries.length; i++) {
      if (str.toLowerCase().includes(countries[i].name.toLowerCase())) {
        let newTags = [...tags, countries[i].name];
        setTags(newTags);
      }
    }
    // console.log(tags);
  }

  const saveData = () => {
    // here api will be called to insert data
    setSave(!save);
  }

  if (save) {
    return(
      <section className="searchbox-container">
        activity saved
      </section>
    )
  }

  return(
    <section className="searchbox-container">
      <form className="searchbox-form" onSubmit={submitHandler}>
        <input
          autoFocus
          type="text"
          value={search}
          onChange={searchValueUpdate}
          placeholder="write your text here"
        />
        {showList ? <CountryList
            countries={countries}
          /> : <div></div>}
        <div>
          {tags.map((item, index) => {
            return <Tag key={index} name={item} />
          })}
          {tags.length>0 ? <div>
              <button className="btn bg-white" onClick={() => setShowList(!showList)}>+ add tag</button>
              <FiArrowRightCircle onClick={saveData}>save</FiArrowRightCircle>
            </div> : <div></div>}
        </div>
      </form>
    </section>
  )
}

export default SearchBox;
