import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Settings, AlertTriangle } from 'lucide-react';

const RulesTable = ({ rules, searchTerm, onEdit, onDelete }) => {
    const filteredRules = rules.filter(rule =>
        rule.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRules.map((rule) => (
                            <TableRow key={rule._id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Settings className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{rule.title}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {rule.category || 'General'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="max-w-xs">
                                    <div className="truncate" title={rule.description}>
                                        {rule.description || 'No description'}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {rule.priority === 'high' && (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                        <Badge variant={
                                            rule.priority === 'high' ? "destructive" :
                                            rule.priority === 'medium' ? "default" : "secondary"
                                        }>
                                            {rule.priority || 'Low'}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={rule.active !== false ? "default" : "secondary"}>
                                        {rule.active !== false ? "Active" : "Inactive"}
                                    </Badge>
                                </TableCell>
                                <TableCell>{formatDate(rule.createdAt)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(rule)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onDelete(rule._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredRules.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No placement rules found
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RulesTable;
