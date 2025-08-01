import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const ModalsContainer = ({ modals, setModals, selectedData, setSelectedData, onRefresh }) => {
    const closeModal = (modalName) => {
        setModals(prev => ({ ...prev, [modalName]: false }));
        setSelectedData(null);
    };

    const handleDelete = async () => {
        try {
            // Implement delete logic based on the current active tab and selectedData
            console.log('Deleting:', selectedData);
            
            // Close modal and refresh data
            closeModal('deleteConfirm');
            onRefresh();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <>
            {/* Delete Confirmation Modal */}
            <Dialog open={modals.deleteConfirm} onOpenChange={() => closeModal('deleteConfirm')}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Confirm Deletion
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => closeModal('deleteConfirm')}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Student Modal */}
            <Dialog open={modals.addStudent} onOpenChange={() => closeModal('addStudent')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            Add a new student to the placement portal.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add student form component here */}
                        <p className="text-gray-500">Student form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('addStudent')}>
                                Cancel
                            </Button>
                            <Button>Add Student</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Student Modal */}
            <Dialog open={modals.editStudent} onOpenChange={() => closeModal('editStudent')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Student</DialogTitle>
                        <DialogDescription>
                            Update student information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add student edit form component here */}
                        <p className="text-gray-500">Student edit form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('editStudent')}>
                                Cancel
                            </Button>
                            <Button>Update Student</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Job Modal */}
            <Dialog open={modals.addJob} onOpenChange={() => closeModal('addJob')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Job</DialogTitle>
                        <DialogDescription>
                            Post a new job opportunity.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add job form component here */}
                        <p className="text-gray-500">Job form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('addJob')}>
                                Cancel
                            </Button>
                            <Button>Add Job</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Job Modal */}
            <Dialog open={modals.editJob} onOpenChange={() => closeModal('editJob')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Job</DialogTitle>
                        <DialogDescription>
                            Update job information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add job edit form component here */}
                        <p className="text-gray-500">Job edit form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('editJob')}>
                                Cancel
                            </Button>
                            <Button>Update Job</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Interview Modal */}
            <Dialog open={modals.addInterview} onOpenChange={() => closeModal('addInterview')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Schedule Interview</DialogTitle>
                        <DialogDescription>
                            Schedule a new interview session.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add interview form component here */}
                        <p className="text-gray-500">Interview form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('addInterview')}>
                                Cancel
                            </Button>
                            <Button>Schedule Interview</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Interview Modal */}
            <Dialog open={modals.editInterview} onOpenChange={() => closeModal('editInterview')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Interview</DialogTitle>
                        <DialogDescription>
                            Update interview details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add interview edit form component here */}
                        <p className="text-gray-500">Interview edit form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('editInterview')}>
                                Cancel
                            </Button>
                            <Button>Update Interview</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Drop Modal */}
            <Dialog open={modals.addDrop} onOpenChange={() => closeModal('addDrop')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Drop Message</DialogTitle>
                        <DialogDescription>
                            Send a drop message to students.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add drop form component here */}
                        <p className="text-gray-500">Drop form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('addDrop')}>
                                Cancel
                            </Button>
                            <Button>Send Drop</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Drop Modal */}
            <Dialog open={modals.editDrop} onOpenChange={() => closeModal('editDrop')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Drop Message</DialogTitle>
                        <DialogDescription>
                            Update drop message details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add drop edit form component here */}
                        <p className="text-gray-500">Drop edit form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('editDrop')}>
                                Cancel
                            </Button>
                            <Button>Update Drop</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Rule Modal */}
            <Dialog open={modals.addRule} onOpenChange={() => closeModal('addRule')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Placement Rule</DialogTitle>
                        <DialogDescription>
                            Add a new placement rule or policy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add rule form component here */}
                        <p className="text-gray-500">Rule form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('addRule')}>
                                Cancel
                            </Button>
                            <Button>Add Rule</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Rule Modal */}
            <Dialog open={modals.editRule} onOpenChange={() => closeModal('editRule')}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Placement Rule</DialogTitle>
                        <DialogDescription>
                            Update placement rule or policy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {/* TODO: Add rule edit form component here */}
                        <p className="text-gray-500">Rule edit form will be implemented here</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => closeModal('editRule')}>
                                Cancel
                            </Button>
                            <Button>Update Rule</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ModalsContainer;
