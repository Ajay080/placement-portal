import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MessageSquare, Users } from 'lucide-react';

const DropsTable = ({ drops, searchTerm, onEdit, onDelete }) => {
    const filteredDrops = drops.filter(drop =>
        drop.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drop.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drop.branch?.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
        drop.type?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const formatArray = (array) => {
        if (!array || !Array.isArray(array)) return 'N/A';
        return array.join(', ');
    };

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Target Years</TableHead>
                            <TableHead>Target Branches</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDrops.map((drop) => (
                            <TableRow key={drop._id}>
                                <TableCell>{formatDate(drop.date)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{drop.subject}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-xs">
                                    <div className="truncate" title={drop.message}>
                                        {drop.message}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        {formatArray(drop.years)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {drop.branch && Array.isArray(drop.branch) ? (
                                            drop.branch.map((branch, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {branch}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {drop.type && Array.isArray(drop.type) ? (
                                            drop.type.map((type, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {type}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(drop)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onDelete(drop._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredDrops.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No drops found
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DropsTable;
