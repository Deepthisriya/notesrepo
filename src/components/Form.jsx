import React, { useState, useEffect } from 'react'
import listServices from '../services/apiservice'
import { Link } from '@mui/material'
import { useParams ,Navigate, useNavigate} from 'react-router-dom';
const Form = () => {
    const navigate=useNavigate()
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
    console.log("iddd",id)
    const fetchData = async () => {
        try {
          if (id) {
            const response = await listServices.getnotbyid(id);
            // const { title, comment } = response.data;
            console.log(response, "dataa")
            setTitle(response.title)
            setComment(response.comment)
          }
          else{
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
    // const updateItem = async (id) => {
    //     try {
    //         const selectedItem = getList.find((item) => item._id === id);
    //         setTitle(selectedItem.title);
    //         setComment(selectedItem.comment);
    //         setSelectedItemId(id);
    //         setSendData(true);
    //         setError(null);
    //     } catch (error) {
    //         console.error("Error updating item:", error);
    //         setError("Error updating item. Please try again.");
    //     }
    // };

    
  return (
    <div>
       <div style={{ backgroundColor: '#e3fcea', padding: 30,  margin: "30px auto auto auto"
 ,width:"300px"  }}>
    <h4 >{ id? "Update Note" :"Add Note"}</h4>
                        <form >
                            <input
                                type='text'
                                name='title'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='title'
                                
                            />
                            <br />
                            <input
                                type='text'
                                name='comment'
                                id='comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='description'
                            />
                            <br />
                            
                            <button type='submit' style={{ margin: 10, padding: 5, backgroundColor:"#95a5ed" ,color:"white"}} onClick={sendPostApi}>{id ? "Update" :"Create"} </button>
                           
                        </form>
                    </div>
    </div>
  )
}

export default Form
