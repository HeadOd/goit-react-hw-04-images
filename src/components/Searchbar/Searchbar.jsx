import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ handleFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = (e) => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.warn('Введіть запит, будь ласка!');
      return;
    }
    handleFormSubmit(inputValue);
    setInputValue('');
    e.target.reset();
  } 

  return( <header className="searchbar">
      <form className="searchForm" onSubmit={onSubmit}>
        <button type="submit" className="searchForm-button">
          <FaSearch /><span className="searchForm-button-label">Search</span>
        </button>

        <input
          name="searchName"
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
    )
}
