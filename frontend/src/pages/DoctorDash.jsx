import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import QRCode from "react-qr-code";
import useUserContext from "../hooks/useUserContext";
import { getPatientList } from "../api/GET";

function DoctorDash() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedItem, setSelectedItem] = useState("Doctor QR");
  const [patientList, setPatientList] = useState([]);
  const { user, setUser, loading, setLoading } = useUserContext();

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
  useEffect(() => {
    fetchPatientList();
  }, []);

  return (
    <section>
      <div className="w-screen h-screen bg-gradient-to-br from-white via-green-300 to-green-600 flex items-center justify-center">
        <div className="w-3/4 h-3/4 mt-10 bg-green-200 rounded-xl shadow-lg flex">
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
              {loading ? (
                "Loading..."
              ) : (
                <QRCode
                  style={{ height: "100%", width: "100%" }}
                  value={user._id}
                  bgColor={`#bbf7d1`}
                  viewBox={`0 0 256 256`}
                />
              )}
              <button
                onClick={fetchPatientList}
                className="mt-6 ml-40 px-6 py-3 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 duration-300"
              >
                Refresh Patient List
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default DoctorDash;
