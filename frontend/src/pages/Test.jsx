import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import QRCode from "react-qr-code";
import useUserContext from "../hooks/useUserContext";
import { getPatientList } from "../api/GET";
import {
  getPatientRecordDoctor,
  getPatientPrescription,
  upPatientPrescription,
} from "../api/POST";
import PatientBasicInfo from "../components/PatientBasicInfo";
import { Plus } from "lucide-react";

function DoctorDash() {
  // const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedItem, setSelectedItem] = useState("Doctor QR");
  const [patientList, setPatientList] = useState([]);
  const [patientRecord, setPatientRecord] = useState({});
  const { user, setUser, loading, setLoading } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isPrescribing, setPrescribing] = useState(false);
  const handlePrescribeToggle = () => setPrescribing(!isPrescribing);
  const handleEditToggle = () => setIsEditing(!isEditing);
  const [patientPrescription, setPatientPrescription] = useState({});
  const [upillness, setIllness] = useState("");
  const [medicine, setMedicine] = useState("");

  const [newMedicalHistoryItem, setNewMedicalHistoryItem] = useState("");
  const [newFamilyMedicalHistoryItem, setNewFamilyMedicalHistoryItem] =
    useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newImmunization, setNewImmunization] = useState("");
  const [newSurgery, setNewSurgery] = useState("");

  const handleAddItem = (array, setArray, value) => {
    if (!value.trim()) return;
    setArray([...array, value.trim()]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };
  const saveChanges = () => {
    // Call API to save changes or handle it locally
    setIsEditing(false);
  };
  const savePrescribeChanges = () => {
    // const payload = {
    //   illness: upillness,
    //   prescription: medicine,
    // };
    // upPatientPrescription(payload);
    setPrescribing(false);
  };

  const fetchPatientList = async () => {
    try {
      setLoading(true);
      const patientListResponse = await getPatientList();
      if (patientListResponse.data.success) {
        const fetchedPatientList = patientListResponse.data.data;
        setPatientList(fetchedPatientList);
        const patientData = {};
        const prescriptions = {};

        for (const patient of fetchedPatientList) {
          const patientRec = await getPatientRecordDoctor(patient.patient);
          if (patientRec.success && patientRec.data) {
            patientData[patient.patient] = patientRec.data.data;
          } else {
            console.error(`Failed to fetch prescription for ${patient.data}`);
          }
        }
        for (const patient of fetchedPatientList) {
          const patientpres = await getPatientPrescription(patient.patient);
          if (patientpres.success && patientpres.data) {
            prescriptions[patient.patient] = patientpres.data;
          } else {
            console.error(
              `Failed to fetch prescription for ${patient.patient}`
            );
          }
        }
        setPatientPrescription(prescriptions);
        setPatientRecord(patientData);
      } else {
        console.error(
          "Failed to fetch patient list:",
          patientListResponse.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching patient list:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPatientList();
    console.log(selectedItem)
  }, []);

  const content = patientList.reduce((acc, patient) => {
    const patientData = patientRecord[patient.patient];
    
    if (patientData) {
      acc[patient.patient] = (
        <div className="p-6 m-4  bg-white rounded-lg shadow-md w-full h-[95%] overflow-y-auto relative text-black">
          <div className="px-4 py-3 flex justify-between mb-5 sticky top-0 bg-green-200/60 backdrop-blur-md rounded-2xl">
            <h2 className="text-3xl font-bold text-green-900">
              {[patient.patientName]}
              {patientData?.bloodGroup}
            </h2>
            </div>
            </div>
          )}

    return acc;
  }, {});

  return (
    <section>
      <div className="h-screen bg-gradient-to-br from-white via-green-300 to-green-600 flex items-center justify-center">
        <div className="w-3/4 h-3/4 mt-10 bg-green-200 rounded-xl shadow-lg flex ">
          <div className="w-1/4 bg-green-300 rounded-l-xl flex flex-col items-start px-5 py-3 gap-4 border-r-2 border-green-500">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Doctor Dashboard
            </h2>
            <ul className="w-full flex flex-col flex-grow gap-2 overflow-auto">
              <li
                onClick={() => setSelectedItem("Doctor QR")}
                className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                  selectedItem === "Doctor QR" ? "bg-green-500 text-white" : ""
                } border-b-2 border-green-400 flex items-center gap-3`}
              >
                Doctor QR
              </li>
              {patientList.map((patient, index) => (
                
                <li
                  key={index}
                  onClick={() => setSelectedItem(patient.patient)}
                  className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                    selectedItem === patient?.patientName
                      ? "bg-green-500 text-white"
                      : ""
                  } border-b-2 border-green-400`}
                >
                  {patient?.patientName}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 p-3 flex items-center justify-center text-green-900">
            {selectedItem === "Doctor QR" ? (
              <div className="text-lg font-medium w-3/4 h-2/4">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  {loading ? (
                    "Loading..."
                  ) : (
                    <QRCode
                      style={{ height: "100%", width: "100%" }}
                      value={user?._id || ""}
                      bgColor={`#bbf7d1`}
                      viewBox={`0 0 256 256`}
                    />
                  )}
                  <button
                    onClick={fetchPatientList}
                    className="mt-6 px-6 py-3 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 duration-300"
                  >
                    Refresh Patient List
                  </button>
                </div>
              </div>
            ) : (
              content[selectedItem]
            )}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default DoctorDash;
