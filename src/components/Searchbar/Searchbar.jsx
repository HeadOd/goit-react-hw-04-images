import { Component } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  }

  onChange = (e) => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.warn('Введіть запит, будь ласка!');
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
    e.target.reset();
  }  

  render() {
    return( <header className="searchbar">
      <form className="searchForm" onSubmit={this.onSubmit}>
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
          onChange={this.onChange}
        />
      </form>
    </header>
    )
  }
}