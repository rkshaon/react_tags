import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import CountryList from './CountryList';
import country from '../data';
import { useGlobalContext } from '../context'

const SearchBox = () => {
  const { tags, setTags, showList, setShowList } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState({});

  useEffect(() => {
    setCountries(country);
    // console.log(countries);
  }, []);

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
          {tags.length>0 ? <button className="btn bg-white" onClick={() => setShowList(!showList)}>+ add tag</button> : <div></div>}
        </div>
      </form>
    </section>
  )
}

export default SearchBox;
