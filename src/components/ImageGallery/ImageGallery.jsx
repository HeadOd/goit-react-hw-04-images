import { PropTypes } from "prop-types";
import { toast } from 'react-toastify';

import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ gallery, error, onClick }) => {
  return(<>
    <ul className="gallery">
      { error && toast.error(`${error.message}`, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      })}

      <ImageGalleryItem imgs = {gallery} onClick={onClick}/>
    </ul>
</>
)
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
