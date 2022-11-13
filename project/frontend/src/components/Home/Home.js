import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import DisplayGrid from './DisplayGrid';
import "./style.css";
import { BiLogOutCircle } from 'react-icons/bi';
import UserDetails from "../userDetails";

export default function Home() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const [alert, setAlert] = useState(false);
   const [uploaded, setUploaded] = useState(null);
  const handleDelete = async (name) => {
    console.log('Delete ' + name);
    await Axios.delete(`http://localhost:5000/del:${name}`, data,
    {
      onUploadProgress: (data) => {
        console.log(data.loaded , data.total)
        setUploaded(Math.round((data.loaded / data.total) * 100))
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await fetchData();
  };

  const fetchData = async () => {
    await Axios.get('http://localhost:5000')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err, 'it has an error'));
  };
  React.useEffect(() => {
    fetchData();

  }, []);


  const send = async (event) => {
    if (file) {
      Array.from(file).map(async (Singlefile, index) => {
        const data = new FormData();
        
        data.append('testImage', Singlefile);
        
        await Axios.post('http://localhost:5000/', data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        await fetchData();
      });
      setFile(null);
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  };

  return (
    <>
    <br/>
    <br/>
    <br/>
     <a href='/'>
    <button  className='logout btn btn-danger'><BiLogOutCircle /></button>
      
     </a>
     
    <br/>
    <br/>
   
    <div class="row">
  <div class="column1">

  <div className='1App'>
      <div>
        {alert ? (
          <Alert variant='outlined' severity='error'>
            Please select the file !
          </Alert>
        ) : (
          <h1></h1>
        )}
      </div>
      <header className='Home-header'>
        <form action='#'>
          <div className='flex'>
            <label htmlFor='file'>File</label>
            <input
              type='file'
              id='file'
              multiple
              accept='.png'
              onChange={(event) => {
                const file = event.target.files;
                setFile(file);
              }}
            />
             <br />
              {/* progress bar */}
              {uploaded && (
                <div className='progress mt-2'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow={uploaded}
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: `${uploaded}%` }}
                  >
                    {`${uploaded}%`}
                  </div>
                </div>
              )}
    
          </div>
        </form>
        <br/>
        <button onClick={send}  className='send btn btn-danger'>Send</button>
      </header>
    </div>
    <br/>
    <div className='user'>
    <UserDetails />

    </div>
    
  </div>
  <div class="column">
  <div >
  
  <DisplayGrid data={data} handleDelete={handleDelete}></DisplayGrid>
</div>
  </div>
</div>
    

</>
  );
}


