import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, HelpCircle, LogOut } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GetPolicy = ({ onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const plans = [
        { id: 1, name: 'Vehicle Insurance', price: '₹50/month', coverage: '₹100,000' },
        { id: 2, name: 'Home Insurance', price: '₹100/month', coverage: '₹200,000' },
        { id: 3, name: 'Life Insurance', price: '₹2000/month', coverage: '₹500,0000' },
    ];

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value,
        });
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Implement payment processing logic here
        toast.success('Payment successful! Your policy is now active.');
        onClose();
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`p-4 border rounded ${selectedPlan?.id === plan.id ? 'border-blue-500' : 'border-gray-300'}`}
                        onClick={() => handlePlanSelect(plan)}
                    >
                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                        <p>{plan.price}</p>
                        <p>Coverage: {plan.coverage}</p>
                    </div>
                ))}
            </div>

            {selectedPlan && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                    <form onSubmit={handlePaymentSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2">Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Expiry Date</label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">CVV</label>
                            <input
                                type="password"
                                name="cvv"
                                
                                value={paymentDetails.cvv}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Pay Now
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();
// REQ
  const policies = [
    {
      policyNo: "POL001",
      policyName: "Life Insurance",
      planMonths: 12,
      planYears: 1,
      
      amount: "₹50,00,000",
      status: "",
      
    },
    {
      policyNo: "POL002",
      policyName: "Home  Insurance",
      planMonths: 24,
      planYears: 2,
    
      amount: "₹20,00,000",
      status: "",
    },
    {
      policyNo: "POL003",
      policyName: "Vehicle Insurance",
      planMonths: 6,
      planYears: 0,
      amount: "₹1,00,000",
      status: "",
    },
  ];

  const UserLinks = [
    {
      title: 'Dashboard',
      link: '#',
      icon: <LayoutDashboard className='mr-2' />,
      onClick: () => setActiveSection('dashboard'),
    },
    {
      title: 'Get Policy',
      link: '#',
      icon: <FileText className='mr-2' />,
      onClick: () => setActiveSection('getPolicy'),
    },
    {
      title: 'FAQ',
      link: '#',
      icon: <HelpCircle className='mr-2' />,
      onClick: () => setActiveSection('faq'),
    },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-1'>
        <div className='flex flex-col justify-between items-center bg-card text-card-foreground pt-10 shadow-lg border-r border-gray-300 w-[20%]'>
          <div className='w-full flex flex-col items-center'>
            {UserLinks.map((data, index) => (
              <li key={index} className='list-none w-[90%] my-2'>
                <NavLink
                  to={data.link}
                  className='flex items-center w-full px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200'
                  activeClassName='bg-primary text-primary-foreground font-semibold'
                  onClick={data.onClick}
                >
                  {data.icon}
                  {data.title}
                </NavLink>
              </li>
            ))}
          </div>
          <div className='w-full flex flex-col items-center pb-10'>
            <li className='list-none w-[90%] my-2'>
              <button
                onClick={handleLogout}
                className='flex items-center w-full px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200'
              >
                <LogOut className='mr-2' />
                Logout
              </button>
            </li>
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex items-center justify-between bg-card text-card-foreground p-4 shadow-lg border-b border-gray-300'>
            <h1 className='text-xl font-semibold'>User Dashboard</h1>
            {/* <Button onClick={handleLogout}>Logout</Button> */}
          </div>
          <div className='flex-1 p-6'>
            <ToastContainer />
            {activeSection === 'faq' && (
              <div>
                <h2 className='text-2xl font-semibold mb-6'>FAQ</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">What is life insurance?</h3>
                    <p>Life insurance is a contract between an individual and an insurance company, where the insurer provides a lump-sum payment, known as a death benefit, to the beneficiaries upon the insured's death. In exchange, the insured pays premiums regularly.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Why do I need life insurance?</h3>
                    <p>Life insurance provides financial security to your loved ones in the event of your death. It can help cover funeral expenses, debts, and provide income replacement for your family.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">What are the different types of life insurance?</h3>
                    <p>There are several types of life insurance, including term life insurance, whole life insurance, and universal life insurance. Each type has its own features and benefits.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">How much life insurance coverage do I need?</h3>
                    <p>The amount of coverage you need depends on your individual circumstances, including your income, debts, lifestyle, and the financial needs of your beneficiaries.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">How do I choose a life insurance policy?</h3>
                    <p>When choosing a life insurance policy, consider factors such as your financial goals, the needs of your beneficiaries, the type of coverage, and the insurer's reputation and financial stability.</p>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'dashboard' && (
              <>
                <h2 className='text-2xl font-semibold mb-6'>Policies</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {policies.map((policy, index) => (
                    <Card key={index} className='shadow-lg'>
                      <CardHeader>
                        <CardTitle>{policy.policyName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <strong>Policy No:</strong> {policy.policyNo}
                        </p>
                        {/* <p>
                          <strong>Policy Holder Name:</strong> {policy.policyHolderName}
                        </p> */}
                        <p>
                          <strong>Plan Duration:</strong> {policy.planYears} year(s), {policy.planMonths} month(s)
                        </p>
                        {/* <p>
                          <strong>Nominee:</strong> {policy.nominee}
                        </p> */}
                        <p>
                          <strong>Amount:</strong> {policy.amount}
                        </p>
                        <div className='flex justify-between mt-4'>
                          <Button onClick={() => setActiveSection('getPolicy')}>Pay Policy</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
            {activeSection === 'getPolicy' && (
              <GetPolicy onClose={() => setActiveSection('dashboard')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
