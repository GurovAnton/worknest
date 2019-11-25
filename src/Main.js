//Core
import React, { useEffect } from 'react';

//Components
import Header from './components/Header';
import ImagesList from './components/ImagesList';
import { ButtonsPanel } from './components/ButtonsPanel';
import { PortalPopup } from './components/Portal';

//Instruments
import { inject, observer } from 'mobx-react';
import constants from './constants/constants';
import './styles/index.scss';

export const Main = inject('imagesStore')(
  observer(({ imagesStore }) => {
    const {
      isLoading,
      imagesList,
      getImgList,
      showPopUp: { text, value },
      togglePopUp,
    } = imagesStore;
    useEffect(() => {
      (async () => {
        await getImgList();
      })();
      const cleanup = () => {};
      return cleanup;
    }, [getImgList]);
    return (
      <>
        <div className="veryfication-form">
          <div className="veryfication-form-wrapper">
            <Header topic={constants.TOPIC} />
            <ImagesList
              isLoading={isLoading}
              imgList={imagesList.get('images')}
            />
            <ButtonsPanel />
          </div>
        </div>
        <PortalPopup text={text} value={value} onClick={togglePopUp} />
      </>
    );
  }),
);
