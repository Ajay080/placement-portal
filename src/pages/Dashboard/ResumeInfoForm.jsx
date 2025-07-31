import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { Upload, FileText, Check, Download } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { buildApiUrl } from '../../utils/config';

const ResumeInfoForm = ({ handleCloseResumeInfoForm, onDataUpdate, alertOpen, setAlertOpen }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [existingResume, setExistingResume] = useState(null);

  // Create a ref for the file input
  const fileInputRef = React.useRef(null);

  // Fetch existing resume data when dialog opens
  useEffect(() => {
    if (alertOpen) {
      fetchExistingResume();
    }
  }, [alertOpen]);

  const fetchExistingResume = async () => {
    try {
      setLoading(true);
      const storedData = localStorage.getItem('userData');
      if (!storedData) return;
      
      const parsedData = JSON.parse(storedData);
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
      
      if (!student_id) return;

      const url = buildApiUrl(`students/${student_id}`);
      const response = await axios.get(url);
      
      if (response.data.file) {
        setExistingResume({
          hasFile: true,
          uploadDate: response.data.updatedAt,
          studentId: student_id,
          studentName: response.data.name
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resume:', error);
      setLoading(false);
    }
  };

  const downloadResume = async () => {
    try {
      if (!existingResume?.studentId) return;
      
      const url = buildApiUrl(`downloadResume/${existingResume.studentId}`);
      const response = await axios.get(url, {
        responseType: 'blob'
      });
      
      // Create download link
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${existingResume.studentName || 'resume'}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.success('Resume downloaded successfully');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
    }
  };

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

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
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
      if (!storedData) {
        toast.error('No user data found');
        setUploading(false);
        return;
      }
      
      const parsedData = JSON.parse(storedData);
      const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id || parsedData._id;
      
      if (!student_id) {
        toast.error('Invalid user data');
        setUploading(false);
        return;
      }

      console.log('Uploading resume for student ID:', student_id);
      console.log('File details:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });

      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const url = buildApiUrl(`uploadResume/${student_id}`);
      console.log('Upload URL:', url);
      
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Upload response:', response.data);
      toast.success('Resume saved to database successfully!');
      
      // Update existing resume state
      setExistingResume({
        hasFile: true,
        uploadDate: new Date().toISOString(),
        studentId: student_id,
        studentName: parsedData.student?.name || parsedData.newStudent?.name || parsedData.user?.name || parsedData.name
      });
      
      // Refresh parent data
      if (onDataUpdate) {
        onDataUpdate();
      }
      
      setSelectedFile(null);
      setUploading(false);
      setAlertOpen(false);
    } catch (error) {
      console.error('Error uploading resume:', error);
      console.error('Error details:', error.response?.data);
      const errorMessage = error.response?.data?.error || 'Failed to save resume to database';
      toast.error(errorMessage);
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
          {/* Loading State */}
          {loading && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">Loading resume status...</p>
            </div>
          )}

          {/* No Existing Resume Notice */}
          {!loading && !existingResume?.hasFile && !selectedFile && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ No resume found in database. Please upload your resume below.
              </p>
            </div>
          )}

          {/* Existing Resume Display */}
          {existingResume?.hasFile && !selectedFile && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">✅ Resume Saved in Database</p>
                      <p className="text-sm text-green-600">
                        Last updated: {new Date(existingResume.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={downloadResume}
                      className="text-green-700 border-green-300 hover:bg-green-100"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExistingResume(null)}
                      className="text-green-700 border-green-300 hover:bg-green-100"
                    >
                      Replace
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={!selectedFile ? handleBrowseClick : undefined}
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
          </div>

          {/* Hidden file input */}
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFile && (
            <div className="space-y-3">
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
              
              {/* Action Required Notice */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  📄 File selected! Click "Save Resume to Database" to upload and save your resume.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleCloseAlert}>
            Cancel
          </Button>
          <Button 
            onClick={uploadResume} 
            disabled={!selectedFile || uploading || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {uploading ? 'Saving Resume...' : loading ? 'Loading...' : 'Save Resume to Database'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeInfoForm;
