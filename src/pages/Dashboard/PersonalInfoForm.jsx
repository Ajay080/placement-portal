import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { buildApiUrl } from '../../utils/config';

const PersonalInfoForm = ({ handleClosePersonalInfoForm, onDataUpdate, alertOpen, setAlertOpen }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    tag: ''
  });

  const [studentDetail, setStudentDetail] = useState(null);
  
  const getStudentDetails = async () => {
    try {
      const storedData = localStorage.getItem('userData');
      if (!storedData) {
        toast.error('No user data found');
        return;
      }
      
      const parsedData = JSON.parse(storedData);
      // Handle both login response formats: {student, token} and {newStudent, token}
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id;
      
      if (!student_id) {
        toast.error('Invalid user data');
        return;
      }

      const url = buildApiUrl(`students/${student_id}`);
      const response = await axios.get(url);
      setStudentDetail(response.data);
      populateFormFields(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error('Failed to load student details');
      setLoading(false);
    }
  };
  const updateStudentDetails = async () => {
    try {
      const storedData = localStorage.getItem('userData');
      if (!storedData) return;
      var parsedData = JSON.parse(storedData);
      console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
      // Handle different data structure formats from authentication
      var student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
        const url = buildApiUrl(`updateStudent/${student_id}`);
        console.log("form data is", formData.tag)
        const data={  
          "name":`${formData.name}`,
          "registrationNumber":`${formData.regNo}`,
          "email":formData.email,
          "phoneNumber":`${formData.phone}`,
          "gender":`${formData.gender}`,
          "dob":`${formData.DoB}`,
          "tag":formData.tag
        } 
        const response = await axios.post(url, data);
        console.log("received data is", response);
        toast.success('Personal information updated successfully!');
        onDataUpdate?.(); // Callback to refresh parent component data
        setAlertOpen(false);

    } catch (error) {
        console.log("got the error while fetching the data", error);
        toast.error('Failed to update personal information');
    }
};

  const populateFormFields = (data) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      name: data.name || '',
      regNo: data.registrationNumber || '',
      email: data.email || '',
      phone: data.phoneNumber || '',
      DoB: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
      gender: data.gender || '',
      tag: data.tag || ''
    }));
  };
  
  


  useEffect(() => {
    if (alertOpen) {
      getStudentDetails();
    }
  }, [alertOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    updateStudentDetails();
    handleCloseAlert();
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    handleClosePersonalInfoForm?.(); // Call handleClosePersonalInfoForm from props if it exists
  };

  return (
    <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
          <DialogDescription>
            Update your personal details below
          </DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <Input
                  id="regNo"
                  name="regNo"
                  type="text"
                  value={formData.regNo}
                  onChange={handleChange}
                  placeholder="Enter registration number"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({...prev, gender: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="DoB">Date of Birth</Label>
                <Input
                  id="DoB"
                  name="DoB"
                  type="date"
                  value={formData.DoB}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tag">Tag</Label>
                <Input
                  id="tag"
                  name="tag"
                  type="text"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="Enter tag (optional)"
                />
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleCloseAlert}>
                Cancel
              </Button>
              <Button type="submit">
                Update Information
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoForm;
