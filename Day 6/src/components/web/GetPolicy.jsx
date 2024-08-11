// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const GetPolicy = () => {
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [paymentDetails, setPaymentDetails] = useState({
//         cardNumber: '',
//         expiryDate: '',
//         cvv: '',
//     });

//     const plans = [
//         { id: 1, name: 'Basic Plan', price: '₹50/month', coverage: '₹100,000' },
//         { id: 2, name: 'Standard Plan', price: '₹100/month', coverage: '₹200,000' },
//         { id: 3, name: 'Premium Plan', price: '₹200/month', coverage: '₹500,000' },
//     ];

//     const handlePlanSelect = (plan) => {
//         setSelectedPlan(plan);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setPaymentDetails({
//             ...paymentDetails,
//             [name]: value,
//         });
//     };

//     const handlePaymentSubmit = (e) => {
//         e.preventDefault();
//         // Implement payment processing logic here
//         toast.success('Payment successful! Your policy is now active.');
//     };

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {plans.map((plan) => (
//                     <div
//                         key={plan.id}
//                         className={`p-4 border rounded ${selectedPlan?.id === plan.id ? 'border-blue-500' : 'border-gray-300'}`}
//                         onClick={() => handlePlanSelect(plan)}
//                     >
//                         <h3 className="text-xl font-semibold">{plan.name}</h3>
//                         <p>{plan.price}</p>
//                         <p>Coverage: {plan.coverage}</p>
//                     </div>
//                 ))}
//             </div>

//             {selectedPlan && (
//                 <div className="mt-6">
//                     <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
//                     <form onSubmit={handlePaymentSubmit}>
//                         <div className="mb-4">
//                             <label className="block mb-2">Card Number</label>
//                             <input
//                                 type="text"
//                                 name="cardNumber"
//                                 value={paymentDetails.cardNumber}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-2">Expiry Date</label>
//                             <input
//                                 type="text"
//                                 name="expiryDate"
//                                 value={paymentDetails.expiryDate}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-2">CVV</label>
//                             <input
//                                 type="text"
//                                 name="cvv"
//                                 value={paymentDetails.cvv}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                             Pay Now
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GetPolicy;
