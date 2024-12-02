import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import QRCode from "react-qr-code";
import useUserContext from "../hooks/useUserContext";
import { getPatientList, getPatientRecordDoctor } from "../api/GET";

function PharmacistDash() {
  const [selectedItem, setSelectedItem] = useState("Doctor QR");
  const [patientList, setPatientList] = useState([]);
  const { user, setUser, loading, setLoading } = useUserContext();
  getPatientRecordDoctor("6738be4faeed09898fda0947");
  const fetchPatientList = async () => {
    try {
      const patientListResponse = await getPatientList();
      if (patientListResponse.data.success) {
        setPatientList(patientListResponse.data.data);
      } else {
        console.error(
          "Failed to fetch patient list:",
          patientListResponse.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching patient list:", error);
    }
  };

  const content = patientList.reduce((acc, patient) => {
    acc[patient.patientName] = "test";
    //   <div className="p-6 bg-white rounded-lg shadow-md">
    //     <div className="flex justify-between items-center mb-6">
    //       <h2 className="text-2xl font-semibold text-green-900">
    //         Basic Information
    //       </h2>
    //     </div>
    //     <div className="space-y-4">
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">
    //           Full Name:
    //         </span>
    //         <span className="text-lg">{record?.fullName}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">
    //           Date of Birth:
    //         </span>
    //         <span className="text-lg">{record?.dateOfBirth}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">
    //           Blood Group:
    //         </span>
    //         <span className="text-lg">{record?.bloodGroup}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">
    //           Phone Number:
    //         </span>
    //         <span className="text-lg">{record?.phoneNumber}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">Address:</span>
    //         <span className="text-lg">{record?.address}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">
    //           Marital Status:
    //         </span>
    //         <span className="text-lg">{record?.maritalStatus}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">
    //           Ethnicity / Race:
    //         </span>
    //         <span className="text-lg">{record?.ethnicityRace}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="text-lg font-medium text-green-800">
    //           Smoking / Alcohol:
    //         </span>
    //         <span className="text-lg">{record?.smokingAlcohol}</span>
    //       </div>
    //     </div>
    //   </div>
    return acc;
  }, {});
  useEffect(() => {
    fetchPatientList();
  }, []);

  return (
    <section>
      <div className="w-screen h-screen bg-gradient-to-br from-white via-green-300 to-green-600 flex items-center justify-center">
        <div className="w-3/4 h-3/4 mt-10 bg-green-200 rounded-xl shadow-lg flex">
          <div className="w-1/4 bg-green-300 rounded-l-xl flex flex-col items-start px-5 py-3 gap-4 border-r-2 border-green-500">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Pharmacist Dashboard
            </h2>
            <ul className="w-full flex flex-col flex-grow gap-2 overflow-auto">
              <li
                onClick={() => setSelectedItem("Doctor QR")}
                className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                  selectedItem === "Doctor QR" ? "bg-green-500 text-white" : ""
                } border-b-2 border-green-400 flex items-center gap-3`}
              >
                Pharmacist QR
              </li>
              {patientList.map((patient, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedItem(patient.patientName)}
                  className={`cursor-pointer px-4 py-3 text-lg font-medium text-green-800 hover:bg-green-400 duration-300 hover:text-white rounded-xl ${
                    selectedItem === patient.patientName
                      ? "bg-green-500 text-white"
                      : ""
                  } border-b-2 border-green-400`}
                >
                  {patient.patientName}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 p-6 flex items-center justify-center text-green-900">
            <div className="text-lg font-medium w-2/4 h-2/4">
              {selectedItem === "Doctor QR" ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  {loading ? (
                    "Loading..."
                  ) : (
                    <QRCode
                      style={{ height: "100%", width: "100%" }}
                      value={user?._id}
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
              ) : (
                content[selectedItem]
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default PharmacistDash;
