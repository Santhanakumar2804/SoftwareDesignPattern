import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance, fetchPolicies } from '../../services/api'; // Import axiosInstance and fetchPolicies

const AdminUsers = () => {
  const [open, setOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Fetch policies on component mount
    fetchPoliciesList();
  }, []);

  const fetchPoliciesList = () => {
    fetchPolicies()
      .then(response => {
        setPolicies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the policies!', error);
      });
  };

  const handleAccept = (policyNo) => {
    axiosInstance.put(`/customer-policies/${policyNo}/action`, { action: true })
      .then(() => {
        setPolicies(policies.map(policy =>
          policy.policyNo === policyNo ? { ...policy, status: "Accepted" } : policy
        ));
        toast.success(`Policy ${policyNo} accepted`);
        setOpen(false);
      })
      .catch(error => {
        console.error('There was an error accepting the policy!', error);
        toast.error('Failed to accept policy');
      });
  };

  const handleDeny = (policyNo) => {
    if (window.confirm(`Are you sure you want to deny policy ${policyNo}?`)) {
      axiosInstance.delete(`/customer-policies/${policyNo}`)
        .then(() => {
          setPolicies(policies.filter(policy => policy.policyNo !== policyNo));
          toast.error(`Policy ${policyNo} denied and deleted`);
          setOpen(false);
        })
        .catch(error => {
          console.error('There was an error denying the policy!', error);
          toast.error('Failed to deny policy');
        });
    }
  };

  const openSheetWithPolicy = (policy) => {
    setSelectedPolicy(policy);
    setOpen(true);
  };

  return (
    <>
      <Card className="border border-gray-200 shadow-lg">
        <CardHeader className='flex justify-between items-center p-4 bg-gray-100'>
          <CardTitle className="text-lg font-semibold"><b>Policies</b></CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Table className="text-gray-800">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"><b>Policy No</b></TableHead>
                <TableHead><b>Policy Name</b></TableHead>
                <TableHead><b>Policy Duration</b></TableHead>
                <TableHead><b>Policy Holder Name</b></TableHead>
                <TableHead><b>Policy Holder Aadhar No</b></TableHead>
                <TableHead><b>Policy Holder PAN No</b></TableHead>
                <TableHead><b>Nominee</b></TableHead>
                <TableHead className="text-right"><b>Amount</b></TableHead>
                <TableHead className="text-right"><b>Actions</b></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.policyNo}>
                  <TableCell className="font-medium"><b>{policy.policyNo}</b></TableCell>
                  <TableCell><b>{policy.policyName}</b></TableCell>
                  <TableCell><b>{policy.policyDuration} Months</b></TableCell>
                  <TableCell><b>{policy.policyHolderName}</b></TableCell>
                  <TableCell><b>{policy.aadharNo}</b></TableCell>
                  <TableCell><b>{policy.panCardNo}</b></TableCell>
                  <TableCell><b>{policy.nomineeName}</b></TableCell>
                  <TableCell className="text-right"><b>{policy.policyAmount}</b></TableCell>
                  <TableCell className="text-right">
                    {policy.status === "Accepted" && (
                      <span className="text-green-600"><b>Accepted</b></span>
                    )}
                    {policy.status === "Denied" && (
                      <span className="text-red-600"><b>Denied</b></span>
                    )}
                    {(!policy.status || policy.status === "") && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="mr-2 text-green-600"
                          onClick={() => openSheetWithPolicy(policy)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600"
                          onClick={() => handleDeny(policy.policyNo)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={() => setOpen(false)} className="p-6">
        <SheetContent className="bg-white rounded-lg shadow-lg">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold"><b>Policy Details</b></SheetTitle>
            <SheetDescription className="text-sm text-gray-600">
              <b>Review the details of the selected policy and make your decision.</b>
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            {selectedPolicy && (
              <>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="policyNo" className="text-right"><b>Policy No</b></Label>
                  <Input id="policyNo" value={selectedPolicy.policyNo || ''} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="policyName" className="text-right"><b>Policy Name</b></Label>
                  <Input id="policyName" value={selectedPolicy.policyName || ''} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="planMonths" className="text-right"><b>Plan (Months)</b></Label>
                  <Input id="planMonths" value={selectedPolicy.policyDuration || ''} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="policyHolderName" className="text-right"><b>Policy Holder Name</b></Label>
                  <Input id="policyHolderName" value={selectedPolicy.policyHolderName || ''} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="policyHolderAadhar" className="text-right"><b>Policy Holder Aadhar No</b></Label>
                  <Input id="policyHolderAadhar" value={selectedPolicy.aadharNo || ''} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="policyHolderPAN" className="text-right"><b>Policy Holder PAN No</b></Label>
                  <Input id="policyHolderPAN" value={selectedPolicy.panCardNo || ''} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="nominee" className="text-right"><b>Nominee</b></Label>
                  <Input id="nominee" value={selectedPolicy.nomineeName || ''} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="amount" className="text-right"><b>Amount</b></Label>
                  <Input id="amount" value={selectedPolicy.policyAmount || ''} disabled className="col-span-3" />
                </div>
              </>
            )}
          </div>
          <SheetFooter className='flex justify-between mt-4'>
            <Button
              className='w-1/2 bg-red-500 hover:bg-red-600 text-white'
              onClick={() => setOpen(false)}
            >
              <b>Cancel</b>
            </Button>
            <Button
              className='w-1/2 bg-green-500 hover:bg-green-600 text-white'
              type="button"
              onClick={() => handleAccept(selectedPolicy?.policyNo)}
            >
              <b>Accept</b>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ToastContainer />
    </>
  );
};

export default AdminUsers;
