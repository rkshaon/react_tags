import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import { useGlobalContext } from '../context'

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

  return(
    <section className="countrylist-container">
      <div>
        <button
          className="btn"
          onClick={() => setShowList(!showList)}
        >X</button>
      </div>
      <div>
        <input
          type="text"
          value={search}
          onChange={searchValueUpdate}
        />
        <ul>
          {tempCountries.map((item, index) => {
            return(
              <li key={index}>{item.name}<button onClick={() => addCountryToTag(item.name)}>+</button></li>
            )
          })}
        </ul>
      </div>
      <div>
        {tags.map((item, index) => {
          return <Tag key={index} name={item} />
        })}
      </div>
    </section>
  )
}

export default CountryList;
