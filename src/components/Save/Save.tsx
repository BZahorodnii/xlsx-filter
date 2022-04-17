import React, { useState } from 'react';

// import styles from './Filters.module.sass';

const Save: React.FC = () => {

  const onClick = () => {
    window.electron.openDialog('test');
    window.electron.on('on-file-select', (path) => {
      console.log(path)
    })
    // window.api.saveFile('srr');
  };

  return (
    <div>
      <button type='button' id='save' onClick={onClick}>
        Save
      </button>
    </div>
  );
};

export default Save;
