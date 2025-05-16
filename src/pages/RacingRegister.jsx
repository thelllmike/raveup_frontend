import { useState } from "react";
import { FaEye, FaEyeSlash, FaUpload, FaCheckCircle } from "react-icons/fa";
import ApiService from "../ApiService";
import { setGlobalRacerId, getGlobalRacerId } from "../GlobalVariable";

export default function RacerRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    racingLicenseNumber: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    racerType: "",
    racingTeam: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "nationalIdFile") {
      setSelectedFile(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (currentStep === 1) {
        const racer = await ApiService.createRacer({
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          nationality: formData.nationality,
          email: formData.email,
          phone: formData.phoneNumber,
          password: formData.password,
          racer_type: formData.racerType,
          racing_team: formData.racingTeam
        });
        setGlobalRacerId(racer.id);
        setCurrentStep(2);
        return;
      }

      const racerId = getGlobalRacerId();

      if (selectedFile) {
        await ApiService.uploadDocument(selectedFile, racerId, "national_id");
      }

      await ApiService.createContact({
        contact_name: formData.emergencyContactName,
        relationship: formData.emergencyContactRelationship,
        contact_phone: formData.emergencyContactPhone,
        racer_id: racerId
      });

      setFormSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-end mb-6 items-center">
      <div className="font-bold">
        STEP {currentStep} FROM 2
        <div className="flex gap-1 mt-1">
          <div className={`h-1 w-8 rounded ${currentStep >= 1 ? "bg-red-600" : "bg-gray-300"}`} />
          <div className={`h-1 w-8 rounded ${currentStep >= 2 ? "bg-red-600" : "bg-gray-300"}`} />
        </div>
      </div>
    </div>
  );

  if (formSubmitted) {
    return (
      <div className="max-w-4xl mx-auto my-20">
        <div className="p-3">
          <h1 className="bg-success text-3xl inline-block font-bold px-4 py-4">
            REGISTRATION SUBMITTED!
          </h1>
        </div>
        <div className="py-16 flex flex-col items-center">
          <div className="bg-blue-50 w-64 h-64 rounded-full flex items-center justify-center mb-8">
            <img src="./register-img.png" alt="Checkered flag" className="mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-center">YEY! YOU HAVE REGISTERED AS A RACER</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-20">
      <h1 className="header-title">CREATE YOUR RACER PROFILE</h1>
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">PERSONAL DETAILS</h2>
                <StepIndicator />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="firstName" placeholder="FIRST NAME" className="w-full p-4 rounded-md bg-gray-100" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="LAST NAME" className="w-full p-4 rounded-md bg-gray-100" value={formData.lastName} onChange={handleChange} required />
                <input type="date" name="dateOfBirth" className="w-full p-4 rounded-md bg-gray-100" value={formData.dateOfBirth} onChange={handleChange} required />
                <input type="text" name="nationality" placeholder="NATIONALITY" className="w-full p-4 rounded-md bg-gray-100" value={formData.nationality} onChange={handleChange} required />
                <input type="email" name="email" placeholder="EMAIL" className="w-full p-4 rounded-md bg-gray-100" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phoneNumber" placeholder="PHONE NUMBER" className="w-full p-4 rounded-md bg-gray-100" value={formData.phoneNumber} onChange={handleChange} required />
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="PASSWORD" className="w-full p-4 rounded-md bg-gray-100" value={formData.password} onChange={handleChange} required />
                  <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="RE-ENTER PASSWORD" className="w-full p-4 rounded-md bg-gray-100" value={formData.confirmPassword} onChange={handleChange} required />
                  <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                <select name="racerType" className="w-full p-4 rounded-md bg-gray-100" value={formData.racerType} onChange={handleChange} required>
                  <option value="">RACER TYPE</option>
                  <option value="amateur">Amateur</option>
                  <option value="semi-pro">Semi-Pro</option>
                  <option value="professional">Professional</option>
                  <option value="veteran">Veteran</option>
                </select>
                <input type="text" name="racingTeam" placeholder="RACING TEAM (OPTIONAL)" className="w-full p-4 rounded-md bg-gray-100" value={formData.racingTeam} onChange={handleChange} />
              </div>
              <div className="mt-10">
                <button type="submit" className="btn-primary w-full">CREATE RACER</button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">EMERGENCY CONTACT & DOCUMENT</h2>
                <StepIndicator />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="emergencyContactName" placeholder="EMERGENCY CONTACT NAME" className="w-full p-4 rounded-md bg-gray-100" value={formData.emergencyContactName} onChange={handleChange} required />
                <select name="emergencyContactRelationship" className="w-full p-4 rounded-md bg-gray-100" value={formData.emergencyContactRelationship} onChange={handleChange} required>
                  <option value="">RELATIONSHIP</option>
                  <option value="parent">Parent</option>
                  <option value="spouse">Spouse</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
                <input type="tel" name="emergencyContactPhone" placeholder="CONTACT PHONE" className="w-full p-4 rounded-md bg-gray-100" value={formData.emergencyContactPhone} onChange={handleChange} required />
                <input type="file" name="nationalIdFile" accept="image/*,.pdf" className="w-full p-4 rounded-md bg-white" onChange={handleChange} required />
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4">
                <button type="button" onClick={handleBack} className="btn-back w-full">BACK</button>
                <button type="submit" className="btn-primary w-full">SUBMIT</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}