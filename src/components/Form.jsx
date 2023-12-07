import React, { useState, useEffect } from 'react'
import listServices from '../services/apiservice'
import { Button, Link } from '@mui/material'
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  TextField,
  Box,
  FilledInput,
  InputAdornment
} from '@mui/material'
import { Label } from '@mui/icons-material';
const Form = () => {
  const navigate = useNavigate()
  const [getList, setList] = useState([])
  const [senddata, setSendData] = useState(false)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [error, setError] = useState(null);

  const apiResp = async () => {
    const resp = await listServices.getApi()

    console.log(resp)

    setList(resp?.data)
  }
  useEffect(() => {
    apiResp()
  }, [])
  console.log("getlist", getList)

  const { id } = useParams();
  console.log("iddd", id)
  const fetchData = async () => {
    try {
      if (id) {
        const response = await listServices.getnotbyid(id);
        // const { title, comment } = response.data;
        console.log(response, "dataa")
        setTitle(response.title)
        setComment(response.comment)
      }
      else {
        setTitle('')
        setComment('')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {


    fetchData();
  }, [id]);


  const sendPostApi = async (e) => {
    e.preventDefault()
    // const dataobj={title,comment}

    //         const d= await listServices.postApi(dataobj)
    //         return d
    //        console.log("succsfully savedd..",d)/
    const dataobj = { title, comment };
    if (dataobj.title !== '' && dataobj.comment !== '') {


      try {
        if (id) {
          console.log(selectedItemId, "selectedItemId")
          await listServices.updateApi(id, dataobj);
          setSelectedItemId(null);

        }

        else {
          await listServices.postApi(dataobj);
        }

        apiResp();
        setSendData(false);
        setTitle('');
        setComment('');
        setError(null);
        navigate('/list');
      } catch (error) {
        console.error("Error sending data:", error);
        setError("Error sending data. Please try again.");
      }
    }
    else {
      console.log("data cannot be empty")
    }
  }



  return (
    <div>

      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '350px',
          margin: ' 100px auto',
          backgroundColor: '#b3d1ff',

        }}

      >
        <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'normal' }} >{id ? "Update Note" : "Add Note"}</h4>
        <TextField
          margin="normal"
          // required
          fullWidth
          id="title"
          label="title"
          name="title"

          sx={{ m: 1, width: '25ch' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='title'
          variant='filled'
          style={{ backgroundColor: 'white', width: 'auto' }}

        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="comment"
          label="Description"
          type="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='description'
          variant='filled'
          style={{ backgroundColor: 'white', width: 'auto' }}
        />
        <Button type='submit' style={{ margin: 15, padding: 8, backgroundColor: id ? "orange" : "#00b300", color: "white" }} onClick={sendPostApi}>{id ? "Update" : "Create"} </Button>
      </Box>
    </div>




  )
}

export default Form
