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


const AdditionalInfoForm = ({ handleCloseAdditionalInfoForm, onDataUpdate, alertOpen, setAlertOpen }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    age: '',
    status: true,
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
      console.log("stored json data is",parsedData);
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
      
      if (!student_id) {
        toast.error('Invalid user data');
        return;
      }

      const url = buildApiUrl(`students/${student_id}`);
      const response = await axios.get(url);
      setStudentDetail(response.data);
      populateFormFields(response.data);
      setLoading(false);
      console.log("received data is", response.data);
    } catch (error) {
        console.log("got the error while fetching the data", error);
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
      console.log("stored json data is",parsedData);
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
        
      const url = buildApiUrl(`updateStudent/${student_id}`);
      
      // Convert type string to array of numbers if needed
      let typeValue;
      if (formData.type) {
        const typeMap = {
          'Regular': [1],
          'Lateral Entry': [2], 
          'Transfer': [3],
          'International': [4]
        };
        typeValue = typeMap[formData.type] || [formData.type];
      } else {
        typeValue = [];
      }
      
      const data = {  
        "age": parseInt(formData.age) || undefined,
        "status": formData.status,
        "type": typeValue
      };
      
      const response = await axios.post(url, data);
      console.log("received data is", response);
      toast.success('Additional information updated successfully!');
      onDataUpdate?.();
      setAlertOpen(false);
      setSaving(false);
    } catch (error) {
        console.log("got the error while updating the data", error);
        toast.error('Failed to update additional information');
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
        3: 'Transfer', 
        4: 'International'
      };
      typeString = typeMap[data.type[0]] || '';
    }
    
    setFormData(prevFormData => ({
      ...prevFormData,
      age: data.age?.toString() || '',
      status: data.status !== undefined ? data.status : true,
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
    handleCloseAdditionalInfoForm?.();
  };

  return (
    <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Additional Information</DialogTitle>
          <DialogDescription>
            Update additional profile information
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
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="50"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Student Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Lateral Entry">Lateral Entry</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Account Status</Label>
                <Select value={formData.status.toString()} onValueChange={(value) => setFormData(prev => ({...prev, status: value === 'true'}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
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

export default AdditionalInfoForm;
