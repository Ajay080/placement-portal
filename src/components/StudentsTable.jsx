import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Download } from 'lucide-react';

const StudentsTable = ({ students, searchTerm, onEdit, onDelete }) => {
    const filteredStudents = students.filter(student =>
        student.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownloadResume = (student) => {
        if (student.file) {
            window.open(`http://localhost:5000/student/downloadResume/${student._id}`, '_blank');
        }
    };

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Registration No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Branch</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow key={student._id}>
                                <TableCell className="font-medium">{student.registrationNumber}</TableCell>
                                <TableCell>{student.name || 'N/A'}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.phoneNumber || 'N/A'}</TableCell>
                                <TableCell>{student.branch || 'N/A'}</TableCell>
                                <TableCell>{student.year || 'N/A'}</TableCell>
                                <TableCell>
                                    <Badge variant={student.placed ? "default" : "secondary"}>
                                        {student.placed ? "Placed" : "Active"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {student.file ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDownloadResume(student)}
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            Download
                                        </Button>
                                    ) : (
                                        <span className="text-gray-500">No resume</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(student)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onDelete(student._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No students found
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StudentsTable;
