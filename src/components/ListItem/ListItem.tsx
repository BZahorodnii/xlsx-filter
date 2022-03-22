import React from 'react';

import styles from './ListItem.module.sass';

interface PanelProps {
  cols: any;
  colsNumber: number;
}

const ListItem: React.FC<PanelProps> = ({ cols, colsNumber }) => {
  const emptyKeyChecker = () => cols.join('±').split('±');

  return (
    <div className={styles.grid}>
      {emptyKeyChecker().map((item: any[], i) => {
        return (
          <div key={`panel-${i}`} className={styles.gridCol} style={{width: `${100/colsNumber}%`}}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default ListItem;
