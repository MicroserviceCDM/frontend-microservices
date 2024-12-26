import React, { useState } from 'react';
import createFileList from 'create-file-list';

const DragAndDrop = ({uploadImage}) => {
  const [files, setFiles] = useState([]);
  const [fileDragging, setFileDragging] = useState(null);
  const [fileDropping, setFileDropping] = useState(null);

  const humanFileSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(createFileList(updatedFiles));
  };

  const handleDrop = (e) => {
    let removed, add;
    let updatedFiles = [...files];

    removed = updatedFiles.splice(fileDragging, 1);
    updatedFiles.splice(fileDropping, 0, ...removed);

    setFiles(createFileList(updatedFiles));

    setFileDropping(null);
    setFileDragging(null);
  };

  const handleDragEnter = (e) => {
    const targetElem = e.target.closest('[draggable]');
    setFileDropping(targetElem.getAttribute('data-index'));
  };

  const handleDragStart = (e) => {
    setFileDragging(
      e.target.closest('[draggable]').getAttribute('data-index')
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  const loadFile = (file) => {
    const preview = document.querySelectorAll('.preview');
    const blobUrl = URL.createObjectURL(file);

    preview.forEach((elem) => {
      elem.onload = () => {
        URL.revokeObjectURL(elem.src); // free memory
      };
    });

    return blobUrl;
  };

  const addFiles = (e) => {
    const updatedFiles = createFileList([...files], [...e.target.files]);
    setFiles(updatedFiles);
    if (updatedFiles.length > 0) {
        uploadImage(updatedFiles[0]);
      }
    // You can perform additional actions here if needed
  };

  return (
    <div className="bg-white dark:bg-gray-600 rounded w-4/5 mt-4">
      <div
        x-data="dataFileDnD()"
        className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded"
      >
        <div
          x-ref="dnd"
          className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
        >
          <input
            accept="*"
            type="file"
            multiple
            className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
            onChange={addFiles}
            onDragOver={() => {
              setFileDropping(true);
            }}
            onDragLeave={() => {
              setFileDropping(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setFileDropping(false);
              handleDrop(e);
            }}
            title=""
          />

          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg
              className="w-6 h-6 mr-1 text-current-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="m-0">
              Drag your files here or click in this area.
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div
            className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6"
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            {Array.from({ length: files.length }).map((_, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none ${
                  fileDragging === index ? 'border-blue-600' : ''
                }`}
                style={{ paddingTop: '100%' }}
                onDragStart={handleDragStart}
                onDragEnd={() => {
                  setFileDragging(null);
                }}
                draggable
                data-index={index}
              >
                <button
                  className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                  type="button"
                  onClick={() => removeFile(index)}
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                {files[index].type.includes('audio/') && (
                  <svg
                    className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                )}
                {files[index].type.includes('application/') ||
                files[index].type === '' ? (
                  <svg
                    className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                ) : null}
                {files[index].type.includes('image/') && (
                  <img
                    className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                    src={loadFile(files[index])}
                    alt={`Preview ${index}`}
                  />
                )}
                {files[index].type.includes('video/') && (
                  <video
                    className="absolute inset-0 object-cover w-full h-full border-4 border-white pointer-events-none preview"
                    src={loadFile(files[index])}
                    type="video/mp4"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                  <span className="w-full font-bold text-gray-900 truncate">
                    {files[index].name}
                  </span>
                  <span className="text-xs text-gray-900">
                    {humanFileSize(files[index].size)}
                  </span>
                </div>

                <div
                  className="absolute inset-0 z-40 transition-colors duration-300"
                  onDragEnter={handleDragEnter}
                  onDragLeave={() => {
                    setFileDropping(null);
                  }}
                  style={{
                    backgroundColor:
                      fileDropping === index && fileDragging !== index
                        ? 'rgba(173, 216, 230, 0.8)'
                        : '',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
