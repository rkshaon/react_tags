import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import { useGlobalContext } from '../context'
import { BsPlusCircle } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

const CountryList = ({countries}) => {
  const { tags, setTags, showList, setShowList } = useGlobalContext();

  const [tempTags, setTempTags] = useState([]);
  const [search, setSearch] = useState('');
  const [tempCountries, setTempCountries] = useState(countries);

  useEffect(() => {
    let newTempCountries = countries.filter((country) => {
      if (country.name.toLowerCase().includes(search.toLowerCase())) {
        return country
      }
    })
    setTempCountries(newTempCountries);
  }, [search]);

  const addCountryToTag = (country) => {
    console.log(country + ' clicked');
    let newTags = [...tags, country];
    setTags(newTags);
    let newTempTags = [...tempTags, country];
    setTempTags(newTempTags);
  }

  const searchValueUpdate = (e) => {
    setSearch(e.target.value);
  }

  const setCloseEvent = () => {
    setShowList(!showList);
  }

  return(
    <section className="countrylist-container">
      <div>
        <AiOutlineClose
          className="btn btn-close"
          onClick={setCloseEvent}
        >X</AiOutlineClose>
      </div>
      <div className="form-control">
        <input
          type="text"
          value={search}
          onChange={searchValueUpdate}
        />
        <ul>
          {tempCountries.map((item, index) => {
            return(
              <li key={index}>{item.name}<BsPlusCircle className="btn btn-add" onClick={() => addCountryToTag(item.name)}>+</BsPlusCircle></li>
            )
          })}
        </ul>
      </div>
      <div>
        {tempTags.map((item, index) => {
          return <Tag key={index} name={item} />
        })}
      </div>
    </section>
  )
}

export default CountryList;
