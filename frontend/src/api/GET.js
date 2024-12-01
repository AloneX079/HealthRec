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

export const getVitals = async() => {
    try{
        const {data, status} = await axiosInstance.get('/reco/getvitals',{
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

export const getMedHistory = async() => {
    try{
        const {data, status} = await axiosInstance.get('/reco/getmedhist',{
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

export const getInsuranceInfo = async() => {
    try{
        const {data, status} = await axiosInstance.get('/reco/getinsinfo',{
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

export const getEmergencyContact = async() => {
    try{
        const {data, status} = await axiosInstance.get('/reco/getemercont',{
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

export const getVisitHistory = async() => {
    try{
        const {data, status} = await axiosInstance.get('/reco/getvishist',{
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
