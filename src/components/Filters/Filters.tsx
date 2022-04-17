import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import alphabet from '../../collections/alphabet';
import { maxColsNumber } from '../../stores/maxColsNumber';
import { addUniqueKeys, uniqueKeys } from '../../stores/uniqueKeys';
import { sheet, addSheet } from '../../stores/sheet';
import { initialSheet } from '../../stores/initialSheet';
import arrayByUniqueKeys from '../../helpers/arrayByUniqueKeys';
import Multiselect from 'multiselect-react-dropdown';
import Save from '../Save/Save';

import styles from './Filters.module.sass';

const Filters: React.FC = () => {
  const [selectedColIndex, addSelectedColIndex] = useState<number>();
  const colsNumberStore = useStore(maxColsNumber);
  const uniqueKeysStore = useStore(uniqueKeys);
  const initialSheetStore = useStore(initialSheet);
  const sheetStore = useStore(sheet);

  const onSelectCol = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;
    if (!Boolean(selectValue)) {
      addUniqueKeys([]);
      return;
    }

    const index = alphabet.indexOf(selectValue);
    addSelectedColIndex(index);
    const filteredArray = Array.from(sheetStore, (item) => item[index]).filter((item: string | undefined) => item !== undefined);
    addUniqueKeys(arrayByUniqueKeys(filteredArray));
  };

  const onSelect = (selectedList) => {
    const filteredSheet = initialSheetStore.filter((item: string | undefined[]) => selectedList.includes(item[selectedColIndex]));

    if (selectedList.length) {
      addSheet(filteredSheet);
    } else {
      addSheet(initialSheetStore);
    }
  };

  return (
    <div className={styles.filters}>
      <label className={styles.label}>
        <select className={styles.select} onChange={onSelectCol}>
          <option value=''>Select a col</option>
          {[...Array(colsNumberStore)].map((item, i) => (
            <option key={`oprion-${i}`} value={alphabet[i]}>
              {alphabet[i]}
            </option>
          ))}
        </select>
      </label>
      <Multiselect
        disable={!uniqueKeysStore.length}
        isObject={false}
        onKeyPressFn={function noRefCheck(){}}
        onRemove={onSelect}
        onSearch={function noRefCheck(){}}
        onSelect={onSelect}
        style={{
          searchBox: {
            border: '2px solid rgba(0,0,0, .1)',
            borderRadius: '10px',
            height: '43px',
          }
        }}
        options={uniqueKeysStore}
      />
      <Save />
    </div>
  );
};

export default Filters;
