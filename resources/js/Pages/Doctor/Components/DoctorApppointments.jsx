import React, { useState } from 'react';
import { Calendar, Clock, Search, Filter, MoreVertical, User, Phone, FileText, Clock3 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';

const DoctorAppointments = ({ initialAppointments }) => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [error, setError] = useState('');

    // Initialize form with Inertia
    const { data, setData, post, processing, reset } = useForm({
        app_id: '',
        status: ''
    });

    // Rest of your utility functions remain the same
    const getStatusColor = (status) => {
        const colors = {
            confirmed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            cancelled: 'bg-red-100 text-red-800',
            paid: 'bg-blue-100 text-blue-800',
            completed: 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatTime = (dateString) => {
        try {
            return new Date(dateString).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid time';
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    const getHeaderText = () => {
        if (!selectedDate) {
            return "All Appointments";
        }

        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (selectedDate === today) {
            return "Today's Appointments";
        } else if (selectedDate === tomorrow) {
            return "Tomorrow's Appointments";
        } else if (selectedDate === yesterday) {
            return "Yesterday's Appointments";
        } else {
            return `Appointments for ${formatDate(selectedDate)}`;
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        if (!appointment) return false;

        const patientName = appointment.patient_name || '';
        const patientPhone = appointment.patient_phone || '';
        const appointmentDate = appointment.status_updated_at ? 
            new Date(appointment.status_updated_at).toISOString().split('T')[0] : '';

        const matchesSearch = searchTerm === '' || 
            patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patientPhone.includes(searchTerm);

        const matchesDate = !selectedDate || appointmentDate === selectedDate;
        const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;

        return matchesSearch && matchesDate && matchesStatus;
    });

    const handleStatusUpdate = (appointmentId, newStatus) => {
        const appointment = appointments.find(app => app?.app_id === appointmentId);
        if (!appointment) return;

        const appointmentDate = new Date(appointment.status_updated_at);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (newStatus === 'confirmed' && appointmentDate < currentDate) {
            Swal.fire({
                title: 'Error',
                text: 'Cannot confirm appointments from past dates',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Set the form data
        setData("app_id", appointmentId);
        setData("status", newStatus);

        // Submit the form with proper error handling
        post('/doctor/appointments/update-status',
            data,
            {
                onSuccess: () => {
                    setAppointments(appointments.map(app => 
                        app?.app_id === appointmentId ? { ...app, status: newStatus } : app
                    ));
                }
            }
        )
    };

    const handleViewReport = (appointmentId) => {
        console.log(`Viewing report for appointment ${appointmentId}`);
    };

    const handleClearDate = () => {
        setSelectedDate('');
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Rest of your JSX remains the same until the appointments list */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{getHeaderText()}</h1>
                <div className="flex space-x-2 items-center">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                    />
                    {selectedDate && (
                        <button
                            onClick={handleClearDate}
                            className="text-sm text-gray-600 hover:text-gray-800"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 flex space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search patients by name or phone..."
                        className="pl-10 pr-4 py-2 w-full border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <button 
                        className="flex items-center px-4 py-2 border rounded-md"
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                        <Filter className="h-5 w-5 mr-2" />
                        Filter
                    </button>
                    {showFilterMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                            <div className="py-1">
                                {['all', 'pending', 'paid', 'confirmed', 'cancelled', 'completed'].map((status) => (
                                    <button
                                        key={status}
                                        className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === status ? 'bg-gray-100' : ''}`}
                                        onClick={() => {
                                            setFilterStatus(status);
                                            setShowFilterMenu(false);
                                        }}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                    <div
                        key={appointment?.app_id || Math.random()}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-2">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                            <img 
                                                src={appointment.patient_photo || '/api/placeholder/150/150'} 
                                                alt={appointment.patient_name || 'Patient'} 
                                                className="w-full h-full object-cover rounded-full" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{appointment.patient_name || 'Unknown Patient'}</h3>
                                        <div className="flex items-center text-gray-600">
                                            <Phone className="h-4 w-4 mr-1" />
                                            {appointment.patient_phone || 'No phone number'}
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-16 space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {formatDate(appointment.status_updated_at)} · {formatTime(appointment.status_updated_at)}
                                    </div>
                                    <p className="text-gray-600">{appointment.problem || 'No notes available'}</p>
                                    <div className="flex space-x-4 mt-4">
                                        {appointment.status === 'completed' && (
                                            <button
                                                onClick={() => handleViewReport(appointment.app_id)}
                                                className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                <FileText className="h-4 w-4 mr-1" />
                                                View Full Report
                                            </button>
                                        )}
                                        {appointment.status === 'paid' && (
                                            <div className="flex space-x-2">
                                                <button
                                                    disabled={processing}
                                                    onClick={() => handleStatusUpdate(appointment.app_id, 'confirmed')}
                                                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                                                >
                                                    {processing ? 'Confirming...' : 'Confirm'}
                                                </button>
                                                <button
                                                    disabled={processing}
                                                    onClick={() => handleStatusUpdate(appointment.app_id, 'cancelled')}
                                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                                                >
                                                    {processing ? 'Cancelling...' : 'Cancel'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                                    {appointment.status || 'unknown'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No appointments found
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;