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

  const handleIllnessChange = (e) => {
    setIllness(e.target.value)
  }

  const handleMedicineChange = (e) => {
    setMedicine(e.target.value)
  };
  const saveChanges = () => {
    // Call API to save changes or handle it locally
    setIsEditing(false);
  };
  const savePrescribeChanges = () => {
    let patientid = selectedItem
    const payload = {
      patid: patientid,
      illness: upillness,
      prescription: medicine,
    };
    console.log(payload)
    upPatientPrescription(payload);
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
  }, []);

  const content = patientList.reduce((acc, patient) => {
    const patientData = patientRecord[patient.patient];
    if (patientData) {
      acc[patient.patient] = (
        <div className="p-6 m-4  bg-white rounded-lg shadow-md w-full h-[95%] overflow-y-auto relative text-black">
          <div className="px-4 py-3 flex justify-between mb-5 sticky top-0 bg-green-200/60 backdrop-blur-md rounded-2xl">
            <h2 className="text-3xl font-bold text-green-900">
              {[patient.patientName]}
            </h2>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-green-900">
              Prescribe Medication
            </h2>
            <div className="flex gap-2 ">
              {isPrescribing && (
                <button
                  onClick={savePrescribeChanges}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              )}
              <button
                onClick={handlePrescribeToggle}
                className={`text-white px-4 py-2 rounded  ${
                  isPrescribing
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isPrescribing ? "Cancel" : "Prescribe"}
              </button>
            </div>
          </div>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="text-lg font-medium text-green-800">
                Illness:
              </span>
              {isPrescribing ? (
                <input
                  type="text"
                  name="illness"
                  onChange={handleIllnessChange}
                  className="border rounded border-gray-300 px-2 py-1 w-2/5"
                />
              ) : (
                <span className="text-lg">{}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-green-800">
                Prescription:
              </span>
              {isPrescribing ? (
                <input
                  type="text"
                  name="medicine"
                  onChange={handleMedicineChange}
                  className="border border-gray-300 rounded px-2 py-1 w-2/5"
                />
              ) : (
                <span className="text-lg">{}</span>
              )}
            </div>
          </div>
          <div className="flex justify-between mb-5">
            <h2 className="text-3xl font-bold text-green-900">Demographics</h2>
          </div>
          <div className="flex flex-col items-start gap-3 mb-4">
            <PatientBasicInfo label="Full Name" value={patientData?.fullName} />
            <PatientBasicInfo label="Gender" value={patientData?.gender} />
            <PatientBasicInfo
              label="Blood Group"
              value={patientData?.bloodGroup}
            />
            <PatientBasicInfo
              label="Smoking / Alcohol"
              value={patientData?.smokingAlcohol}
            />
            <PatientBasicInfo
              label="Date of Birth"
              value={patientData?.dateOfBirth}
            />
            <PatientBasicInfo
              label="Phone Number"
              value={patientData?.phoneNumber}
            />
            <PatientBasicInfo label="Address" value={patientData?.address} />
            <PatientBasicInfo
              label="Ethnicity / Race"
              value={patientData?.ethnicityRace}
            />
            <PatientBasicInfo
              label="Marital Status"
              value={patientData?.maritalStatus}
            />
          </div>
          <div className="flex justify-between mb-5">
            <h2 className="text-3xl font-bold text-green-900">Vitals</h2>
            <div className="flex gap-2 ">
              {isEditing && (
                <button
                  onClick={saveChanges}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              )}
              <button
                onClick={handleEditToggle}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
          <div className="flex justify-between flex-col gap-3">
            <PatientBasicInfo
              label="Height (cm)"
              value={patientData?.heightInCm}
              isEditing={false}
            />
            <PatientBasicInfo
              label="Weight (kg)"
              value={patientData?.weightInKg}
              isEditing={false}
            />
            <div className="flex justify-between">
              <span className="text-lg font-medium text-green-800">
                Last Blood Pressure (MmHg):
              </span>
              {isEditing ? (
                <input
                  type="text"
                  name="LastBloodPressureInMmHg"
                  value={patientData?.LastBloodPressureInMmHg}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-2 py-1"
                />
              ) : (
                <span className="text-lg font-semibold">
                  {patientData?.LastBloodPressureInMmHg}
                </span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-green-800 rounded-lg">
                Last Heart Rate (Bpm):
              </span>
              {isEditing ? (
                <input
                  type="text"
                  name="LastHeartRateInBpm"
                  value={patientData?.LastHeartRateInBpm}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span className="text-lg font-semibold">
                  {patientData?.LastHeartRateInBpm}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between my-5">
            <h2 className="text-3xl font-bold text-green-900">
              Patient's Records
            </h2>
          </div>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm w-full">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-green-900">
                Medical History
              </h3>
              <div className="flex w-full flex-wrap gap-3 items-start my-3">
                {patientData.medicalHistory.map((item, index) => (
                  <div
                    key={index}
                    className="text-base mb-2 bg-green-900 text-white rounded-xl font-semibold p-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-2 justify-center items-center">
                <input
                  type="text"
                  value={newMedicalHistoryItem}
                  onChange={(e) => setNewMedicalHistoryItem(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                  placeholder="Add new medical history item"
                />
                <button
                  onClick={() =>
                    handleAddItem(medicalHistory, setMedicalHistory)
                  }
                  className="mt-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                >
                  <Plus />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-green-900">
                Family Medical History
              </h3>
              <div className="flex w-full flex-wrap gap-3 items-start my-3">
                {patientData.familyMedicalHistory.map((item, index) => (
                  <div
                    key={index}
                    className="text-base mb-2 bg-green-900 text-white rounded-xl font-semibold p-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-2 justify-center items-center">
                <input
                  type="text"
                  value={newFamilyMedicalHistoryItem}
                  onChange={(e) =>
                    setNewFamilyMedicalHistoryItem(e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                  placeholder="Add new family medical history item"
                />
                <button
                  onClick={() =>
                    handleAddItem(familyMedicalHistory, setFamilyMedicalHistory)
                  }
                  className="mt-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                >
                  <Plus />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-green-900">
                Allergies
              </h3>
              <div className="flex w-full flex-wrap gap-3 items-start my-3">
                {patientData.allergies.map((item, index) => (
                  <div
                    key={index}
                    className="text-base mb-2 bg-green-900 text-white rounded-xl font-semibold p-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-2 justify-center items-center">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                  placeholder="Add new allergy"
                />
                <button
                  onClick={() => handleAddItem(allergies, setAllergies)}
                  className="mt-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                >
                  <Plus />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-green-900">
                Immunization History
              </h3>
              <div className="flex w-full flex-wrap gap-3 items-start my-3">
                {patientData.immunizationHistory.map((item, index) => (
                  <div
                    key={index}
                    className="text-base mb-2 bg-green-900 text-white rounded-xl font-semibold p-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-2 justify-center items-center">
                <input
                  type="text"
                  value={newImmunization}
                  onChange={(e) => setNewImmunization(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                  placeholder="Add new immunization"
                />
                <button
                  onClick={() =>
                    handleAddItem(immunizationHistory, setImmunizationHistory)
                  }
                  className="mt-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                >
                  <Plus />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-green-900">
                Surgeries Undergone
              </h3>
              <div className="flex w-full flex-wrap gap-3 items-start my-3">
                {patientData.surgeriesUndergone.map((item, index) => (
                  <div
                    key={index}
                    className="text-base mb-2 bg-green-900 text-white rounded-xl font-semibold p-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-2 justify-center items-center">
                <input
                  type="text"
                  value={newSurgery}
                  onChange={(e) => setNewSurgery(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                  placeholder="Add new surgery"
                />
                <button
                  onClick={() =>
                    handleAddItem(surgeriesUndergone, setSurgeriesUndergone)
                  }
                  className="mt-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                >
                  <Plus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between my-5">
            <h2 className="text-3xl font-bold text-green-900">
              Emergency Contacts
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <PatientBasicInfo
              label="Primary Responder Name"
              value={patientData?.primaryrespondername || "N/A"}
            />
            <PatientBasicInfo
              label="Primary Responder Phone"
              value={patientData?.primaryresponderphone || "N/A"}
            />
            <PatientBasicInfo
              label="Secondary Responder Name"
              value={patientData?.secondaryrespondername || "N/A"}
            />
            <PatientBasicInfo
              label="Secondary Responder Phone"
              value={patientData?.secondaryresponderphone || "N/A"}
            />
          </div>
          <div className="flex justify-between my-5">
            <h2 className="text-3xl font-bold text-green-900">
              Insurance Details
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <PatientBasicInfo
              label="Insurance Provider"
              value={patientData?.insuranceProvider || "N/A"}
            />
            <PatientBasicInfo
              label="Insurance Policy Number"
              value={patientData?.insurancePolicyNumber || "N/A"}
            />
          </div>
          <div className="flex justify-between my-5">
            <h2 className="text-3xl font-bold text-green-900">Visit History</h2>
          </div>
          <div className="h-full overflow-y-auto border border-gray-300 rounded-lg p-6">
            {patientPrescription[patient.patient]?.data ? (
              patientPrescription[patient.patient]?.data.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-medium text-green-800">
                    Doctor: <span className="text-gray-800">{item?.doctor}</span>
                  </p>
                  <p className="text-lg font-medium text-green-800">
                    Illness:{" "}
                    <span className="text-gray-800">{item?.illness}</span>
                  </p>
                  <p className="text-lg font-medium text-green-800">
                    Prescription:{" "}
                    <span className="text-gray-800">{item?.prescription}</span>
                  </p>
                  <p className="text-lg font-medium text-green-800">
                    Created At:{" "}
                    <span className="text-gray-800">{item?.createdAt}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No records available.</p>
            )}
          </div>
        </div>
      );
    } else {
      acc[patient.patientName] = (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="text-center text-gray-600">No records available.</p>
        </div>
      );
    }

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
