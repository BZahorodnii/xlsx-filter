import React from 'react';

import styles from './ListItem.module.sass';

interface PanelProps {
  cols: any;
  colsNumber: number;
}

const ListItem: React.FC<PanelProps> = ({ cols, colsNumber }) => {
  return (
    <div className={styles.grid}>
      {[...Array(colsNumber)].map((item: any[], i) => {
        return (
          <div key={`panel-${i}`} className={styles.gridCol} style={{width: `${100/colsNumber}%`}}>
            {[...cols][i]}
          </div>
        );
      })}
    </div>
  );
};

export default ListItem;
