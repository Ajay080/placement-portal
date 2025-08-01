import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, Clock, Video } from 'lucide-react';

const InterviewsTable = ({ interviews, searchTerm, onEdit, onDelete }) => {
    const filteredInterviews = interviews.filter(interview =>
        interview.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.theme?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        return timeString;
    };

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Registration No</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Theme</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInterviews.map((interview) => (
                            <TableRow key={interview._id}>
                                <TableCell className="font-medium">
                                    {interview.registrationNumber}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Video className="h-4 w-4 text-gray-500" />
                                        {interview.platform}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        {formatDate(interview.date)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        {formatTime(interview.time)}
                                    </div>
                                </TableCell>
                                <TableCell>{interview.duration || 'N/A'}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {interview.theme || 'General'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={interview.completed ? "default" : "secondary"}>
                                        {interview.completed ? "Completed" : "Scheduled"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {interview.joiningLink ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.open(interview.joiningLink, '_blank')}
                                        >
                                            Join
                                        </Button>
                                    ) : (
                                        <span className="text-gray-500">No link</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(interview)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onDelete(interview._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredInterviews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No interviews found
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default InterviewsTable;
