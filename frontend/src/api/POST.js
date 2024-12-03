import {axiosInstance} from './axios.js';

export const getPatientRecordDoctor = async (patientid) => {
    try {
      const { data, status } = await axiosInstance.post('/reco/getdocpinf', 
        {
          patid: patientid
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json"
          }
        }
      );
      if(status != 200){
        throw  new Error("Error while fetching data")
      }
      return { success: true, data: data };
    } catch (error) {
        console.error(error.message);
      return { success: false, message: error.message }; 
    }
  };

  export const getPatientPrescription = async (patientid) => {
    try {
      const { data, status } = await axiosInstance.post('/reco/getpresphar', 
        {
          patid: patientid
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json"
          }
        }
      );
      if(status != 200){
        throw  new Error("Error while fetching data")
      }
      return { success: true, data: data };
    }
    catch (error) {
        console.error(error.message);
      return { success: false, message: error.message };
    }
  }
  