import React, { useState, useEffect } from "react";
import { getPendingResult, updatePendingResult } from "../api/POST";
import { Plus } from "lucide-react";

function PrescDropDown({ patid }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textInput, setTextInput] = useState("");

  const fetchOptions = async () => {
    try {
      setLoading(true);
      const response = await getPendingResult(patid);
      //   console.log(response);
      if (response && response.data.data && Array.isArray(response.data.data)) {
        setOptions(
          response.data.data.map((item) => ({
            value: item._id,
            label: `${item.prescribedTest}-${item.createdAt}`,
          }))
        );
      } else {
        setOptions([]);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch options.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patid) {
      fetchOptions();
    } else {
      setError("Patient ID is missing.");
      setLoading(false);
    }
  }, [patid]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedOption || !textInput) {
      setError("Please select an option and enter text.");
      return;
    }
    try {
      const data = {
        presid: selectedOption,
        result: textInput,
      };

      const response = await updatePendingResult(data);
    } catch (err) {
      console.error("Error posting data:", err);
      setError("An error occurred while posting data.");
    }
  };
  if (loading) {
    return <p>Loading options...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-green-800">
            Prescribed Test:
          </span>
          <select
            value={selectedOption}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs mt-2"
          >
            <option disabled>Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          <input
            type="text"
            value={textInput}
            onChange={handleTextChange}
            placeholder="Enter Test Results"
            className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          >
            <Plus />
          </button>
        </div>
      </div>
    </>
  );
}

export default PrescDropDown;
