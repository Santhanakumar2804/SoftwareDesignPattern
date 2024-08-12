import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { BarChart, User2, FileText, Plus, Trash2 } from 'lucide-react';
import {
  Table, TableBody, TableHead, TableHeader, TableRow, TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter
} from "@/components/ui/sheet";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../services/api'; // Import axiosInstance

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [newPolicy, setNewPolicy] = useState({
    policyName: '',
    policyDuration: '', // Updated field name
    policyAmount: '',   // Updated field name
  });
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Fetch policies on component mount
    fetchPolicies();
  }, []);

  const fetchPolicies = () => {
    axiosInstance.get('/policies/all')
      .then(response => {
        setPolicies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the policies!', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({ ...newPolicy, [name]: value });
  };

  const handleAddPolicy = () => {
    axiosInstance.post('/policies', newPolicy)
      .then(response => {
        fetchPolicies(); // Refresh the policies list
        toast.success(`Policy ${response.data.policyID} added successfully`);
        setOpen(false);
        setNewPolicy({ policyName: '', policyDuration: '', policyAmount: '' });
      })
      .catch(error => {
        console.error('There was an error adding the policy!', error);
        toast.error('Failed to add policy');
      });
  };

  const handleDeletePolicy = (policy) => {
    if (window.confirm(`Are you sure you want to delete the policy ${policy.policyName}?`)) {
      axiosInstance.delete(`/policies/${policy.policyID}`)
        .then(() => {
          fetchPolicies(); // Refresh the policies list
          toast.error(`Policy ${policy.policyName} successfully deleted`);
        })
        .catch(error => {
          console.error('There was an error deleting the policy!', error);
          toast.error('Failed to delete policy');
        });
    }
  };

  const openEditSheet = (policy) => {
    setEditMode(true);
    setSelectedPolicy(policy);
    setNewPolicy({
      policyName: policy.policyName,
      policyDuration: policy.policyDuration, // Updated field name
      policyAmount: policy.policyAmount,     // Updated field name
    });
    setOpen(true);
  };

  const handleEditPolicy = () => {
    axiosInstance.put(`/policies/${selectedPolicy.policyID}`, newPolicy)
      .then(response => {
        fetchPolicies(); // Refresh the policies list
        toast.success(`Policy ${selectedPolicy.policyName} successfully updated`);
        setOpen(false);
        setEditMode(false);
        setNewPolicy({ policyName: '', policyDuration: '', policyAmount: '' });
      })
      .catch(error => {
        console.error('There was an error updating the policy!', error);
        toast.error('Failed to update policy');
      });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Users"
          value="12"
          icon={<BarChart className="h-8 w-8 text-white" />}
        />
        <DashboardCard
          title="Total Policies"
          value={policies.length}
          icon={<User2 className="h-8 w-8 text-white" />}
        />
        <DashboardCard
          title="Pending Claims"
          value="20"
          icon={<FileText className="h-8 w-8 text-white" />}
        />
      </div>
      <Card className="p-8 rounded-lg shadow-lg border border-teal-600">
        <CardHeader className='w-full flex flex-row justify-between items-center'>
          <CardTitle className="text-lg font-semibold">User Policies</CardTitle>
          <Button onClick={() => {
            setEditMode(false);
            setOpen(true);
          }} className="bg-teal-500 hover:bg-teal-600 text-white">
            <Plus className='h-5 w-5 mr-2' /> Add Policy
          </Button>
        </CardHeader>
        <CardContent>
          <Table className="text-gray-800">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Policy No</TableHead>
                <TableHead>Policy Name</TableHead>
                <TableHead>Duration (Months)</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.policyID}>
                  <TableCell className="font-medium">{policy.policyID}</TableCell>
                  <TableCell>{policy.policyName}</TableCell>
                  <TableCell>{policy.policyDuration}</TableCell>
                  <TableCell className="text-right">{policy.policyAmount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="text-red-600" onClick={() => handleDeletePolicy(policy)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={() => setOpen(false)}>
        <SheetContent className="bg-white p-6 rounded-lg shadow-lg">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">{editMode ? "Edit Policy" : "Add New Policy"}</SheetTitle>
            <SheetDescription className="text-sm text-gray-600">
              {editMode ? "Update the details below to edit the policy." : "Fill out the details below to add a new policy."}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policyName" className="text-right text-gray-700">
                Policy Name
              </Label>
              <Input
                id="policyName"
                name="policyName"
                value={newPolicy.policyName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policyDuration" className="text-right text-gray-700">
                Duration (Months)
              </Label>
              <Input
                id="policyDuration"
                name="policyDuration"
                value={newPolicy.policyDuration}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policyAmount" className="text-right text-gray-700">
                Amount
              </Label>
              <Input
                id="policyAmount"
                name="policyAmount"
                value={newPolicy.policyAmount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter className='flex justify-between'>
            <Button className='bg-red-500 hover:bg-red-600 text-white' onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="button" className='bg-teal-500 hover:bg-teal-600 text-white' onClick={editMode ? handleEditPolicy : handleAddPolicy}>
              {editMode ? "Edit" : "Submit"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ToastContainer />
    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => (
  <Card className="bg-teal-500 text-white shadow-lg rounded-lg p-6 flex items-center">
    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal-700 flex items-center justify-center">
      {icon}
    </div>
    <div className="ml-4">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </Card>
);

export default AdminDashboard;