import React from 'react';
import './Header.css';

function Header (props) {

  return (
    <header className="header">
      <h1 className="header__title">Посты</h1>
      <div>
        <button type="button" className="header__button" onClick={props.onAddNotes}>+</button>
      </div>
    </header>
  )
}

export default Header;