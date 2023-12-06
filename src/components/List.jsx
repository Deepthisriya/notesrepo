import React, { useState, useEffect } from 'react'
import listServices from '../services/apiservice'
import { useNavigate } from 'react-router-dom';


const List = () => {
    const navigate=useNavigate()
    const [getList, setList] = useState([])
    
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

    
    const updateItem = async (id) => {
        try {
           
            navigate(`/add/${id}`)
        } catch (error) {
            console.error("Error updating item:", error);
            setError("Error updating item. Please try again.");
        }
    };

    const deleteNote = async (id) => {

        const r = await listServices.deleteApi(id)
        window.location.reload();
        console.log(r)

    }
    return (
        <div>
            <h1> Notes Data</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <table   style={{marginTop:"20px"}}>
                    <tr >
                        <th >Title</th>
                        <th>Description</th>
                        <th>Actions</th>


                    </tr>
                    {getList?.map((item) => (
                        <>

                            <tr key={item._id} >
                                <td >{item?.title}</td>
                                <td>{item?.comment}</td>
                                <button onClick={() => updateItem(item._id)} style={{
                                    backgroundColor:'#99ff99',                               
                                    
                                padding:"5px",
                                marginLeft:'2px',
                                
                               
                                }}>
                                    Update
                                </button>
                                
                                <button onClick={() => deleteNote(item._id)} 
                                style={{backgroundColor:' #ff8080',
                                // color:'white',
                                padding:"5px",
                                marginLeft:'5px',
                               
                            }}
                                >Delete</button>

                            </tr>


                        </>
                    ))}
                </table>
                
            </div>
            
        </div>
        
    )
}


export default List
