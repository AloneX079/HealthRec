import { axiosInstance } from "./axios.js";

export const getBasicRecord = async() => {
    try{
        const {data, status} = await axiosInstance.get('/reco/getbasicinf',{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {}
        })
        if(status != 200){
            throw  new Error("Error while fetching data")
        }
        return {success: true, data: data}
    }
    catch(error){
        return {success: false, message: error.message}
    }
}


