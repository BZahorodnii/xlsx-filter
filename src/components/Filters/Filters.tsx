import React from 'react';
import { useStore } from '@nanostores/react';
import alphabet from '../../collections/alphabet';
import { maxColsNumber } from '../../stores/maxColsNumber';
import { addUniqueKeys, uniqueKeys } from '../../stores/uniqueKeys';
import { sheet } from '../../stores/sheet';
import arrayByUniqueKeys from '../../helpers/arrayByUniqueKeys';
import Multiselect from 'multiselect-react-dropdown';

import styles from './Filters.module.sass';

interface FiltersProps {
  // onSelectCol: () => void;
}

const Filters: React.FC<FiltersProps> = () => {
  const colsNumber = useStore(maxColsNumber);
  const uniqueKeysStore = useStore(uniqueKeys);
  const sheetArray = useStore(sheet);

  const onSelectCol = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = alphabet.indexOf(event.target.value);
    if (!index) {
      addUniqueKeys([]);
      return;
    }
    const filteredArray = Array.from(sheetArray, (item) => item[index]).filter((item: string | undefined) => item !== undefined);
    addUniqueKeys(arrayByUniqueKeys(filteredArray));
  };

  const onSelect = (selectedList) => {
    // TODO
  };

  return (
    <div className={styles.filters}>
      <label className={styles.label}>
        <select className={styles.select} onChange={onSelectCol}>
          <option value=''>Select a col</option>
          {[...Array(colsNumber)].map((item, i) => (
            <option key={`oprion-${i}`} value={alphabet[i]}>
              {alphabet[i]}
            </option>
          ))}
        </select>
      </label>
      <Multiselect
        isObject={false}
        onKeyPressFn={function noRefCheck(){}}
        onRemove={onSelect}
        onSearch={function noRefCheck(){}}
        onSelect={onSelect}
        style={{
          searchBox: {
            border: '2px solid rgba(0,0,0, .1)',
            'border-radius': '10px',
            height: '43px',
          }
        }}
        options={uniqueKeysStore}
      />
    </div>
  );
};

export default Filters;
