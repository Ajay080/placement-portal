import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Search,
  Edit3,
  Trash2,
  Download,
  Plus,
  Eye,
  FileText,
  Building,
  Clock,
  MapPin
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { buildApiUrl } from '@/utils/config';

// Import table components
import StudentsTable from '@/components/StudentsTable';
import JobsTable from '@/components/JobsTable';
import InterviewsTable from '@/components/InterviewsTable';
import DropsTable from '@/components/DropsTable';
import RequestsTable from '@/components/RequestsTable';
import RulesTable from '@/components/RulesTable';

// Import modal components
import StudentInfoForm from './EditStudentDetails';
import JobInfoForm from './EditJob';
import InterviewInfoForm from './EditInterview';
import DropInfoForm from './EditDrop';
import PlacementInfoForm from './EditPlacementDetails';


const Admin = () => {
    // State management
    const [activeTab, setActiveTab] = useState('students');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Data states
    const [students, setStudents] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [drops, setDrops] = useState([]);
    const [interviewRequests, setInterviewRequests] = useState([]);
    const [placementRules, setPlacementRules] = useState([]);
    
    // Modal states
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false);
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [showDropModal, setShowDropModal] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);
    
    // Edit states
    const [editingStudent, setEditingStudent] = useState(null);
    const [editingJob, setEditingJob] = useState(null);
    const [editingInterview, setEditingInterview] = useState(null);
    const [editingDrop, setEditingDrop] = useState(null);

    // API Functions
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(buildApiUrl('students'));
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(buildApiUrl('jobs'));
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    const fetchInterviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(buildApiUrl('interviews'));
            setInterviews(response.data);
        } catch (error) {
            console.error('Error fetching interviews:', error);
            toast.error('Failed to fetch interviews');
        } finally {
            setLoading(false);
        }
    };

    const fetchDrops = async () => {
        try {
            setLoading(true);
            const response = await axios.get(buildApiUrl('drops'));
            setDrops(response.data);
        } catch (error) {
            console.error('Error fetching drops:', error);
            toast.error('Failed to fetch drops');
        } finally {
            setLoading(false);
        }
    };

    const fetchInterviewRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(buildApiUrl('InterviewAsks'));
            setInterviewRequests(response.data);
        } catch (error) {
            console.error('Error fetching interview requests:', error);
            toast.error('Failed to fetch interview requests');
        } finally {
            setLoading(false);
        }
    };

    const fetchPlacementRules = async () => {
        try {
            setLoading(true);
            const response = await axios.get(buildApiUrl('placementRules'));
            setPlacementRules(response.data[0]?.rules || []);
        } catch (error) {
            console.error('Error fetching placement rules:', error);
            toast.error('Failed to fetch placement rules');
        } finally {
            setLoading(false);
        }
    };

    // Delete functions
    const deleteStudent = async (studentId) => {
        try {
            await axios.delete(buildApiUrl(`students/${studentId}`));
            toast.success('Student deleted successfully');
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
            toast.error('Failed to delete student');
        }
    };

    const deleteJob = async (jobId) => {
        try {
            await axios.delete(buildApiUrl(`DeleteJob/${jobId}`));
            toast.success('Job deleted successfully');
            fetchJobs();
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error('Failed to delete job');
        }
    };

    const deleteInterview = async (interviewId) => {
        try {
            await axios.delete(buildApiUrl(`DeleteInterview/${interviewId}`));
            toast.success('Interview deleted successfully');
            fetchInterviews();
        } catch (error) {
            console.error('Error deleting interview:', error);
            toast.error('Failed to delete interview');
        }
    };

    const deleteDrop = async (dropId) => {
        try {
            await axios.delete(buildApiUrl(`Deletedrops/${dropId}`));
            toast.success('Drop deleted successfully');
            fetchDrops();
        } catch (error) {
            console.error('Error deleting drop:', error);
            toast.error('Failed to delete drop');
        }
    };

    // Download resume function
    const downloadResume = async (studentId, studentName) => {
        try {
            const response = await axios.get(buildApiUrl(`downloadResume/${studentId}`), {
                responseType: 'blob'
            });
            
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${studentName}_resume.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
            toast.success('Resume downloaded successfully');
        } catch (error) {
            console.error('Error downloading resume:', error);
            toast.error('Failed to download resume');
        }
    };

    // Filter functions
    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredJobs = jobs.filter(job =>
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInterviews = interviews.filter(interview =>
        interview.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.theme?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDrops = drops.filter(drop =>
        drop.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drop.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB');
    };

    // Format time helper
    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        return timeString;
    };


    
    // Initialize data on component mount
    useEffect(() => {
        fetchStudents();
        fetchJobs();
        fetchInterviews();
        fetchDrops();
        fetchInterviewRequests();
        fetchPlacementRules();
    }, []);

    // Handle tab change
    useEffect(() => {
        setSearchTerm(''); // Clear search when switching tabs
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage students, jobs, interviews, and placement activities</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-6 mb-8">
                        <TabsTrigger value="students" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="hidden sm:inline">Students</span>
                        </TabsTrigger>
                        <TabsTrigger value="jobs" className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span className="hidden sm:inline">Jobs</span>
                        </TabsTrigger>
                        <TabsTrigger value="interviews" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="hidden sm:inline">Interviews</span>
                        </TabsTrigger>
                        <TabsTrigger value="drops" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span className="hidden sm:inline">Drops</span>
                        </TabsTrigger>
                        <TabsTrigger value="requests" className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="hidden sm:inline">Requests</span>
                        </TabsTrigger>
                        <TabsTrigger value="rules" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">Rules</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Students Tab */}
                    <TabsContent value="students" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">Student Management</h2>
                            <Button onClick={() => setShowStudentModal(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Student
                            </Button>
                        </div>
                        <StudentsTable 
                            students={students} 
                            searchTerm={searchTerm}
                            onEdit={(student) => {
                                setEditingStudent(student);
                                setShowStudentModal(true);
                            }}
                            onDelete={(id) => {
                                deleteStudent(id);
                            }}
                        />
                    </TabsContent>

                    {/* Jobs Tab */}
                    <TabsContent value="jobs" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">Job Management</h2>
                            <Button onClick={() => setShowJobModal(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Job
                            </Button>
                        </div>
                        <JobsTable 
                            jobs={jobs} 
                            searchTerm={searchTerm}
                            onEdit={(job) => {
                                setEditingJob(job);
                                setShowJobModal(true);
                            }}
                            onDelete={(id) => {
                                deleteJob(id);
                            }}
                        />
                    </TabsContent>

                    {/* Interviews Tab */}
                    <TabsContent value="interviews" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">Interview Management</h2>
                            <Button onClick={() => setShowInterviewModal(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Schedule Interview
                            </Button>
                        </div>
                        <InterviewsTable 
                            interviews={interviews} 
                            searchTerm={searchTerm}
                            onEdit={(interview) => {
                                setEditingInterview(interview);
                                setShowInterviewModal(true);
                            }}
                            onDelete={(id) => {
                                deleteInterview(id);
                            }}
                        />
                    </TabsContent>

                    {/* Drops Tab */}
                    <TabsContent value="drops" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">Drop Management</h2>
                            <Button onClick={() => setShowDropModal(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Drop
                            </Button>
                        </div>
                        <DropsTable 
                            drops={drops} 
                            searchTerm={searchTerm}
                            onEdit={(drop) => {
                                setEditingDrop(drop);
                                setShowDropModal(true);
                            }}
                            onDelete={(id) => {
                                deleteDrop(id);
                            }}
                        />
                    </TabsContent>

                    {/* Interview Requests Tab */}
                    <TabsContent value="requests" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">Interview Requests</h2>
                        </div>
                        <RequestsTable 
                            requests={interviewRequests} 
                            searchTerm={searchTerm}
                            onApprove={(id) => {
                                // Handle approval logic
                                console.log('Approve request:', id);
                            }}
                            onReject={(id) => {
                                // Handle rejection logic
                                console.log('Reject request:', id);
                            }}
                        />
                    </TabsContent>

                    {/* Placement Rules Tab */}
                    <TabsContent value="rules" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">Placement Rules</h2>
                            <Button onClick={() => setShowRulesModal(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Rule
                            </Button>
                        </div>
                        <RulesTable 
                            rules={placementRules} 
                            searchTerm={searchTerm}
                            onEdit={(rule) => {
                                // Handle editing rule
                                console.log('Edit rule:', rule);
                            }}
                            onDelete={(id) => {
                                // Handle deleting rule
                                console.log('Delete rule:', id);
                            }}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Modal Components */}
            {showStudentModal && (
                <StudentInfoForm 
                    handleCloseStudentInfoForm={() => {
                        setShowStudentModal(false);
                        setEditingStudent(null);
                        fetchStudents(); // Refresh students data
                    }}
                    student={editingStudent}
                />
            )}
            {showJobModal && (
                <JobInfoForm 
                    handleCloseJobInfoForm={() => {
                        setShowJobModal(false);
                        setEditingJob(null);
                        fetchJobs(); // Refresh jobs data
                    }}
                    job={editingJob}
                />
            )}
            {showInterviewModal && (
                <InterviewInfoForm 
                    handleCloseInterviewInfoForm={() => {
                        setShowInterviewModal(false);
                        setEditingInterview(null);
                        fetchInterviews(); // Refresh interviews data
                    }}
                    interview={editingInterview}
                />
            )}
            {showDropModal && (
                <DropInfoForm 
                    handleCloseDropInfoForm={() => {
                        setShowDropModal(false);
                        setEditingDrop(null);
                        fetchDrops(); // Refresh drops data
                    }}
                    drop={editingDrop}
                />
            )}
            {showRulesModal && (
                <PlacementInfoForm 
                    handleClosePlacementInfoForm={() => {
                        setShowRulesModal(false);
                        fetchPlacementRules(); // Refresh rules data
                    }}
                />
            )}
        </div>
    );
};

export default Admin;
