import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { URL, params } from "./API/API";
import { BtnLoadMore } from "./btnLoadMore/btnLoadMore";

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [buttonHide, setButtonHide] = useState(0);


  useEffect(() => {
    console.log(inputValue);
    setGallery([]);
  }, [inputValue])

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    const fetchPhoto = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(`${URL}${params}${page}&q=${inputValue}`);
        setGallery([...gallery, ...response.data.hits]);
        const numberPageWhenButtonHide = Math.ceil(response.data.totalHits / 12);
        setButtonHide(numberPageWhenButtonHide);

        if(response.data.hits.length === 0) {
          setGallery([]);
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
        setError(error);
      } finally {
        setIsLoading(false);
      }  
    }
    fetchPhoto();
  }, [inputValue, page]);

  const handleFormSubmit = (searchValue) => {
    setInputValue(searchValue);
    setPage(1);
  }

  const onClick = (e) => {
    const bigImgId = e.target.id;
    setBigImg(bigImgId);
    toggleModal();
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const LoadMore = () => {
    setPage(page + 1);
  }

  return <>
    <Searchbar 
    handleFormSubmit={handleFormSubmit}
    />
    { gallery.length > 1 && <ImageGallery 
      onClick={onClick}
      gallery={gallery}
      error={error}
    />}

    {showModal && <Modal 
    bigImg={bigImg}
    onClose={toggleModal}
    />}   

    <div className='container'>
      { gallery.length > 11 && page < buttonHide && <BtnLoadMore onClick={LoadMore}/>}   
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
