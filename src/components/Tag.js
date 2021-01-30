import React from 'react';

const Tag = ({name}) => {
  return(
    <section className="tag-container">
      <button className="btn bg-dark">{name}</button>
    </section>
  )
}

export default Tag;
