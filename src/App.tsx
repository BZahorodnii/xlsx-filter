import React from 'react';
import { useStore } from '@nanostores/react';
import { sheet } from './stores/sheet';
import Dropzone from './containers/Dropzone/Dropzone';
import Panel from './containers/Panel/Panel';

import styles from './App.module.sass';

function App() {
  const sheetList = useStore(sheet);

  return (
    <div className={styles.app}>
      {sheetList.length ? <Panel /> : <Dropzone />}
    </div>
  );
}

export default App;
