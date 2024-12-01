import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import { getBasicRecord } from "../api/GET";
import useRecContext from "../hooks/useRecContext";
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
  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    // Call API to save changes or handle it locally
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
              Maritial Status:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="maritialStatus"
                value={record?.maritialStatus}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.maritialStatus}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-green-800">
              Ethinicity / Race:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="ethinicityRace"
                value={record?.ethinicityRace}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-3/5"
              />
            ) : (
              <span className="text-lg">{record?.ethinicityRace}</span>
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
    Vitals:
      "This section will display the patient's vitals like blood pressure, temperature, etc.",
    "Medical History":
      "This section will display medical history of the patient.",
    "Insurance Information": "This section will display insurance information.",
    "Emergency Contact": "This section will display emergency contact details.",
    "Visit History":
      "This section will display visit history including past appointments, diagnoses, etc.",
  };
  useEffect(() => {
    const fetchBasicRecord = async () => {
      const response = await getBasicRecord();
      if (response.success) {
        setRecord(response.data.data);
      } else {
        console.error("Failed to fetch record:", response.message);
      }
    };
    fetchBasicRecord();
  }, [setRecord]);
  return (
    <section>
      <div className="w-screen h-screen bg-gradient-to-br from-white via-green-300 to-green-600 flex items-center justify-center">
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
