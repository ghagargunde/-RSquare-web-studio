import React from 'react';
export default function DisplayGrid({ data, handleDelete }) {
 


  return (
    <>
      <div class='container'>
        <div class='row row-cols-3'>
          {data.map((singleData) => {
            const base64String = btoa(
              new Uint8Array(singleData.img.data.data).reduce(function (
                data,
                byte
              ) {
                return data + String.fromCharCode(byte);
              },
              '')
            );
            return (
              <div class='col'>
                <img
                  src={`data:image/png;base64,${base64String}`}
                  width='300'
                />
                <br />
                <h6>{singleData.name}</h6>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(singleData._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
