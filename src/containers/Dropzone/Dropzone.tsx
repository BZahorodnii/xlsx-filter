import React, { useCallback } from 'react';
// import { read, utils, writeFileXLSX } from 'xlsx';
import xlsx from 'node-xlsx';
import { useDropzone } from 'react-dropzone';
import { addSheet } from '../../stores/sheet';
import { rewriteMaxColsNumber } from '../../stores/maxColsNumber';

import styles from './Dropzone.module.sass';

const Dropzone: React.FC = () => {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        const workSheetsFromBuffer = xlsx.parse(binaryStr);
        const data: any[] = workSheetsFromBuffer[0].data;
        
        const maxColsNumber: number = Math.max(...(data.map(item => item.length)));
        rewriteMaxColsNumber(maxColsNumber);
        addSheet(data);

        // Exporting
        // const buffer = xlsx.build([{name: 'mySheetName', data}]);
        // console.log(buffer);

        // const workbook = read(binaryStr);
        // for (var firstKey in workbook.Sheets) break;
        // const sheetNames = workbook.SheetNames;
        // console.log(workbook);

        // const data: string[][] = utils.sheet_to_json(
        //   workbook.Sheets[firstKey],
        //   {
        //     header: 1,
        //   }
        // );
        // addSheet(data);
        // console.log(data);

        // Export file
        // const wopts = { bookType:"xlsx", bookSST:false, type:"array" };
        // let worksheet1 = utils.aoa_to_sheet(data);
        // console.log(worksheet1);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className={styles.wrapper}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </>
  );
};

export default Dropzone;
