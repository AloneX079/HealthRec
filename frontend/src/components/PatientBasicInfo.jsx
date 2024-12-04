const PatientBasicInfo = ({ label, value }) => {
  return (
    <div className="flex justify-between w-full">
      <span className="text-lg font-medium text-green-800">{label}:</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
};

export default PatientBasicInfo;
