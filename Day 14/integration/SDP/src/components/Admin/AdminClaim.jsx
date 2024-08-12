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
import { fetchClaims } from '@/services/api';
import { axiosInstance } from '../../services/api';

const AdminClaim = () => {
  const [open, setOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const getClaims = async () => {
      try {
        const response = await fetchClaims();
        setClaims(response.data);
      } catch (error) {
        toast.error("Failed to fetch claims");
      }
    };

    getClaims();
  }, []);

  const handleAccept = (claim) => {
    setSelectedClaim(claim);
    setOpen(true);
  };

  const handleDeny = (claimNo) => {
    if (window.confirm(`Are you sure you want to deny claim ${claimNo}?`)) {
      axiosInstance.delete(`/claims/${claimNo}`)
        .then(() => {
          setClaims(claims.filter(claim => claim.claimNo !== claimNo));
          toast.error(`Claim ${claimNo} denied and deleted`);
          setOpen(false);
        })
        .catch(error => {
          console.error('There was an error denying the Claim!', error);
          toast.error('Failed to deny claim');
        });
    }
  };

  const handleConfirm = (claimNo) => {
    axiosInstance.put(`/claims/${selectedClaim.claimNo}/action`, { action: true })
      .then(() => {
        setClaims(claims.map(claim =>
          claim.claimNo === claimNo ? { ...claim, status: "Accepted" } : claim
        ));
        toast.success(`Claim ${selectedClaim.claimNo} is Accepted`);
        setOpen(false);
      })
      .catch(error => {
        console.error("There was an error accepting the claim", error);
        toast.error("Failed to update claim");
      });
  };

  return (
    <>
      <Card className="border border-gray-200 shadow-lg">
        <CardHeader className='flex justify-between items-center p-4 bg-gray-100'>
          <CardTitle className="text-lg font-semibold"><b>Claims</b></CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Table className="text-gray-800">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"><b>Claim No</b></TableHead>
                <TableHead><b>Policy Name</b></TableHead>
                <TableHead><b>Policy Holder Name</b></TableHead>
                <TableHead><b>Nominee</b></TableHead>
                <TableHead><b>Reason for Claim</b></TableHead>
                <TableHead className="text-right"><b>Actions</b></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.claimNo}>
                  <TableCell className="font-medium"><b>{claim.claimNo}</b></TableCell>
                  <TableCell><b>{claim.customerPolicy.policyName}</b></TableCell>
                  <TableCell><b>{claim.customerPolicy.policyHolderName}</b></TableCell>
                  <TableCell><b>{claim.customerPolicy.nomineeName}</b></TableCell>
                  <TableCell><b>{claim.claimReason}</b></TableCell>
                  <TableCell className="text-right">
                    {claim.status === "Accepted" && (
                      <span className="text-green-500"><b>Accepted</b></span>
                    )}
                    {claim.status === "Denied" && (
                      <span className="text-red-500"><b>Denied</b></span>
                    )}
                    {(!claim.status || claim.status === "") && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2 text-green-600"
                          onClick={() => handleAccept(claim)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => handleDeny(claim.claimNo)}
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
            <SheetTitle className="text-lg font-semibold"><b>Claim Details</b></SheetTitle>
            <SheetDescription className="text-sm text-gray-600">
              <b>Review the details of the selected claim and make your decision.</b>
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="claimNo" className="text-right"><b>Claim No</b></Label>
              <Input id="claimNo" value={selectedClaim?.claimNo || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="policyName" className="text-right"><b>Policy Name</b></Label>
              <Input id="policyName" value={selectedClaim?.customerPolicy.policyName || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="policyHolderName" className="text-right"><b>Policy Holder Name</b></Label>
              <Input id="policyHolderName" value={selectedClaim?.customerPolicy.policyHolderName || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="nominee" className="text-right"><b>Nominee</b></Label>
              <Input id="nominee" value={selectedClaim?.customerPolicy.nomineeName || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="claimReason" className="text-right"><b>Reason for Claim</b></Label>
              <Input id="claimReason" value={selectedClaim?.claimReason || ''} disabled className="col-span-3" />
            </div>
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
              onClick={() => handleConfirm(selectedClaim?.claimNo)}
            >
              <b>Confirm</b>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ToastContainer />
    </>
  );
};

export default AdminClaim;
