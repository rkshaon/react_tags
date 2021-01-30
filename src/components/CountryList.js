import React from 'react';
import { useGlobalContext } from '../context'

const CountryList = ({countries}) => {
  const { tags, setTags, showList, setShowList } = useGlobalContext();

  const addCountryToTag = (country) => {
    console.log(country + ' clicked');
    let newTags = [...tags, country];
    setTags(newTags);
    setShowList(!showList);
    // console.log(tags);
  }

  return(
    <section className="countrylist-container">
      <ul>
        {countries.map((item, index) => {
          return(
            <li key={index}>{item.name}<button onClick={() => addCountryToTag(item.name)}>+</button></li>
          )
        })}
      </ul>
    </section>
  )
}

export default CountryList;
