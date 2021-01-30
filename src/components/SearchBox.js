import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import CountryList from './CountryList';
import country from '../data';
import { useGlobalContext } from '../context'
import { AiOutlineRightCircle } from "react-icons/ai";

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

  const setTagEvent = () => {
    setShowList(!showList);
  }

  const saveData = () => {
    // here api will be called to insert data
    setSave(!save);
  }

  if (save) {
    return(
      <section className="activity-container">
        <p>
          activity saved
        </p>
      </section>
    )
  }

  return(
    <section className="searchbox-container">
      <form className="searchbox-form" onSubmit={submitHandler}>
        <div className="form-control">
          <input
            autoFocus
            type="text"
            value={search}
            onChange={searchValueUpdate}
            placeholder="write your text here"
          />
        </div>
        {showList ? <CountryList
            countries={countries}
          /> : <div></div>}
        <div>
          {tags.map((item, index) => {
            return <Tag key={index} name={item} />
          })}
          {tags.length>0 ? <div className="">
              <button className="btn bg-white btn-tag" onClick={setTagEvent}>+ add tag</button>
            </div> : <div></div>}
          {tags.length>0 ? <div className="">
              <AiOutlineRightCircle className="btn-save" onClick={saveData}>save</AiOutlineRightCircle>
            </div> : <div></div>}

        </div>
      </form>
    </section>
  )
}

export default SearchBox;
