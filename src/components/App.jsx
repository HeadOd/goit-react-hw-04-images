import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { URL, params } from "./API/API";
import { BtnLoadMore } from "./btnLoadMore/btnLoadMore";

export class App extends Component {
  state = {
    inputValue: '',
    page: 0,
    showModal: false,
    bigImg: '',
    isLoading: false,
    error: null,
    gallery: [],
    buttonHide: 0,
  }

  async componentDidUpdate(prevProps, prevState) { 
    if (prevState.inputValue !== this.state.inputValue) {
      this.setState({ gallery: []})
    }
    
    if (prevState.inputValue !== this.state.inputValue || prevState.page !== this.state.page) {
      try {
        this.setState({ isLoading: true});
        const response = await axios.get(`${URL}${params}${this.state.page}&q=${this.state.inputValue}`);
        this.setState(({gallery}) => ({ gallery : [...gallery, ...response.data.hits]}));
        const numberPageWhenButtonHide = Math.ceil(response.data.totalHits / 12);
        this.setState({ buttonHide: numberPageWhenButtonHide });

        if(response.data.hits.length === 0) {
          this.setState({ gallery : []});
          toast.info(`За цим запитом нічого не знайдено!`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }  
    }
  }

  LoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }

  handleFormSubmit = inputValue => {
    this.setState({ inputValue, page: 1 });
  }

  onClick = (e) => {
    const bigImg = e.target.id;
    this.setState({ bigImg });
    this.toggleModal();
  }

  render() {
    const { gallery, isLoading, showModal, bigImg, error, buttonHide, page } = this.state;

    return <>
      <Searchbar onSubmit={this.handleFormSubmit}/>
      { gallery.length > 1 && <ImageGallery 
        onClick={this.onClick}
        gallery={gallery}
        error={error}
      />}
    
      {showModal && <Modal 
      bigImg={bigImg}
      onClose={this.toggleModal}/>}   

      <div className='container'>
        { gallery.length > 11 && page < buttonHide && <BtnLoadMore onClick={this.LoadMore}/>}   
        { isLoading && <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#4fa94d" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}/>
        }
        
      <ToastContainer position="top-right"
        autoClose={3000} theme="dark"/>
      </div>
    </>
    
  }
};
