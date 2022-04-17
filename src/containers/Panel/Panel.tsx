import React from 'react';
import { useStore } from '@nanostores/react';
import { sheet } from '../../stores/sheet';
import alphabet from '../../collections/alphabet';
import { maxColsNumber } from '../../stores/maxColsNumber';
import ListItem from '../../components/ListItem/ListItem';
import Filters from '../../components/Filters/Filters';

import styles from './Panel.module.sass';

const Panel: React.FC = () => {
  const sheetStore = useStore(sheet);
  const colsNumber = useStore(maxColsNumber);

  return (
    <div className={styles.wrapper}>
      <Filters />
      <div className={styles.listWrapper}>
        <div className={styles.grid}>
          {[...Array(colsNumber)].map((item, i) => {
            return (
              <div
                key={`panel-${i}`}
                className={styles.gridCol}
                style={{ width: `${100 / colsNumber}%` }}
              >
                {alphabet[i]}
              </div>
            );
          })}
        </div>
        {sheetStore.map((item: any[], i) => {
          if (!item.length) return;
          return (
            <ListItem key={`list-${i}`} cols={item} colsNumber={colsNumber} />
          );
        })}
      </div>
    </div>
  );
};

export default Panel;
