import {axiosInstance} from './axios.js';

export const getPatientRecordDoctor = async (patientid) => {
    try {
      const { data, status } = await axiosInstance.post('/reco/getdocbinf', 
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
      return { success: true, data };
    } catch (error) {
        console.error(error.message);
      return { success: false, message: error.message }; 
    }
  };
  