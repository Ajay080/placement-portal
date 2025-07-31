import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { Upload, FileText, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { buildApiUrl } from '../../utils/config';

const ResumeInfoForm = ({ handleCloseResumeInfoForm, onDataUpdate, alertOpen, setAlertOpen }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        toast.success('PDF file selected successfully');
      } else {
        toast.error('Please select a PDF file only');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        toast.success('PDF file selected successfully');
      } else {
        toast.error('Please select a PDF file only');
      }
    }
  };

  const uploadResume = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      const storedData = localStorage.getItem('userData');
      if (!storedData) return;
      
      const parsedData = JSON.parse(storedData);
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const url = buildApiUrl(`uploadResume/${student_id}`);
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Resume uploaded successfully!');
      onDataUpdate?.();
      setAlertOpen(false);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadResume();
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    handleCloseResumeInfoForm?.();
  };

  const handleFileSelect = (file) => {
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error('Please select a PDF file only');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const uploadResume = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setUploading(true);
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

      const formData = new FormData();
      formData.append('file', selectedFile);

      const url = buildApiUrl(`uploadResume/${student_id}`);
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Resume uploaded successfully!');
      onDataUpdate?.();
      setAlertOpen(false);
      setUploading(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
      setUploading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    handleCloseResumeInfoForm?.();
  };

  return (
    <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Resume
          </DialogTitle>
          <DialogDescription>
            Upload your latest resume in PDF format (max 10MB)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-2">
                <Check className="h-12 w-12 text-green-500 mx-auto" />
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-sm font-medium">Drop your resume here</p>
                  <p className="text-xs text-muted-foreground">or click to browse</p>
                </div>
                <p className="text-xs text-muted-foreground">PDF files only (max 10MB)</p>
              </div>
            )}
            
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleCloseAlert}>
            Cancel
          </Button>
          <Button 
            onClick={uploadResume} 
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeInfoForm;
