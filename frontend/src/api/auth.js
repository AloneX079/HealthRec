import {axiosInstance} from "./axios.js"

export const login = async(loginInfo) => {
    try{
        const {data,status} = await axiosInstance.post('/user/login',loginInfo)
        if(status != 200){
            throw new Error(data);
        }
        if(status == 200){
            return {success:true,userData:data.data}
        }
    }
    catch(err){
        return {success:false,message:err.response.data.data}
    }
}

export const register = async(loginInfo)=>{
    
    try {
        const { data, status } = await axiosInstance.post(
            "/user/register",
            loginInfo
        );
        console.log(status);
        if (status != 201) {
            throw new Error(data);
        }
        return { success: true, userData: data.data };
    } catch (e) {
        return { success: false, message: e.response.data.data };
    }
}

export const authLogin = async(token)=>{
    try {
        const { data, status } = await axiosInstance.get("/user/get-user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (status == 200) {
            return { success:true, data: data.data};
        }
    } catch (e) {
        return { success: false, message: e.response.data.data };
    }
}


