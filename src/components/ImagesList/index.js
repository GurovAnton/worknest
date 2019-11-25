import React, { useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import SelectedImage from '../SelectedImages/index';

function ImagesList(props) {
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo, direction }) => (
      <SelectedImage
        key={key}
        margin={'2px'}
        index={index}
        photo={photo}
        left={left}
        top={top}
        direction={direction}
      />
    ),
    [],
  );
  function columns(containerWidth) {
    let columns = 1;
    if (containerWidth >= 280) columns = 3;
    if (containerWidth >= 500) columns = 4;
    return columns;
  }
  let result;
  if (props.isLoading.get()) {
    result = <div>loading...</div>;
  } else {
    result = (
      <Gallery
        photos={props.imgList}
        renderImage={imageRenderer}
        direction="column"
        targetRowHeight={150}
        columns={columns}
      />
    );
  }
  return <div>{result}</div>;
}

export default ImagesList;
