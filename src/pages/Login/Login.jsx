import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buildApiUrl } from '../../utils/config';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Eye, EyeOff, User, Building2, Shield, GraduationCap } from 'lucide-react';
import Background from '../../Img/LoginBg.jpg';


const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registration, setRegistration] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('student');
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleRegistrationChange = (e) => {
        setRegistration(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!email || !password) {
            toast.error("Email and password are required!");
            return;
        }
        
        if (isSignUp) {
            if (!name) {
                toast.error("Name is required for signup!");
                return;
            }
            if (role === 'student' && (!registration || !phoneNumber)) {
                toast.error("Registration number and phone number are required for student signup!");
                return;
            }
            if (role !== 'student' && !phoneNumber) {
                toast.error("Phone number is required for signup!");
                return;
            }
        }
        
        let apiEndPoint = '';
        let data = {};

        // Determine API endpoint and data based on signup/login and role
        if (isSignUp) { // Signup
            if (role === 'student') {
                apiEndPoint = buildApiUrl('addStudent');
                data = {
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    registrationNumber: registration,
                    phoneNumber: phoneNumber
                };
            } else if (role === 'user' || role === 'admin') {
                apiEndPoint = buildApiUrl('users/signup');
                data = {
                    name: name,
                    email: email,
                    password: password,
                    role: role
                };
            }
        } else { // Login
            if (role === 'student') {
                apiEndPoint = buildApiUrl('students/login');
                data = {
                    email: email,
                    password: password
                };
            } else if (role === 'user' || role === 'admin') {
                apiEndPoint = buildApiUrl('users/login');
                data = {
                    email: email,
                    password: password
                };
            }
        }

        try {
            const response = await axios.post(apiEndPoint, data);
            console.log("Response:", response.data);
            
            if (isSignUp) {
                // For signup, show success message and switch to login mode
                toast.success("Account created successfully! Please login.");
                setIsSignUp(false);
                // Clear form data
                setName('');
                setEmail('');
                setPassword('');
                setRegistration('');
                setPhoneNumber('');
            } else {
                // For login, show welcome message and navigate
                toast.success(`Welcome back, ${response.data.user?.name || 'User'}!`);
                
                // Clear and set user data in localStorage
                localStorage.removeItem('userData');
                localStorage.setItem('userData', JSON.stringify(response.data));
                
                // Navigate based on role
                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/drop');
                }
            }
        } catch (error) {
            console.log("Error:", error);
            
            let errorMessage = "Login/Signup failed. Please check your credentials.";
            
            if (error.response && error.response.data) {
                // Handle specific MongoDB duplicate key error
                if (error.response.data.code === 11000) {
                    if (error.response.data.keyPattern.phoneNumber) {
                        errorMessage = "This phone number is already registered. Please use a different phone number.";
                    } else if (error.response.data.keyPattern.email) {
                        errorMessage = "This email is already registered. Please use a different email or try logging in.";
                    } else {
                        errorMessage = "This information is already registered. Please check your details.";
                    }
                } else if (error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
            }
            
            toast.error(errorMessage);
        }
    };
    const getRoleIcon = () => {
        switch (role) {
            case 'student':
                return <GraduationCap className="w-4 h-4" />;
            case 'admin':
                return <Shield className="w-4 h-4" />;
            case 'user':
                return <User className="w-4 h-4" />;
            default:
                return <Building2 className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <Card className="overflow-hidden shadow-xl">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        {/* Left side - Form */}
                        <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                {/* Header */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <h1 className="text-2xl font-bold">
                                        {isSignUp ? "Create Account" : "Welcome back"}
                                    </h1>
                                    <p className="text-balance text-muted-foreground">
                                        {isSignUp 
                                            ? "Sign up for your Career Development Portal account"
                                            : "Login to your Career Development Portal account"
                                        }
                                    </p>
                                </div>

                                {/* Role Selection */}
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Select Role</Label>
                                    <Select value={role} onValueChange={setRole}>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                {getRoleIcon()}
                                                <SelectValue placeholder="Select your role" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="student">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="w-4 h-4" />
                                                    Student
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="user">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    User
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="w-4 h-4" />
                                                    Admin
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Name field - only for signup */}
                                {isSignUp && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Email field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </div>

                                {/* Registration Number - only for student signup */}
                                {isSignUp && role === 'student' && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="registration">Registration Number</Label>
                                        <Input
                                            id="registration"
                                            type="text"
                                            placeholder="Enter your registration number"
                                            value={registration}
                                            onChange={handleRegistrationChange}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Phone Number - only for signup */}
                                {isSignUp && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Password field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className="pr-10"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            onClick={handleCheckboxChange}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="w-full">
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                </Button>

                                {/* Toggle Sign up/Sign in */}
                                <div className="text-center text-sm">
                                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                                    <button
                                        type="button"
                                        onClick={() => setIsSignUp(!isSignUp)}
                                        className="underline hover:text-primary"
                                    >
                                        {isSignUp ? "Sign in" : "Sign up"}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Right side - Image */}
                        <div className="relative hidden bg-muted md:block">
                            <img
                                src={Background}
                                alt="Career Development Portal"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Login;
