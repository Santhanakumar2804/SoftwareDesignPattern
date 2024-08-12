import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { axiosInstance } from '../../services/api';

const fetchUserPolicies = async () => {
  try {
    const response = await axiosInstance.get('/customer-policies/verified');
    return response.data;
  } catch (error) {
    console.error('Error fetching verified policies:', error);
    throw error;
  }
};

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [action, setAction] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchUserPolicies()
      .then(filteredPolicies => {
        setPolicies(filteredPolicies);
      })
      .catch(error => {
        console.error('There was an error fetching the policies!', error);
      });
  }, []);

  useEffect(() => {
    validateForm();
  }, [formValues]);

  const openSheetWithPolicy = (policy, actionType) => {
    setSelectedPolicy(policy);
    setAction(actionType);
    setOpen(true);
    setFormValues({});
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = action === 'Claim'
      ? ['claimReason', 'additionalDetails', 'dateOfIncident']
      : ['cardNumber', 'cname', 'expirydate', 'cvv'];

    requiredFields.forEach(field => {
      if (!formValues[field]) {
        errors[field] = 'This field is required';
      }
    });

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    if (action === 'Claim') {
      const claimData = {
        customerPolicy: {
          policyNo: selectedPolicy.policyNo
        },
        amountPerMonth: selectedPolicy.policyAmount / selectedPolicy.policyDuration,
        claimReason: formValues.claimReason,
        incidentDescription: formValues.additionalDetails,
        dateOfIncident: formValues.dateOfIncident,
        action: false
      };
  
      axiosInstance.post('/claims', claimData)
        .then(response => {
          toast.success('Claim filed successfully');
          setOpen(false);
        })
        .catch(error => {
          toast.error('Error filing claim');
          console.error('Error filing claim:', error);
        });
    } else {
      toast.success("Payment successful", {
        icon: "✔️",
      });
      setOpen(false);
    }
  };

  return (
    <>
        <Card className="shadow-lg rounded-lg p-8 bg-teal-100 text-black">

        <CardHeader className='w-full flex flex-row justify-between items-center mb-4'>
          <CardTitle className="text-3xl font-extrabold">My Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-auto w-full text-left">
            <TableHeader>
              <TableRow className="bg-gray-800">
                <TableHead className="text-white">Policy No</TableHead>
                <TableHead className="text-white">Policy Name</TableHead>
                <TableHead className="text-white">Duration</TableHead>
                <TableHead className="text-white">Holder Name</TableHead>
                <TableHead className="text-white">Aadhar No</TableHead>
                <TableHead className="text-white">PAN No</TableHead>
                <TableHead className="text-white">Nominee</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.length > 0 ? (
                policies.map((policy) => (
                  <TableRow key={policy.policyNo}>
                    <TableCell>{policy.policyNo}</TableCell>
                    <TableCell>{policy.policyName}</TableCell>
                    <TableCell>{policy.policyDuration} Months</TableCell>
                    <TableCell>{policy.policyHolderName}</TableCell>
                    <TableCell>{policy.aadharNo}</TableCell>
                    <TableCell>{policy.panCardNo}</TableCell>
                    <TableCell>{policy.nomineeName}</TableCell>
                    <TableCell>{(policy.policyAmount / policy.policyDuration).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2 bg-indigo-500 text-white hover:bg-indigo-600" onClick={() => openSheetWithPolicy(policy, 'Claim')}>
                        Claim
                      </Button>
                      <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600" onClick={() => openSheetWithPolicy(policy, 'Pay')}>
                        Pay Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="9" className="text-center">No policies available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={() => setOpen(false)}>
        <SheetContent className="rounded-lg p-8 bg-white">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-indigo-700">{action === 'Claim' ? 'Claim Policy' : 'Pay Policy'}</SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
              {action === 'Claim' ? 'Provide details for your claim.' : 'Enter payment details.'}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-6 py-6">
            {selectedPolicy && (
              <>
                <div className="grid grid-cols-4 items-center gap-6">
                  <Label htmlFor="policyNo" className="text-right text-gray-600">
                    Policy No
                  </Label>
                  <Input id="policyNo" value={selectedPolicy.policyNo} disabled className="col-span-3 bg-gray-100" />
                </div>
                <div className="grid grid-cols-4 items-center gap-6">
                  <Label htmlFor="policyName" className="text-right text-gray-600">
                    Policy Name
                  </Label>
                  <Input id="policyName" value={selectedPolicy.policyName} disabled className="col-span-3 bg-gray-100" />
                </div>

                {action === 'Claim' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="claimReason" className="text-right text-gray-600">
                        Claim Reason
                      </Label>
                      <Input
                        id="claimReason"
                        className={`col-span-3 ${formErrors.claimReason ? 'border-red-500' : ''}`}
                        placeholder="Enter reason for claim"
                        value={formValues.claimReason || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.claimReason && <span className="col-span-3 text-red-500">{formErrors.claimReason}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="additionalDetails" className="text-right text-gray-600">
                        Incident Description
                      </Label>
                      <Input
                        id="additionalDetails"
                        className={`col-span-3 ${formErrors.additionalDetails ? 'border-red-500' : ''}`}
                        placeholder="Enter incident description"
                        value={formValues.additionalDetails || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.additionalDetails && <span className="col-span-3 text-red-500">{formErrors.additionalDetails}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="dateOfIncident" className="text-right text-gray-600">
                        Date of Incident
                      </Label>
                      <Input
                        id="dateOfIncident"
                        type="date"
                        className={`col-span-3 ${formErrors.dateOfIncident ? 'border-red-500' : ''}`}
                        value={formValues.dateOfIncident || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.dateOfIncident && <span className="col-span-3 text-red-500">{formErrors.dateOfIncident}</span>}
                    </div>
                  </>
                )}

                {action === 'Pay' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="cardNumber" className="text-right text-gray-600">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        className={`col-span-3 ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                        placeholder="Enter your card number"
                        value={formValues.cardNumber || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.cardNumber && <span className="col-span-3 text-red-500">{formErrors.cardNumber}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="cname" className="text-right text-gray-600">
                        Cardholder Name
                      </Label>
                      <Input
                        id="cname"
                        className={`col-span-3 ${formErrors.cname ? 'border-red-500' : ''}`}
                        placeholder="Enter cardholder's name"
                        value={formValues.cname || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.cname && <span className="col-span-3 text-red-500">{formErrors.cname}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="expirydate" className="text-right text-gray-600">
                        Expiry Date
                      </Label>
                      <Input
                        id="expirydate"
                        type="month"
                        className={`col-span-3 ${formErrors.expirydate ? 'border-red-500' : ''}`}
                        value={formValues.expirydate || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.expirydate && <span className="col-span-3 text-red-500">{formErrors.expirydate}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="cvv" className="text-right text-gray-600">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        className={`col-span-3 ${formErrors.cvv ? 'border-red-500' : ''}`}
                        placeholder="Enter CVV"
                        value={formValues.cvv || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.cvv && <span className="col-span-3 text-red-500">{formErrors.cvv}</span>}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <SheetFooter>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-3 mt-6 ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {action === 'Claim' ? 'Submit Claim' : 'Make Payment'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ToastContainer />
    </>
  );
};

export default UserDashboard;
