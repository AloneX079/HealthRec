import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import {
  getBasicRecord,
  getVitals,
  getMedHistory,
  getInsuranceInfo,
  getEmergencyContact,
  getVisitHistory,
} from "../api/GET";
import { upUserDashboard } from "../api/POST";
import useRecContext from "../hooks/useRecContext";
import usePresContext from "../hooks/usePresContext";
import {
  HeartPulse,
  UserRound,
  ClipboardList,
  HeartHandshake,
  Siren,
  Stethoscope,
} from "lucide-react";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("Basic Information");
  const [isEditing, setIsEditing] = useState(false);
  const { record, setRecord } = useRecContext();
  const { Pres, setPres } = usePresContext();
  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };
  const saveChanges = () => {
    console.log(record);
    upUserDashboard(record);
    setIsEditing(false);
  };
  const content = {
    "Basic Information": (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-900">
            Basic Information
          </h2>
          <button
            onClick={handleEditToggle}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Full Name:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={record?.fullName}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.fullName}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Date of Birth:
            </span>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={record?.dateOfBirth}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.dateOfBirth}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Blood Group:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="bloodGroup"
                value={record?.bloodGroup}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.bloodGroup}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Phone Number:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={record?.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.phoneNumber}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">Address:</span>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={record?.address}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.address}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Marital Status:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="maritalStatus"
                value={record?.maritalStatus}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.maritalStatus}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Ethnicity / Race:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="ethnicityRace"
                value={record?.ethnicityRace}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.ethnicityRace}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Smoking / Alcohol:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="smokingAlcohol"
                value={record?.smokingAlcohol}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.smokingAlcohol}</span>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end mt-6">
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    ),
    Vitals: (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-900">Vitals</h2>
          <button
            onClick={handleEditToggle}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Height (cm):
            </span>
            {isEditing ? (
              <input
                type="text"
                name="heightInCm"
                value={record?.heightInCm}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.heightInCm}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Weight (Kg):
            </span>
            {isEditing ? (
              <input
                type="text"
                name="weightInKg"
                value={record?.weightInKg}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.weightInKg}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Last Blood Pressure (MmHg) :
            </span>
            <span className="text-lg">{record?.LastBloodPressureInMmHg}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Last Heart Rate (BPM) :
            </span>
            <span className="text-lg">{record?.LastHeartRateInBpm}</span>
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end mt-6">
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    ),
    "Medical History": (
      <div className="p-6 bg-white rounded-lg shadow-md h-full overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-900">
            Medical History
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-lg font-medium text-green-800 block mb-2">
              Medical Conditions:
            </span>
            <span className="text-lg text-green-700">
              {record?.medicalHistory?.length > 0
                ? record.medicalHistory.join(", ")
                : "No records found."}
            </span>
          </div>

          <div>
            <span className="text-lg font-medium text-green-800 block mb-2">
              Family Medical Conditions:
            </span>
            <span className="text-lg text-green-700">
              {record?.familyMedicalHistory?.length > 0
                ? record.familyMedicalHistory.join(", ")
                : "No records found."}
            </span>
          </div>

          <div>
            <span className="text-lg font-medium text-green-800 block mb-2">
              Allergies:
            </span>
            <span className="text-lg text-green-700">
              {record?.allergies?.length > 0
                ? record.allergies.join(", ")
                : "No allergies found."}
            </span>
          </div>

          <div>
            <span className="text-lg font-medium text-green-800 block mb-2">
              Immunization History:
            </span>
            <span className="text-lg text-green-700">
              {record?.immunizationHistory?.length > 0
                ? record.immunizationHistory.join(", ")
                : "No immunization records found."}
            </span>
          </div>

          <div>
            <span className="text-lg font-medium text-green-800 block mb-2">
              Surgeries Undergone:
            </span>
            <span className="text-lg text-green-700">
              {record?.surgeriesUndergone?.length > 0
                ? record.surgeriesUndergone.join(", ")
                : "No surgeries recorded."}
            </span>
          </div>
        </div>
      </div>
    ),
    "Insurance Information": (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-900">
            Insurance Information
          </h2>
          <button
            onClick={handleEditToggle}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Insurance Provider :
            </span>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={record?.insuranceProvider}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.insuranceProvider}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Insurance Policy Number :
            </span>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={record?.insurancePolicyNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.insurancePolicyNumber}</span>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end mt-6">
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    ),
    "Emergency Contact": (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-900">
            Emergency Contact Information
          </h2>
          <button
            onClick={handleEditToggle}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Responder Name :
            </span>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={record?.emergencyContactPhone[0]?.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">
                {record?.emergencyContactPhone[0]?.name}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Responder Phone :
            </span>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={record?.emergencyContactPhone[0]?.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">
                {record?.emergencyContactPhone[0]?.phone}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Backup Responder Name :
            </span>
            {isEditing ? (
              <input
                type="text"
                name="emergencyContactPhone[1].name"
                value={record?.emergencyContactPhone[1]?.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">
                {record?.emergencyContactPhone[1]?.name}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Backup Responder Phone :
            </span>
            {isEditing ? (
              <input
                type="text"
                name="emergencyContactPhone[1].phone"
                value={record?.emergencyContactPhone[1]?.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">
                {record?.emergencyContactPhone[1]?.phone}
              </span>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end mt-6">
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    ),
    "Visit History": (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-900">
            Visit History
          </h2>
        </div>
        <div className="space-y-4">
          <div
            className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-4"
            style={{ maxHeight: "256px" }}
          >
            {Pres?.map((item, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <p className="text-lg font-medium text-green-800">
                  Doctor: <span className="text-gray-800">{item.doctor}</span>
                </p>
                <p className="text-lg font-medium text-green-800">
                  Illness: <span className="text-gray-800">{item.illness}</span>
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
            ))}
            {Pres?.length === 0 && (
              <p className="text-center text-gray-600">No records available.</p>
            )}
          </div>
        </div>
      </div>
    ),
  };
  useEffect(() => {
    const fetchRecords = async () => {
      const basicresponse = await getBasicRecord();
      const vitalsResponse = await getVitals();
      const medicalHistResponse = await getMedHistory();
      const insuranceResponse = await getInsuranceInfo();
      const emergencyResponse = await getEmergencyContact();
      const visitHistoryResponse = await getVisitHistory();
      const mergedData = {
        ...basicresponse.data.data,
        ...vitalsResponse.data.data,
        ...medicalHistResponse.data.data,
        ...insuranceResponse.data.data,
        ...emergencyResponse.data.data,
      };
      if (basicresponse.success) {
        setRecord(mergedData);
        setPres(visitHistoryResponse.data.data);
      } else {
        console.error("Failed to fetch record:", response.message);
      }
    };
    fetchRecords();
  }, [setRecord]);
  return (
    <section>
      <div className="h-screen bg-gradient-to-br from-white via-green-300 to-green-600 flex items-center justify-center">
        <div className="w-3/4 h-3/4 mt-10 bg-green-200 rounded-xl shadow-lg flex">
          <div className="w-1/4 bg-green-300 rounded-l-xl flex flex-col items-start px-5 py-3 gap-4 border-r-2 border-green-500">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Patient Dashboard
            </h2>
            <ul className="w-full flex flex-col flex-grow">
              <li
                onClick={() => setSelectedItem("Basic Information")}
                className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                  selectedItem === "Basic Information"
                    ? "bg-green-500 text-white"
                    : ""
                } flex items-center gap-3`}
              >
                <UserRound size={50} absoluteStrokeWidth />
                Basic Information
              </li>
              <li
                onClick={() => setSelectedItem("Vitals")}
                className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                  selectedItem === "Vitals" ? "bg-green-500 text-white" : ""
                } border-b-2 border-green-400 flex items-center gap-3`}
              >
                <HeartPulse size={50} absoluteStrokeWidth />
                Vitals
              </li>
              <li
                onClick={() => setSelectedItem("Medical History")}
                className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                  selectedItem === "Medical History"
                    ? "bg-green-500 text-white"
                    : ""
                } border-b-2 border-green-400 flex items-center gap-3`}
              >
                <ClipboardList size={50} absoluteStrokeWidth />
                Medical History
              </li>
              <li
                onClick={() => setSelectedItem("Insurance Information")}
                className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                  selectedItem === "Insurance Information"
                    ? "bg-green-500 text-white"
                    : ""
                } border-b-2 border-green-400 flex items-center gap-3`}
              >
                <HeartHandshake size={50} absoluteStrokeWidth />
                Insurance Information
              </li>
              <li
                onClick={() => setSelectedItem("Emergency Contact")}
                className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                  selectedItem === "Emergency Contact"
                    ? "bg-green-500 text-white"
                    : ""
                } border-b-2 border-green-400 flex items-center gap-3`}
              >
                <Siren size={50} absoluteStrokeWidth />
                Emergency Contact
              </li>
              <li
                onClick={() => setSelectedItem("Visit History")}
                className={`flex items-center gap-3 cursor-pointer justify-start  w-full px-4 py-3 text-lg font-medium duration-300 text-green-800 hover:bg-green-400 hover:text-white rounded-xl 
                                ${
                                  selectedItem === "Visit History"
                                    ? "bg-green-500 text-white"
                                    : ""
                                }`}
              >
                <Stethoscope size={50} absoluteStrokeWidth />
                Visit History
              </li>
            </ul>
          </div>
          <div className=" w-3/4 p-10 flex items-center justify-center text-green-900">
            <div className="text-lg font-medium w-full h-full bg-green-200 p-8 rounded-lg">
              {content[selectedItem]}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Dashboard;
