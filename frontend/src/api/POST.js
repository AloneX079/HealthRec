import {axiosInstance} from './axios.js';

export const getPatientRecordDoctor = async (patientid) => {
    try {
      const { bdata, bstatus } = await axiosInstance.post('/reco/getdocbinf', 
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
      const { mdata, mstatus } = await axiosInstance.post('reco/getdocmedhist', 
        {
          patid: patientid
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json"
          }
        }
      )
      const { vdata, vstatus } = await axiosInstance.post('reco/getdocvitals', 
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
      const { idata, istatus } = await axiosInstance.post('/reco/getdocinsinfo', 
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
      const { edata, estatus } = await axiosInstance.post('/reco/getdocemercont', 
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
      const { hdata, hstatus } = await axiosInstance.post('/reco/getdocvishist', 
        {
          patid: patientid
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json"
          }
        }
      )
      const mergedData = {
        ...bdata?.data,
        ...mdata?.data,
        ...vdata?.data,
        ...idata?.data,
        ...edata?.data,
        ...hdata?.data,
      }
      console.log(bdata);
      
      
      return { success: true, mergedData };
    } catch (error) {
        console.error(error.message);
      return { success: false, message: error.message }; 
    }
  };
  