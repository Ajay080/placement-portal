import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Building2 } from 'lucide-react';

const RequestsTable = ({ requests, searchTerm, onApprove, onReject }) => {
    const filteredRequests = requests.filter(request =>
        request.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.targetRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.targetCompany?.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <TableHead>Target Role</TableHead>
                            <TableHead>Target Company</TableHead>
                            <TableHead>Preferred Date</TableHead>
                            <TableHead>Preferred Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Request Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRequests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell className="font-medium">
                                    {request.registrationNumber}
                                </TableCell>
                                <TableCell>{request.targetRole}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-gray-500" />
                                        {request.targetCompany}
                                    </div>
                                </TableCell>
                                <TableCell>{formatDate(request.potentialDate)}</TableCell>
                                <TableCell>{formatTime(request.potentialTime)}</TableCell>
                                <TableCell>{request.potentialDuration || 'N/A'}</TableCell>
                                <TableCell>{formatDate(request.currentDate)}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        request.status === 'approved' ? "default" :
                                        request.status === 'rejected' ? "destructive" : "secondary"
                                    }>
                                        <Clock className="h-3 w-3 mr-1" />
                                        {request.status || 'Pending'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onApprove(request._id)}
                                            disabled={request.status === 'approved'}
                                        >
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onReject(request._id)}
                                            disabled={request.status === 'rejected'}
                                        >
                                            <XCircle className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredRequests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No interview requests found
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RequestsTable;
