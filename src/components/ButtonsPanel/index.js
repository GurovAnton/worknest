// Core
import React from 'react';
import Button from '../Button';

//Instruments
import { inject, observer } from 'mobx-react';

export const ButtonsPanel = inject('imagesStore')(
  observer(({ imagesStore }) => {
    const { handleReset, handleVerify } = imagesStore;
    return (
      <div className="buttons-wrapper">
        <Button text="reset" onClick={handleReset} />
        <Button text="verify" onClick={handleVerify} />
      </div>
    );
  }),
);
