import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { toast } from 'react-toastify';
import axios from 'axios';
import { buildApiUrl } from '../../utils/config';

const AcademicInfoForm = ({ handleCloseAcademicInfoForm, onDataUpdate, alertOpen, setAlertOpen }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    cgpa: '',
    branch: '',
    year: '',
    tenthMarks: '',
    twelfthMarks: '',
    placed: false,
    type: ''
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
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
      
      if (!student_id) {
        toast.error('Invalid user data');
        return;
      }

      const url = buildApiUrl(`students/${student_id}`);
      const response = await axios.get(url);
      const data = response.data;
      setStudentDetail(data);
      populateFormFields(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error('Failed to load student details');
      setLoading(false);
    }
  };

  const updateStudentDetails = async () => {
    try {
      setSaving(true);
      const storedData = localStorage.getItem('userData');
      if (!storedData) return;
      
      const parsedData = JSON.parse(storedData);
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
        
      const url = buildApiUrl(`updateStudent/${student_id}`);
      
      // Convert type string to array of numbers if needed
      let typeValue;
      if (formData.type) {
        const typeMap = {
          'Regular': [1],
          'Lateral Entry': [2], 
          'Transfer': [3]
        };
        typeValue = typeMap[formData.type] || [];
      } else {
        typeValue = [];
      }
      
      const data = {  
        "cgpa": parseFloat(formData.cgpa) || undefined,
        "branch": formData.branch,
        "year": parseInt(formData.year) || undefined,
        "tenthMarks": parseFloat(formData.tenthMarks) || undefined,
        "twelfthMarks": parseFloat(formData.twelfthMarks) || undefined,
        "placed": formData.placed,
        "type": typeValue
      };
      
      const response = await axios.post(url, data);
      console.log("received data is", response);
      toast.success('Academic information updated successfully!');
      onDataUpdate?.();
      setAlertOpen(false);
      setSaving(false);
    } catch (error) {
        console.log("got the error while updating the data", error);
        toast.error('Failed to update academic information');
        setSaving(false);
    }
  };

  const populateFormFields = (data) => {
    // Convert type array back to string for display
    let typeString = '';
    if (Array.isArray(data.type) && data.type.length > 0) {
      const typeMap = {
        1: 'Regular',
        2: 'Lateral Entry',
        3: 'Transfer'
      };
      typeString = typeMap[data.type[0]] || '';
    }
    
    setFormData(prevFormData => ({
      ...prevFormData,
      cgpa: data.cgpa?.toString() || '',
      branch: data.branch || '',
      year: data.year?.toString() || '',
      tenthMarks: data.tenthMarks?.toString() || '',
      twelfthMarks: data.twelfthMarks?.toString() || '',
      placed: data.placed || false,
      type: typeString
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
    updateStudentDetails();
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    handleCloseAcademicInfoForm?.();
  };

  return (
    <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Academic Information</DialogTitle>
          <DialogDescription>
            Update your academic details and performance metrics
          </DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cgpa">Current CGPA</Label>
                  <Input
                    id="cgpa"
                    name="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={handleChange}
                    placeholder="Enter CGPA (0-10)"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={formData.branch} onValueChange={(value) => setFormData(prev => ({...prev, branch: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science Engineering">Computer Science Engineering</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Electronics and Communication">Electronics and Communication</SelectItem>
                      <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                      <SelectItem value="Chemical Engineering">Chemical Engineering</SelectItem>
                      <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="year">Batch Year</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    min="2020"
                    max="2030"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Enter batch year"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Student Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Lateral Entry">Lateral Entry</SelectItem>
                      <SelectItem value="Transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tenthMarks">10th Grade Marks (%)</Label>
                  <Input
                    id="tenthMarks"
                    name="tenthMarks"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.tenthMarks}
                    onChange={handleChange}
                    placeholder="Enter 10th marks"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="twelfthMarks">12th Grade Marks (%)</Label>
                  <Input
                    id="twelfthMarks"
                    name="twelfthMarks"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.twelfthMarks}
                    onChange={handleChange}
                    placeholder="Enter 12th marks"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="placed">Placement Status</Label>
                <Select value={formData.placed.toString()} onValueChange={(value) => setFormData(prev => ({...prev, placed: value === 'true'}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select placement status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Not Placed</SelectItem>
                    <SelectItem value="true">Placed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleCloseAlert}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Updating...' : 'Update Information'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AcademicInfoForm;
