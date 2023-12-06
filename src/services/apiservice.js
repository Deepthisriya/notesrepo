import axios from 'axios'

const listServices = {}
const getUrl = '/getnote'
const postRoute = '/postnote'
listServices.getApi = async () => {
    try {
        const resp = await axios.get(getUrl)

        return resp
    } catch (error) {
        console.error("failed to get", error);
        throw error;
    }

}
listServices.postApi = async (data) => {
    try {
        const resp = await axios.post(postRoute, data)
        return resp
    } catch (error) {
        console.error("failed to insert", error);
        throw error;
    }

}

listServices.updateApi = async (id, data) => {
    try {
        const resp = await axios.post(`/updatenote/${id}`, data)
        return resp;
    } catch (error) {
        console.error("Error Updating note:", error);
        throw error;
    }
};

listServices.deleteApi = async (id) => {
    try {
        const resp = await axios.post(`/deletenote/${id}`);
        return resp.data; 
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};

listServices.getnotbyid = async (id) => {
    try {
        const resp = await axios.get(`/getnote/${id}`);
        return resp.data; 
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};

export default listServices

