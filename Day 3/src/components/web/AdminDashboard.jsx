import React, { useState, useEffect } from 'react';
import { Check, X, Menu, LogOut, MenuSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
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

const Users = ({ onAccept }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      policyCount: 2,
      lastLogin: '2023-06-15',
      accepted: null, // 'accepted' or 'denied'
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '987-654-3210',
      address: '456 Elm St',
      policyCount: 1,
      lastLogin: '2023-07-10',
      accepted: null, // 'accepted' or 'denied'
    },
    {
      id: 3,
      name: ' Smith',
      email: 'alice@example.com',
      phone: '987-654-3210',
      address: '456 Elm St',
      policyCount: 1,
      lastLogin: '2023-07-10',
      accepted: null, // 'accepted' or 'denied'
    },
    {
      id: 4,
      name: 'Alex',
      email: 'alice@example.com',
      phone: '987-654-3210',
      address: '456 Elm St',
      policyCount: 1,
      lastLogin: '2023-07-10',
      accepted: null, // 'accepted' or 'denied'
    },
    // Add more users as needed
  ]);

  const handleAccept = (user) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, accepted: 'accepted' } : u));
    onAccept(user);
    toast.success(`User ${user.name} accepted`);
  };

  const handleDeny = (user) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, accepted: 'denied' } : u));
    toast.error(`User ${user.name} denied`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-6 py-4 text-left whitespace-nowrap">{user.name}</TableCell>
                <TableCell className="px-6 py-4 text-center whitespace-nowrap">{user.email}</TableCell>
                <TableCell className="px-6 py-4 text-right whitespace-nowrap">
                  {user.accepted === 'accepted' && <span className="text-green-500">Accepted</span>}
                  {user.accepted === 'denied' && <span className="text-red-500">Denied</span>}
                  {user.accepted === null && (
                    <>
                      <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleAccept(user)}>
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDeny(user)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

const AdminClaim = ({ newClaims }) => {
  const [open, setOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claims, setClaims] = useState([
    {
      policyNo: "POL001",
      policyName: "Life Coverage",
      planMonths: 12,
      planYears: 1,
      policyHolderName: "John Doe",
      nominee: "Jane Doe",
      reasonForClaim: "Accidental Death",
      status: "", // "Will Contact Soon" or "Denied"
    },
    {
      policyNo: "POL002",
      policyName: "Health Coverage",
      planMonths: 24,
      planYears: 2,
      policyHolderName: "Alice Smith",
      nominee: "Bob Smith",
      reasonForClaim: "Hospitalization",
      status: "", // "Will Contact Soon" or "Denied"
    },
  ]);

  useEffect(() => {
    if (newClaims && newClaims.length > 0) {
      setClaims([...claims, ...newClaims]);
    }
  }, [newClaims]);

  const handleAccept = (claim) => {
    setSelectedClaim(claim);
    setOpen(true);
  };

  const handleDeny = (claimNo) => {
    if (window.confirm(`Are you sure you want to deny claim ${claimNo}?`)) {
      setClaims(claims.map(claim =>
        claim.policyNo === claimNo ? { ...claim, status: "Denied" } : claim
      ));
      toast.error(`Claim ${claimNo} denied`);
    }
  };

  const handleConfirm = () => {
    setClaims(claims.map(claim =>
      claim.policyNo === selectedClaim.policyNo ? { ...claim, status: "Will Contact Soon" } : claim
    ));
    toast.success(`Claim ${selectedClaim.policyNo} will be contacted soon`);
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className='w-full flex flex-row justify-between items-center'>
          <CardTitle>Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Policy No</TableHead>
                <TableHead>Policy Name</TableHead>
                <TableHead>Plan (Months/Years)</TableHead>
                <TableHead>Policy Holder Name</TableHead>
                <TableHead>Nominee</TableHead>
                <TableHead>Reason for Claim</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.policyNo}>
                  <TableCell className="font-medium">{claim.policyNo}</TableCell>
                  <TableCell>{claim.policyName}</TableCell>
                  <TableCell>{claim.planMonths} Months / {claim.planYears} Years</TableCell>
                  <TableCell>{claim.policyHolderName}</TableCell>
                  <TableCell>{claim.nominee}</TableCell>
                  <TableCell>{claim.reasonForClaim}</TableCell>
                  <TableCell className="text-right">
                    {claim.status === "Will Contact Soon" && (
                      <span className="text-green-500">Will Contact Soon</span>
                    )}
                    {claim.status === "Denied" && (
                      <span className="text-red-500">Denied</span>
                    )}
                    {claim.status === "" && (
                      <>
                        <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleAccept(claim)}>
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDeny(claim.policyNo)}>
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

      <Sheet open={open} onOpenChange={() => setOpen(false)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Claim Details</SheetTitle>
            <SheetDescription>
              Review the details of the selected claim and make your decision.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policyNo" className="text-right">
                Policy No
              </Label>
              <Input id="policyNo" value={selectedClaim?.policyNo || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policyName" className="text-right">
                Policy Name
              </Label>
              <Input id="policyName" value={selectedClaim?.policyName || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="planMonths" className="text-right">
                Plan (Months/Years)
              </Label>
              <Input id="planMonths" value={`${selectedClaim?.planMonths || ''} Months / ${selectedClaim?.planYears || ''} Years`} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policyHolderName" className="text-right">
                Policy Holder Name
              </Label>
              <Input id="policyHolderName" value={selectedClaim?.policyHolderName || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nominee" className="text-right">
                Nominee
              </Label>
              <Input id="nominee" value={selectedClaim?.nominee || ''} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reasonForClaim" className="text-right">
                Reason for Claim
              </Label>
              <Input id="reasonForClaim" value={selectedClaim?.reasonForClaim || ''} disabled className="col-span-3" />
            </div>
          </div>
          <SheetFooter className='flex flex-col flex-1'>
            <Button className='w-1/2 bg-destructive hover:bg-destructive/80' onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="button" className='w-1/2' onClick={handleConfirm}>Confirm</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

const Analysis = ({ users, claims }) => {
  // Calculate total policies and claims
  const totalPolicies = users.reduce((acc, user) => acc + user.policyCount, 0);
  const totalClaims = claims.length;

  // Calculate policies per user
  const policiesPerUser = users.map(user => ({
    name: user.name,
    policyCount: user.policyCount,
  }));

  // Calculate claims per user
  const claimsPerUser = users.map(user => ({
    name: user.name,
    claimCount: claims.filter(claim => claim.policyHolderName === user.name).length,
  }));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
      <div className="bg-white shadow rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{totalPolicies}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{totalClaims}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Policies per User</CardTitle>
          </CardHeader>
          <CardContent>
            {policiesPerUser.map(user => (
              <p key={user.name} className="text-sm">
                {user.name}: {user.policyCount} {user.policyCount === 1 ? 'policy' : 'policies'}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Claims per User</CardTitle>
          </CardHeader>
          <CardContent>
            {claimsPerUser.map(user => (
              <p key={user.name} className="text-sm">
                {user.name}: {user.claimCount} {user.claimCount === 1 ? 'claim' : 'claims'}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


const AdminDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [activeSection, setActiveSection] = useState('users');

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      policyCount: 2,
      lastLogin: '2023-06-15',
      accepted: null, // 'accepted' or 'denied'
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '987-654-3210',
      address: '456 Elm St',
      policyCount: 1,
      lastLogin: '2023-07-10',
      accepted: null, // 'accepted' or 'denied'
    },
    // Add more users as needed
  ]);

  const handleAccept = (user) => {
    const newClaim = {
      policyNo: `POL00${user.id}`,
      policyName: 'Life Coverage',
      planMonths: 12,
      planYears: 1,
      policyHolderName: user.name,
      nominee: 'Jane Doe',
      reasonForClaim: 'Accidental Death',
      status: '',
    };

    setClaims([...claims, newClaim]);
  };

  return (
    <div className="flex h-screen" >
 <aside className="w-64 bg-green-100 text-black" color='red' style={{ borderRadius: '8px' }}>
  <div className="p-4">
    {/* <h2 className="text-xl font-semibold">Admin Dashboard</h2> */}
  </div>
  <nav className="mt-4">
    <ul>
      <li className={`p-4 cursor-pointer ${activeSection === 'analysis' ? 'bg-grey-1000' : ''}`} style={{borderRadius:'8px'}} onClick={() => setActiveSection('analysis') }>
        DASHBOARD
      </li>
      <li className={`p-4 cursor-pointer ${activeSection === 'users' ? 'bg-grey-700' : ''}`} onClick={() => setActiveSection('users')}>
        USERS
      </li>
      <li className={`p-4 cursor-pointer ${activeSection === 'claims' ? 'bg-grey-700' : ''}`} onClick={() => setActiveSection('claims')}>
        CLAIMS
      </li>
      <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-700 hover:text-white absolute bottom-0 mb-4">
            <LogOut/>
            Logout
          </a>
    </ul>
  </nav>
</aside>

      <main className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          {/* <h1 className="text-2xl font-semibold">Admin Dashboard</h1> */}
          {/* <Button variant="ghost" size="icon">
            <Menu
            className="h-6 w-6" />
          </Button> */}
        </div>
        {activeSection === 'users' && <Users onAccept={handleAccept} />}
        {activeSection === 'claims' && <AdminClaim newClaims={claims} />}
        {activeSection === 'analysis' && <Analysis users={users} claims={claims} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
