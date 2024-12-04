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

export const upUserDashboard = async(record) => {
  try{
    const { data, status } = await axiosInstance.post('/reco/upbasicinf', {
      fullName:record.fullName,
      fullName: record.fullName,
      dateOfBirth: record.dateOfBirth,
      gender: record.gender ,
      bloodGroup: record.bloodGroup ,
      phoneNumber: record.phoneNumber,
      address: record.address ,
      maritalStatus: record.maritalStatus,
      ethnicityRace: record.ethnicityRace,
      smokingAlcohol: record.smokingAlcohol,
      insuranceProvider: record.insuranceProvider,
      insurancePolicyNumber: record.insurancePolicyNumber,
      heightInCm: record.heightInCm,
      weightInKg: record.weightInKg,
      primaryrespondername: record.primaryrespondername,
      primaryresponderphone: record.primaryresponderphone,
      secondaryrespondername: record.secondaryrespondername,
      secondaryresponderphone: record.secondaryresponderphone
    },
    {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json"
      }
    });
    if(status != 200){
      throw  new Error("Error while sending data data")
    }
    return { success: true, data: data };
    }
    catch(error){
      console.error(error.message);
    return { success: false, message: error.message };
  }
}

  