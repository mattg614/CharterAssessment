import React from 'react';
import styles from './fileLoader.scss';

const FileLoader = ({ handleSubmit }) => {
  return (
    <div className='file-loader-card'>
      <form className='file-form' onSubmit={handleSubmit}>
        <label>Upload JSON file</label>
        <input type="text" defaultValue={'test-data/dataSet.json'}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default FileLoader;