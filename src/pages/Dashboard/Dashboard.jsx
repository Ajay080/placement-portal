import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  FileText, 
  Settings, 
  Download,
  Edit3,
  Eye,
  EyeOff,
  Shield,
  BookOpen,
  Award
} from 'lucide-react';
import { toast } from 'react-toastify';
import Background from '../../Img/multi-blue.jpg';
import PersonalInfoForm from './PersonalInfoForm';
import AcademicInfoForm from './AcademicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import ResumeInfoForm from './ResumeInfoForm';
import axios from 'axios';
import { buildApiUrl } from '../../utils/config';


const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [studentDetail, setStudentDetail] = useState(null);
    const [placementRules, setPlacementRules] = useState([]);
    
    // Modal states for forms
    const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
    const [showAcademicInfoForm, setShowAcademicInfoForm] = useState(false);
    const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
    const [showResumeInfoForm, setShowResumeInfoForm] = useState(false);

    // Generate user initials for avatar
    const getUserInitials = (name) => {
        if (!name) return 'U';
        const nameParts = name.trim().split(' ');
        if (nameParts.length === 1) {
            return nameParts[0].charAt(0).toUpperCase();
        }
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    };

    // Generate consistent color for avatar
    const getUserColor = (name) => {
        const colors = [
            'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
            'bg-orange-500', 'bg-cyan-500'
        ];
        
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };
    // API Functions
    const getStudentDetails = async () => {
        try {
            const storedData = localStorage.getItem('userData');
            if (!storedData) {
                toast.error('No user data found');
                return;
            }
            
            const parsedData = JSON.parse(storedData);
            console.log('Stored user data:', parsedData); // Debug log
            
            // Handle both login response formats: {student, token} and {newStudent, token}
            const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id;
            
            if (!student_id) {
                console.error('User data structure:', parsedData);
                toast.error('Invalid user data - unable to find student ID');
                return;
            }

            console.log('Using student ID:', student_id); // Debug log
            const url = buildApiUrl(`students/${student_id}`);
            const response = await axios.get(url);
            setStudentDetail(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching student details:", error);
            toast.error('Failed to load student details');
            setLoading(false);
        }
    };

    const getPlacementDetails = async () => {
        try {
            const url = buildApiUrl('placementRules');
            const response = await axios.get(url);
            setPlacementRules(response.data[0]?.rules || []);
        } catch (error) {
            console.error("Error fetching placement rules:", error);
            toast.error('Failed to load placement rules');
        }
    };

    const updatePassword = async () => {
        if (!email || !password || !newPassword) {
            toast.error('Please fill all password fields');
            return;
        }

        try {
            const storedData = localStorage.getItem('userData');
            if (!storedData) {
                toast.error('No user data found');
                return;
            }

            const parsedData = JSON.parse(storedData);
            // Handle both login response formats: {student, token} and {newStudent, token}
            const student_id = parsedData.student?._id || parsedData.newStudent?._id || parsedData.user?._id;

            const url = buildApiUrl(`updatePassword/${student_id}`);
            const data = {
                email: email,
                password: password,
                newpassword: newPassword
            };

            await axios.post(url, data);
            toast.success('Password updated successfully!');
            setPassword('');
            setNewPassword('');
            setEmail('');
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error('Failed to update password');
        }
    };

    const downloadResume = () => {
        if (!studentDetail?.file?.data) {
            toast.error('No resume file found');
            return;
        }

        try {
            const uintArray = new Uint8Array(studentDetail.file.data);
            const blob = new Blob([uintArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${studentDetail.name}_Resume.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('Resume downloaded successfully!');
        } catch (error) {
            console.error("Error downloading resume:", error);
            toast.error('Failed to download resume');
        }
    };

    useEffect(() => {
        getPlacementDetails();
        getStudentDetails();
    }, []);

    useEffect(() => {
        if (studentDetail) {
            console.log("Student details loaded:", studentDetail);
        }
    }, [studentDetail]);

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'NA';
        return new Date(dateString).toLocaleDateString('en-GB');
    };

    // Helper function to get status badge variant
    const getStatusVariant = (status) => {
        return status === true || status === 'Approved' ? 'default' : 'destructive';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!studentDetail) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Alert className="max-w-md">
                    <AlertDescription>
                        Unable to load student information. Please try refreshing the page.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const userInitials = getUserInitials(studentDetail.name);
    const userColor = getUserColor(studentDetail.name || 'User');


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Hero Background Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <img 
                    src={Background} 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                
                <div className="relative container mx-auto px-4 py-12">
                    {/* Profile Card */}
                    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 max-w-4xl mx-auto">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-white/20">
                                    <AvatarFallback className={`${userColor} text-white font-bold text-2xl md:text-3xl`}>
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                {studentDetail.name || 'Student Name'}
                                            </h1>
                                            <p className="text-gray-600 text-lg">
                                                {studentDetail.registrationNumber || 'Registration Number'}
                                            </p>
                                        </div>
                                        <Badge 
                                            variant={getStatusVariant(studentDetail.status)} 
                                            className="text-sm px-4 py-2"
                                        >
                                            {studentDetail.status === true ? 'Approved' : 'Pending Approval'}
                                        </Badge>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="p-2 bg-blue-100 rounded-full">
                                                <Mail className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                                                <p className="font-medium truncate">{studentDetail.email || 'Not available'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="p-2 bg-green-100 rounded-full">
                                                <Phone className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                                                <p className="font-medium">{studentDetail.phoneNumber || 'Not available'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="p-2 bg-purple-100 rounded-full">
                                                <GraduationCap className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide">Branch</p>
                                                <p className="font-medium">{studentDetail.branch || 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
                        <TabsTrigger value="overview" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Overview</span>
                        </TabsTrigger>
                        <TabsTrigger value="academic" className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span className="hidden sm:inline">Academic</span>
                        </TabsTrigger>
                        <TabsTrigger value="resume" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Resume</span>
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </TabsTrigger>
                        <TabsTrigger value="rules" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Rules</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Quick Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <GraduationCap className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">CGPA</p>
                                        <p className="text-xl font-bold">{studentDetail.cgpa || 'N/A'}</p>
                                    </div>
                                </div>
                            </Card>
                            
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <Award className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Placement Status</p>
                                        <Badge variant={studentDetail.placed ? "default" : "secondary"} className="text-sm">
                                            {studentDetail.placed ? 'Placed' : 'Not Placed'}
                                        </Badge>
                                    </div>
                                </div>
                            </Card>
                            
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Batch Year</p>
                                        <p className="text-xl font-bold">{studentDetail.year || 'N/A'}</p>
                                    </div>
                                </div>
                            </Card>
                            
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-full">
                                        <FileText className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Resume</p>
                                        <Badge variant={studentDetail.file ? "default" : "secondary"} className="text-sm">
                                            {studentDetail.file ? 'Uploaded' : 'Not Uploaded'}
                                        </Badge>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Personal Information
                                        </CardTitle>
                                        <CardDescription>
                                            Complete personal profile details
                                        </CardDescription>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => setShowPersonalInfoForm(true)}
                                    >
                                        <Edit3 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                                            <p className="text-sm font-medium">{studentDetail.name || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Registration Number</Label>
                                            <p className="text-sm font-medium">{studentDetail.registrationNumber || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                                            <p className="text-sm font-medium">{studentDetail.gender || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                                            <p className="text-sm font-medium">{formatDate(studentDetail.dob)}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                                            <p className="text-sm font-medium">{studentDetail.age || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Tag</Label>
                                            <Badge variant="secondary" className="text-xs">
                                                {studentDetail.tag || 'No tag'}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Academic Information */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5" />
                                            Academic Information
                                        </CardTitle>
                                        <CardDescription>
                                            Complete academic performance details
                                        </CardDescription>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => setShowAcademicInfoForm(true)}
                                    >
                                        <Edit3 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">CGPA</Label>
                                            <p className="text-sm font-medium">{studentDetail.cgpa || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Branch</Label>
                                            <p className="text-sm font-medium">{studentDetail.branch || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Batch Year</Label>
                                            <p className="text-sm font-medium">{studentDetail.year || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                                            <p className="text-sm font-medium">{studentDetail.type || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">10th Marks</Label>
                                            <p className="text-sm font-medium">{studentDetail.tenthMarks || 'Not provided'}%</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">12th Marks</Label>
                                            <p className="text-sm font-medium">{studentDetail.twelfthMarks || 'Not provided'}%</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Account Status & Resume Card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="h-5 w-5" />
                                        Account Status & Documents
                                    </CardTitle>
                                    <CardDescription>
                                        Account verification status and document management
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => setShowAdditionalInfoForm(true)}
                                    >
                                        <Edit3 className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => setShowResumeInfoForm(true)}
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Manage Resume
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="text-center p-4 border rounded-lg">
                                        <div className="mb-2">
                                            <Badge variant={getStatusVariant(studentDetail.status)} className="text-sm">
                                                {studentDetail.status === true ? 'Active Account' : 'Pending Verification'}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Account Status</p>
                                    </div>
                                    
                                    <div className="text-center p-4 border rounded-lg">
                                        <div className="mb-2">
                                            <Badge variant={studentDetail.placed ? "default" : "secondary"} className="text-sm">
                                                {studentDetail.placed ? 'Placed' : 'Available for Placement'}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Placement Status</p>
                                    </div>
                                    
                                    <div className="text-center p-4 border rounded-lg">
                                        <div className="mb-2">
                                            <Badge variant={studentDetail.file ? "default" : "destructive"} className="text-sm">
                                                {studentDetail.file ? 'Resume Uploaded' : 'Resume Missing'}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Resume Status</p>
                                        {studentDetail.file && (
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={downloadResume}
                                                className="mt-2 h-6 text-xs"
                                            >
                                                <Download className="h-3 w-3 mr-1" />
                                                Download
                                            </Button>
                                        )}
                                    </div>
                                    
                                    <div className="text-center p-4 border rounded-lg">
                                        <div className="mb-2">
                                            <Badge variant="outline" className="text-sm">
                                                {studentDetail.role || 'Student'}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Account Type</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Academic Tab */}
                    <TabsContent value="academic">
                        <Card>
                            <CardHeader>
                                <CardTitle>Academic Records</CardTitle>
                                <CardDescription>Detailed academic information and performance metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <Card className="p-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-primary">{studentDetail.cgpa || 'N/A'}</div>
                                                <div className="text-sm text-muted-foreground">Current CGPA</div>
                                            </div>
                                        </Card>
                                        <Card className="p-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">{studentDetail.tenthMarks || 'N/A'}%</div>
                                                <div className="text-sm text-muted-foreground">10th Grade</div>
                                            </div>
                                        </Card>
                                        <Card className="p-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{studentDetail.twelfthMarks || 'N/A'}%</div>
                                                <div className="text-sm text-muted-foreground">12th Grade</div>
                                            </div>
                                        </Card>
                                    </div>

                                    <Separator />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-3">Academic Details</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Branch:</span>
                                                    <span className="font-medium">{studentDetail.branch || 'Not specified'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Batch Year:</span>
                                                    <span className="font-medium">{studentDetail.year || 'Not provided'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Registration:</span>
                                                    <span className="font-medium">{studentDetail.registrationNumber || 'Not provided'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-3">Placement Status</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Placed:</span>
                                                    <Badge variant={studentDetail.placed ? "default" : "secondary"}>
                                                        {studentDetail.placed ? 'Yes' : 'No'}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Type:</span>
                                                    <span className="font-medium">{studentDetail.type || 'Not specified'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Resume Tab */}
                    <TabsContent value="resume">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Resume Management
                                    </CardTitle>
                                    <CardDescription>
                                        Upload and manage your resume
                                    </CardDescription>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setShowResumeInfoForm(true)}
                                >
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Update Resume
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                        <FileText className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-semibold text-lg">
                                            {studentDetail.name ? `${studentDetail.name}'s Resume` : 'Resume'}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {studentDetail.file ? 'Your resume is available for download' : 'No resume uploaded yet'}
                                        </p>
                                    </div>
                                    {studentDetail.file && (
                                        <Button onClick={downloadResume} className="mt-4">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Resume
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Account Settings
                                </CardTitle>
                                <CardDescription>
                                    Manage your account preferences and security
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Change Password</h3>
                                    <div className="grid gap-4 max-w-md">
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="current-password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Enter current password"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="new-password">New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="new-password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter new password"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                        <Button onClick={updatePassword} className="w-fit">
                                            Update Password
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Rules Tab */}
                    <TabsContent value="rules">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Placement Rules & Guidelines
                                </CardTitle>
                                <CardDescription>
                                    Important rules and regulations for the placement process
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none">
                                    {placementRules.length > 0 ? (
                                        <ul className="space-y-3">
                                            {placementRules.map((rule, index) => (
                                                <li key={index} className="text-sm leading-relaxed">
                                                    {rule}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                            <p className="text-muted-foreground">No placement rules available</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Modal Forms */}
            <PersonalInfoForm 
                handleClosePersonalInfoForm={() => setShowPersonalInfoForm(false)}
                onDataUpdate={getStudentDetails}
                alertOpen={showPersonalInfoForm}
                setAlertOpen={setShowPersonalInfoForm}
            />
            <AcademicInfoForm 
                handleCloseAcademicInfoForm={() => setShowAcademicInfoForm(false)}
                onDataUpdate={getStudentDetails}
                alertOpen={showAcademicInfoForm}
                setAlertOpen={setShowAcademicInfoForm}
            />
            <AdditionalInfoForm 
                handleCloseAdditionalInfoForm={() => setShowAdditionalInfoForm(false)}
                onDataUpdate={getStudentDetails}
                alertOpen={showAdditionalInfoForm}
                setAlertOpen={setShowAdditionalInfoForm}
            />
            <ResumeInfoForm 
                handleCloseResumeInfoForm={() => setShowResumeInfoForm(false)}
                onDataUpdate={getStudentDetails}
                alertOpen={showResumeInfoForm}
                setAlertOpen={setShowResumeInfoForm}
            />
        </div>
    );
};

export default Dashboard;
