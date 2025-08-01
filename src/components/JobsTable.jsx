import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Building2 } from 'lucide-react';

const JobsTable = ({ jobs, searchTerm, onEdit, onDelete }) => {
    const filteredJobs = jobs.filter(job =>
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return `₹${parseFloat(amount).toLocaleString()}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>CTC</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Apply Deadline</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{job.companyName}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{job.role || 'N/A'}</TableCell>
                                <TableCell>{job.location || job.city || 'N/A'}</TableCell>
                                <TableCell>{formatCurrency(job.ctc)}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {job.type || 'Full-time'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{formatDate(job.startDate)}</TableCell>
                                <TableCell>{formatDate(job.applyDeadlineDate)}</TableCell>
                                <TableCell>
                                    <Badge variant={job.active !== false ? "default" : "secondary"}>
                                        {job.active !== false ? "Active" : "Inactive"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(job)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onDelete(job._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredJobs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No jobs found
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default JobsTable;
