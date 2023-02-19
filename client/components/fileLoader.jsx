import React from 'react';

const FileLoader = props => {
  const { handleSubmit } = props;

  return (
    <div className='file-loader-card'>
      <form onSubmit={handleSubmit}>
        <label>Upload JSON file</label>
        <input type="text"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default FileLoader;