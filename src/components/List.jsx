import React, { useState, useEffect } from 'react'
import listServices from '../services/apiservice'
import { useNavigate } from 'react-router-dom';
import {
Table,
TableBody,
TableContainer,
TableCell,
TableHead,
TableRow,
Paper,
Button,
Typography


} from '@mui/material'
import { EditRounded, DeleteOutlined } from '@mui/icons-material'
const List = () => {
    const navigate = useNavigate()
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
            <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}> Notes Data</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Update</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getList?.map((item) => (
                                <TableRow
                                    key={item._id}
                                >
                                    <TableCell >
                                        {item.title}
                                    </TableCell>
                                    <TableCell >{item.comment}</TableCell>

                                    <TableCell > <EditRounded onClick={() => updateItem(item._id)} style={{ color: '#668cff' }} /> </TableCell>
                                    <TableCell> <DeleteOutlined onClick={() => deleteNote(item._id)} style={{ color: '#ff8080' }} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </div>

    )
}


export default List
