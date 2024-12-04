import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import QRCode from "react-qr-code";
import useUserContext from "../hooks/useUserContext";
import { getPatientList } from "../api/GET";
import { getPatientRecordDoctor, getPatientPrescription } from "../api/POST";

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
      acc[patient.patientName] = (
        <div className="p-6 m-4  bg-white rounded-lg shadow-md w-full h-[95%] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-green-900">
              Prescribe Medication
            </h2>
            <button
              onClick={handlePrescribeToggle}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {isPrescribing ? "Add" : "Prescribe"}
            </button>
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
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 w-3/5"
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
                  name="prescription"
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 w-3/5"
                />
              ) : (
                <span className="text-lg">{}</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-green-900">
              {[patient.patientName]}'s Demographics
            </h2>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Full Name :
            </span>
            <span className="text-lg">{patientData?.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">Gender :</span>
            <span className="text-lg">{patientData?.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Blood Group :
            </span>
            <span className="text-lg">{patientData?.bloodGroup}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Smoking / Alcohol :
            </span>
            <span className="text-lg">{patientData?.smokingAlcohol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Date of Birth :
            </span>
            <span className="text-lg">{patientData?.dateOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Phone Number :
            </span>
            <span className="text-lg">{patientData?.phoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Address :
            </span>
            <span className="text-lg">{patientData?.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Ethnicity / Race :
            </span>
            <span className="text-lg">{patientData?.ethnicityRace}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Marital Status :
            </span>
            <span className="text-lg">{patientData?.maritalStatus}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-green-900">
              {[patient.patientName]}'s Vitals
            </h2>
            <button
              onClick={handleEditToggle}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Height (cm):
            </span>
            <span className="text-lg">{patientData?.heightInCm}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Weight (kg):
            </span>
            <span className="text-lg">{patientData?.weightInKg}</span>
          </div>
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
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">
                {patientData?.LastBloodPressureInMmHg}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Last Heart Rate (Bpm):
            </span>
            {isEditing ? (
              <input
                type="text"
                name="LastHeartRateInBpm"
                value={patientData?.LastHeartRateInBpm}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{patientData?.LastHeartRateInBpm}</span>
            )}
          </div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-green-900">
              {[patient.patientName]}'s Medical History
            </h2>
          </div>
          <div className="flex justify-between">
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-medium text-green-900">
                  Medical History
                </h3>
                {patientData.medicalHistory.map((item, index) => (
                  <div key={index} className="text-lg mb-2">
                    {item}
                  </div>
                ))}
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
                  className="mt-2 text-blue-500"
                >
                  Add Item
                </button>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-green-900">
                  Family Medical History
                </h3>
                {patientData.familyMedicalHistory.map((item, index) => (
                  <div key={index} className="text-lg mb-2">
                    {item}
                  </div>
                ))}
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
                  className="mt-2 text-blue-500"
                >
                  Add Item
                </button>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-green-900">
                  Allergies
                </h3>
                {patientData.allergies.map((item, index) => (
                  <div key={index} className="text-lg mb-2">
                    {item}
                  </div>
                ))}
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                  placeholder="Add new allergy"
                />
                <button
                  onClick={() => handleAddItem(allergies, setAllergies)}
                  className="mt-2 text-blue-500"
                >
                  Add Item
                </button>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-green-900">
                  Immunization History
                </h3>
                {patientData.immunizationHistory.map((item, index) => (
                  <div key={index} className="text-lg mb-2">
                    {item}
                  </div>
                ))}
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
                  className="mt-2 text-blue-500"
                >
                  Add Item
                </button>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-green-900">
                  Surgeries Undergone
                </h3>
                {patientData.surgeriesUndergone.map((item, index) => (
                  <div key={index} className="text-lg mb-2">
                    {item}
                  </div>
                ))}
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
                  className="mt-2 text-blue-500"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-green-900">
              {[patient.patientName]}'s Emergency Contacts
            </h2>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Primary Responder Name :
            </span>
            <span className="text-lg">
              {patientData?.emergencyContactPhone[0]?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Primary Responder Phone :
            </span>
            <span className="text-lg">
              {patientData?.emergencyContactPhone[0]?.phone}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Secondary Responder Name :
            </span>
            <span className="text-lg">
              {patientData?.emergencyContactPhone[1]?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Secondary Responder Phone :
            </span>
            <span className="text-lg">
              {patientData?.emergencyContactPhone[1]?.phone}
            </span>
          </div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-green-900">
              {[patient.patientName]}'s Insurance Details
            </h2>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Insurance Provider :
            </span>
            <span className="text-lg">{patientData?.insuranceProvider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Insurance Policy Number :
            </span>
            <span className="text-lg">
              {patientData?.insurancePolicyNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-green-900">
              {[patient.patientName]}'s Visit History
            </h2>
          </div>
          <div className="h-full overflow-y-auto border border-gray-300 rounded-lg p-6">
            {patientPrescription[patient.patient]?.data ? (
              patientPrescription[patient.patient].data.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-medium text-green-800">
                    Doctor: <span className="text-gray-800">{item.doctor}</span>
                  </p>
                  <p className="text-lg font-medium text-green-800">
                    Illness:{" "}
                    <span className="text-gray-800">{item.illness}</span>
                  </p>
                  <p className="text-lg font-medium text-green-800">
                    Prescription:{" "}
                    <span className="text-gray-800">{item.prescription}</span>
                  </p>
                  <p className="text-lg font-medium text-green-800">
                    Created At:{" "}
                    <span className="text-gray-800">{item.createdAt}</span>
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
                  onClick={() => setSelectedItem(patient.patientName)}
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
