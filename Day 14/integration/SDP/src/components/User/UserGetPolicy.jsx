import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from '../../services/api'; 
import { authService } from "../../services/auth"; 

const UserGetPolicy = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    PlanName: '',
    Period: '',
    Amount: '',
    PolicyHolderName: '',
    DateOfBirth: '',
    AadharCardNo: '',
    PanCardNo: '',
    PhoneNumber: '',
    Address: '',
    Email: '',
    NomineeName: '',
    NomineeAadharCardNo: '',
    NomineePanCardNo: '',
    NomineeRelationship: '',
    cardNo: '',
    pinNo: '',
  });
  const [errors, setErrors] = useState({});
  const [policyNames, setPolicyNames] = useState([]);
  const [policyId,setPolicyID] = useState(0);

  useEffect(() => {
    
    const fetchPolicyNames = async () => {
      try {
        const response = await axiosInstance.get('/policies/names');
        setPolicyNames(response.data);
      } catch (error) {
        console.error('Error fetching policy names:', error);
      }
    };

    fetchPolicyNames();
  }, []);

  const handlePolicyChange = async (e) => {
    const selectedPolicy = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      PlanName: selectedPolicy,
    }));

    if (selectedPolicy) {
      try {
        const response = await axiosInstance.get(`/policies/details/${selectedPolicy}`);
        const policy = response.data;
        console.log(policy);
        setFormData(prevData => ({
          ...prevData,
          Period: policy.policyDuration,
          Amount: policy.policyAmount,
        }));
        setPolicyID(response.data.policyID);
        
      } catch (error) {
        console.error('Error fetching policy details:', error);
      }
    }
  };
  console.log(policyId);
  
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.PlanName) newErrors.PlanName = "Please select a policy.";
      if (!formData.Period) newErrors.Period = "Duration is required.";
      if (!formData.Amount) newErrors.Amount = "Amount is required.";
    } else if (step === 2) {
      const requiredFields = ['PolicyHolderName', 'DateOfBirth', 'AadharCardNo', 'PanCardNo', 'PhoneNumber', 'Address', 'Email'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          newErrors[field] = `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
        }
      });
    } else if (step === 3) {
      const requiredFields = ['NomineeName', 'NomineeAadharCardNo', 'NomineePanCardNo', 'NomineeRelationship'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          newErrors[field] = `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
        }
      });
    } else if (step === 4) {
      if (!formData.PlanName || !formData.Period || !formData.Amount) {
        newErrors.checkDetails = "Please check all your details.";
      }
    } else if (step === 5) {
      if (!formData.cardNo) newErrors.cardNo = "Card number is required.";
      if (!formData.pinNo) newErrors.pinNo = "Pin number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const requestData = {
        customer: {
          email: authService.getUserEmail(), 
        },
        policy: {
          policyID: policyId,
        },
        policyHolderName: formData.PolicyHolderName,
        dateOfBirth: formData.DateOfBirth,
        aadharNo: formData.AadharCardNo,
        panCardNo: formData.PanCardNo,
        phoneNo: formData.PhoneNumber,
        address: formData.Address,
        nomineeName: formData.NomineeName,
        nomineeAadharNo: formData.NomineeAadharCardNo,
        nomineePanCardNo: formData.NomineePanCardNo,
        nomineeRelationship: formData.NomineeRelationship,
        cardNo: formData.cardNo,
        pinNo: formData.pinNo,
      };
  
      try {
        await axiosInstance.post('/customer-policies', requestData); 
        toast.success("Policy submitted successfully");
        setTimeout(() => {
          alert("Payment Successful");
          setFormData({
            PlanName: '',
            Period: '',
            Amount: '',
            PolicyHolderName: '',
            DateOfBirth: '',
            AadharCardNo: '',
            PanCardNo: '',
            PhoneNumber: '',
            Address: '',
            Email: '',
            NomineeName: '',
            NomineeAadharCardNo: '',
            NomineePanCardNo: '',
            NomineeRelationship: '',
            cardNo: '',
            pinNo: '',
          });
          setStep(1);
        }, 1000);
      } catch (error) {
        toast.error("There was an error submitting your policy.");
        console.error("Error submitting policy:", error);
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light dark:bg-dark">
      <Card className="p-8 rounded-lg shadow-lg w-full max-w-4xl bg-card text-card-foreground border border-black dark:border-white">
        <CardHeader>
          <CardTitle>User Get Policy</CardTitle>
          <CardDescription>Complete the steps to get your policy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-8">
            {['Plan Information', 'Personal Information', 'Nominee Details', 'Check Your Details', 'Payment'].map((label, index) => (
              <div key={index} className={`flex items-center ${step >= index + 1 ? 'text-primary' : 'text-secondary'}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= index + 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {index + 1}
                </div>
                <span className="ml-2 text-lg font-medium">{label}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-black dark:text-white">
                    Select Policy <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="PlanName"
                    value={formData.PlanName}
                    onChange={handlePolicyChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                  >
                    <option value="" className="text-black dark:text-white">Select a policy</option>
                    {policyNames.map((name, index) => (
                      <option key={index} value={name} className="text-black">
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.PlanName && <p className="text-red-500">{errors.PlanName}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">
                    Duration(Month) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="Period"
                    value={formData.Period}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Duration"
                    readOnly
                  />
                  {errors.Period && <p className="text-red-500">{errors.Period}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">
                    Amount ₹<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="Amount"
                    value={formData.Amount}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Amount"
                    readOnly
                  />
                  {errors.Amount && <p className="text-red-500">{errors.Amount}</p>}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-black dark:text-white">Policy Holder Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="PolicyHolderName"
                    value={formData.PolicyHolderName}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Policy Holder Name"
                  />
                  {errors.PolicyHolderName && <p className="text-red-500">{errors.PolicyHolderName}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Date of Birth <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="DateOfBirth"
                    value={formData.DateOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                  />
                  {errors.DateOfBirth && <p className="text-red-500">{errors.DateOfBirth}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Aadhar Card No <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="AadharCardNo"
                    value={formData.AadharCardNo}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Aadhar Card No"
                  />
                  {errors.AadharCardNo && <p className="text-red-500">{errors.AadharCardNo}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Pan Card No <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="PanCardNo"
                    value={formData.PanCardNo}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Pan Card No"
                  />
                  {errors.PanCardNo && <p className="text-red-500">{errors.PanCardNo}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Phone Number"
                  />
                  {errors.PhoneNumber && <p className="text-red-500">{errors.PhoneNumber}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Address"
                  />
                  {errors.Address && <p className="text-red-500">{errors.Address}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Email"
                  />
                  {errors.Email && <p className="text-red-500">{errors.Email}</p>}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-black dark:text-white">Nominee Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="NomineeName"
                    value={formData.NomineeName}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Nominee Name"
                  />
                  {errors.NomineeName && <p className="text-red-500">{errors.NomineeName}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Nominee Aadhar Card No <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="NomineeAadharCardNo"
                    value={formData.NomineeAadharCardNo}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Nominee Aadhar Card No"
                  />
                  {errors.NomineeAadharCardNo && <p className="text-red-500">{errors.NomineeAadharCardNo}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Nominee Pan Card No <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="NomineePanCardNo"
                    value={formData.NomineePanCardNo}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Nominee Pan Card No"
                  />
                  {errors.NomineePanCardNo && <p className="text-red-500">{errors.NomineePanCardNo}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Nominee Relationship <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="NomineeRelationship"
                    value={formData.NomineeRelationship}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Nominee Relationship"
                  />
                  {errors.NomineeRelationship && <p className="text-red-500">{errors.NomineeRelationship}</p>}
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Review Your Details</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {Object.entries(formData).map(([key, value]) => {
          if (key !== 'cardNo' && key !== 'pinNo') {
            return (
              <TableRow key={key}>
                <TableCell>{key.replace(/([A-Z])/g, ' $1')}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          }
          return null;
        })}
                  </TableBody>
                </Table>
                {errors.checkDetails && <p className="text-red-500">{errors.checkDetails}</p>}
              </div>
            )}
            {step === 5 && (
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-black dark:text-white">Card Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="cardNo"
                    value={formData.cardNo}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Card Number"
                  />
                  {errors.cardNo && <p className="text-red-500">{errors.cardNo}</p>}
                </div>
                <div>
                  <label className="block text-black dark:text-white">Pin Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="pinNo"
                    value={formData.pinNo}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
                    placeholder="Pin Number"
                  />
                  {errors.pinNo && <p className="text-red-500">{errors.pinNo}</p>}
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-500 text-white rounded">
                Previous
              </button>
            )}
            {step < 5 ? (
              <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded ml-20">
                Next
              </button>
            ) : (
              <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
                Submit
              </button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserGetPolicy;