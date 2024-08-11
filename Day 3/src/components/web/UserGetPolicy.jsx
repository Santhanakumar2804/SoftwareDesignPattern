// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";


// const policies = [
//   { name: 'Term Life Insurance', duration: '240 Months/20 Years', amount: '₹5,00,000' },
//   { name: 'Whole Life Insurance', duration: 'Lifetime', amount: '₹2,50,000' },
//   { name: 'Universal Life Insurance', duration: '360 Months / 30 Years', amount: '₹3,00,000' },
//   { name: 'Variable Life Insurance', duration: '480 Months / 40 Years', amount: '₹2,00,000' },
//   { name: 'Final Expense Insurance', duration: '120 Months / 10 Years', amount: '₹10,000' },
// ];

// const UserGetPolicy = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     PlanName: '',
//     Period: '',
//     Amount: '',
//     PolicyHolderName: '',
//     DateOfBirth: '',
//     AadharCardNo: '',
//     PanCardNo: '',
//     PhoneNumber: '',
//     Address: '',
//     Email: '',
//     NomineeName: '',
//     NomineeAadharCardNo: '',
//     NomineePanCardNo: '',
//     NomineeRelationship: '',
//     cardNo: '',
//     pinNo: '',
//   });
//   const [errors, setErrors] = useState({});

//   const handlePolicyChange = e => {
//     const selectedPolicy = policies.find(policy => policy.name === e.target.value);
//     setFormData(prevData => ({
//       ...prevData,
//       PlanName: selectedPolicy.name,
//       Period: selectedPolicy.duration,
//       Amount: selectedPolicy.amount,
//     }));
//   };

//   const validateStep = () => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!formData.PlanName) newErrors.PlanName = "Please select a policy.";
//       if (!formData.Period) newErrors.Period = "Duration is required.";
//       if (!formData.Amount) newErrors.Amount = "Amount is required.";
//     } else if (step === 2) {
//       const requiredFields = ['PolicyHolderName', 'DateOfBirth', 'AadharCardNo', 'PanCardNo', 'PhoneNumber', 'Address', 'Email'];
//       requiredFields.forEach(field => {
//         if (!formData[field]) {
//           newErrors[field] = `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
//         }
//       });
//     } else if (step === 3) {
//       const requiredFields = ['NomineeName', 'NomineeAadharCardNo', 'NomineePanCardNo', 'NomineeRelationship'];
//       requiredFields.forEach(field => {
//         if (!formData[field]) {
//           newErrors[field] = `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
//         }
//       });
//     } else if (step === 4) {
//       if (!formData.PlanName || !formData.Period || !formData.Amount) {
//         newErrors.checkDetails = "Please check all your details.";
//       }
//     } else if (step === 5) {
//       if (!formData.cardNo) newErrors.cardNo = "Card number is required.";
//       if (!formData.pinNo) newErrors.pinNo = "Pin number is required.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (validateStep()) {
//       setStep(prevStep => prevStep + 1);
//     } else {
//       toast.error("Please fix the errors in the form.");
//     }
//   };

//   const prevStep = () => {
//     setStep(prevStep => prevStep - 1);
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (validateStep()) {
//       toast.success("Policy will be added soon");
//       // Simulate an API call
//       setTimeout(() => {
//         alert("Payment Successful");
//         // Reset the form and go back to step 1
//         setFormData({
//           PlanName: '',
//           Period: '',
//           Amount: '',
//           PolicyHolderName: '',
//           DateOfBirth: '',
//           AadharCardNo: '',
//           PanCardNo: '',
//           PhoneNumber: '',
//           Address: '',
//           Email: '',
//           NomineeName: '',
//           NomineeAadharCardNo: '',
//           NomineePanCardNo: '',
//           NomineeRelationship: '',
//         });
//         setStep(1);
//       }, 1000);
//     } else {
//       toast.error("Please fix the errors in the form.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-light dark:bg-dark">
//       <Card className="p-8 rounded-lg shadow-lg w-full max-w-4xl bg-card text-card-foreground border border-black dark:border-white">
//         <CardHeader>
//           <CardTitle>User Get Policy</CardTitle>
//           <CardDescription>Complete the steps to get your policy</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between mb-8">
//             {['Plan Information', 'Personal Information', 'Nominee Details', 'Check Your Details', 'Payment'].map((label, index) => (
//               <div key={index} className={`flex items-center ${step >= index + 1 ? 'text-primary' : 'text-secondary'}`}>
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= index + 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
//                   {index + 1}
//                 </div>
//                 <span className="ml-2 text-lg font-medium">{label}</span>
//               </div>
//             ))}
//           </div>
//           <form onSubmit={handleSubmit}>
//           {step === 1 && (
//   <div className="grid grid-cols-2 gap-6 mb-6">
//     <div>
//       <label className="block text-black dark:text-white">
//         Select Policy <span className="text-red-500">*</span>
//       </label>
//       <select
//         name="planName"
//         value={formData.PlanName}
//         onChange={handlePolicyChange}
//         className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
//       >
//         <option value="" className="text-black dark:text-white">Select a policy</option>
//         {policies.map((policy, index) => (
//           <option key={index} value={policy.name} className="text-black">
//             {policy.name}
//           </option>
//         ))}
//       </select>
//       {errors.planName && <p className="text-red-500">{errors.planName}</p>}
//     </div>
//     <div>
//       <label className="block text-black dark:text-white">
//         Duration(Month/Year) <span className="text-red-500">*</span>
//       </label>
//       <input
//         type="text"
//         name="Period"
//         value={formData.Period}
//         onChange={handleChange}
//         className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
//         placeholder="Duration"
//         readOnly
//       />
//       {errors.Period && <p className="text-red-500">{errors.Period}</p>}
//     </div>
//     <div>
//       <label className="block text-black dark:text-white">
//         Amount <span className="text-red-500">*</span>
//       </label>
//       <input
//         type="text"
//         name="Amount"
//         value={formData.Amount}
//         onChange={handleChange}
//         className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white"
//         placeholder="Amount"
//         readOnly
//       />
//       {errors.Amount && <p className="text-red-500">{errors.Amount}</p>}
//     </div>
//   </div>
// )}

//             {step === 2 && (
//               <div className="grid grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-black dark:text-white">Policy Holder Name <span className="text-red-500">*</span></label>
//                   <input type="text" name="PolicyHolderName" value={formData.PolicyHolderName} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Policy Holder Name" />
//                   {errors.PolicyHolderName && <p className="text-red-500">{errors.PolicyHolderName}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Date of Birth <span className="text-red-500">*</span></label>
//                   <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
//                   {errors.DateOfBirth && <p className="text-red-500">{errors.DateOfBirth}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Aadhar Card No <span className="text-red-500">*</span></label>
//                   <input type="text" name="AadharCardNo" value={formData.AadharCardNo} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Aadhar Card No" />
//                   {errors.AadharCardNo && <p className="text-red-500">{errors.AadharCardNo}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">PAN Card No <span className="text-red-500">*</span></label>
//                   <input type="text" name="PanCardNo" value={formData.PanCardNo} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="PAN Card No" />
//                   {errors.PanCardNo && <p className="text-red-500">{errors.PanCardNo}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Phone Number <span className="text-red-500">*</span></label>
//                   <input type="text" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Phone Number" />
//                   {errors.PhoneNumber && <p className="text-red-500">{errors.PhoneNumber}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Address <span className="text-red-500">*</span></label>
//                   <input type="text" name="Address" value={formData.Address} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Address" />
//                   {errors.Address && <p className="text-red-500">{errors.Address}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Email <span className="text-red-500">*</span></label>
//                   <input type="Email" name="Email" value={formData.Email} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Email" />
//                   {errors.Email && <p className="text-red-500">{errors.Email}</p>}
//                 </div>
//               </div>
//             )}
//             {step === 3 && (
//               <div className="grid grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-black dark:text-white">Nominee Name <span className="text-red-500">*</span></label>
//                   <input type="text" name="NomineeName" value={formData.NomineeName} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Nominee Name" />
//                   {errors.NomineeName && <p className="text-red-500">{errors.NomineeName}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Nominee Aadhar Card No <span className="text-red-500">*</span></label>
//                   <input type="text" name="NomineeAadharCardNo" value={formData.NomineeAadharCardNo} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Nominee Aadhar Card No" />
//                   {errors.NomineeAadharCardNo && <p className="text-red-500">{errors.NomineeAadharCardNo}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Nominee PAN Card No <span className="text-red-500">*</span></label>
//                   <input type="text" name="NomineePanCardNo" value={formData.NomineePanCardNo} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Nominee PAN Card No" />
//                   {errors.NomineePanCardNo && <p className="text-red-500">{errors.NomineePanCardNo}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-black dark:text-white">Nominee Relationship <span className="text-red-500">*</span></label>
//                   <input type="text" name="NomineeRelationship" value={formData.NomineeRelationship} onChange={handleChange} className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Nominee Relationship" />
//                   {errors.NomineeRelationship && <p className="text-red-500">{errors.NomineeRelationship}</p>}
//                 </div>
//               </div>
//             )}
//             {step === 4 && (
//   <div className="mb-6">
//     <h2 className="text-center text-xl font-semibold text-black dark:text-white">Check Your Details</h2>
//     <Table>
//       <TableCaption>A list of your policy details.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="text-center">Field</TableHead>
//           <TableHead className='text-center'>Value</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody className='text-center'>
//         {Object.keys(formData)
//           .filter(key => key !== 'cardNo' && key !== 'pinNo') // Exclude cardNo and pinNo
//           .map(key => (
//             <TableRow key={key}>
//               <TableCell className="font-medium">{key.replace(/([A-Z])/g, ' $1')}</TableCell>
//               <TableCell>{formData[key]}</TableCell>
//             </TableRow>
//           ))}
//       </TableBody>
//     </Table>
//     {errors.checkDetails && <p className="text-red-500 text-center">{errors.checkDetails}</p>}
//   </div>
// )}


// {step === 5 && (
//   <div className="mb-6">
//     <h2 className="text-xl font-semibold mb-4">Payment</h2>
//     <div className="flex flex-col gap-6">
//       <div>
//         <p className="text-black dark:text-white"><strong>Policy Name:</strong> {formData.PlanName}</p>
//       </div>
//       <div>
//         <p className="text-black dark:text-white"><strong>Month Duration:</strong> {formData.Period}</p>
//       </div>
//       <div>
//         <p className="text-black dark:text-white"><strong>Amount:</strong> {formData.Amount}</p>
//       </div>
//       <div>
//         <label className="block text-black dark:text-white">Card No <span className="text-red-500">*</span></label>
//         <input
//           type="text"
//           name="cardNo"
//           value={formData.cardNo}
//           onChange={handleChange}
//           className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//           placeholder="Card No"
//         />
//       </div>
//       <div>
//         <label className="block text-black dark:text-white">3-digit Pin No <span className="text-red-500">*</span></label>
//         <input
//           type="password"
//           name="pinNo"
//           value={formData.pinNo}
//           onChange={handleChange}
//           className="w-full p-2 mt-1 border border-black dark:border-white rounded bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//           placeholder="3-digit Pin No"
//         />
//       </div>
//     </div>
//   </div>
// )}

//             <div className="flex justify-between mt-8">
//               {step > 1 && <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded">Previous</button>}
//               {step < 5 && <button type="button" onClick={nextStep} className="p-2 bg-blue-500 text-white rounded">Next</button>}
//               {step === 5 && <button type="submit" className="p-2 bg-green-500 text-white rounded">Pay Now</button>}
//             </div>
//           </form>
//         </CardContent>
//         <ToastContainer />
//       </Card>
//     </div>
//   );
// };

// export default UserGetPolicy;
