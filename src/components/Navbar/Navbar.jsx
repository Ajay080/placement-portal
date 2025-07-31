import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Menu, User, LogOut, LayoutDashboard, Briefcase, Calendar, Users, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import BrandName from '../BrandName/BrandName';

const Navbar = () => {
  const [activeButton, setActiveButton] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (page) => {
    setActiveButton(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const storedData = localStorage.getItem('userData');
  if (!storedData) {
    navigate('/login');
    return null;
  }
  
  let parsedData;
  try {
    parsedData = JSON.parse(storedData);
  } catch (error) {
    navigate('/login');
    return null;
  }

  // Determine user role and name
  let userRole = 'student';
  let userName = 'User';
  
  if (parsedData) {
    // Handle different user data formats from login/signup
    if (parsedData.student) {
      userRole = parsedData.student.role || 'student';
      userName = parsedData.student.name || 'Student';
    } else if (parsedData.newStudent) {
      userRole = parsedData.newStudent.role || 'student';
      userName = parsedData.newStudent.name || 'Student';
    } else if (parsedData.user) {
      userRole = parsedData.user.role || 'user';
      userName = parsedData.user.name || 'User';
    }
  }

  // Generate user initials
  const getUserInitials = (name) => {
    if (!name) return 'U';
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const userInitials = getUserInitials(userName);

  // Generate a consistent color based on the user's name
  const getUserColor = (name) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-cyan-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const userColor = getUserColor(userName);

  const navigationItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard,
      key: 'dashboard' 
    },
    { 
      name: 'Drops', 
      path: '/drop', 
      icon: Briefcase,
      key: 'drop' 
    },
    { 
      name: 'Job Board', 
      path: '/job', 
      icon: Briefcase,
      key: 'job' 
    },
    { 
      name: 'Interviews', 
      path: '/calendar', 
      icon: Calendar,
      key: 'calendar' 
    },
    { 
      name: 'About Us', 
      path: '/about', 
      icon: Users,
      key: 'about' 
    },
  ];

  // Add admin link if user is not a student
  if (userRole !== 'student') {
    navigationItems.push({
      name: 'Admin',
      path: '/admin',
      icon: Shield,
      key: 'admin'
    });
  }

  const NavItems = ({ isMobile = false, onItemClick = () => {} }) => (
    <TooltipProvider>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        const linkContent = (
          <Link
            key={item.key}
            to={item.path}
            onClick={() => {
              handleButtonClick(item.key);
              onItemClick();
            }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/80'
            } ${isMobile ? 'w-full justify-start' : 'min-w-fit'}`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {isMobile ? (
              item.name
            ) : (
              <span className="hidden lg:inline-block whitespace-nowrap">{item.name}</span>
            )}
          </Link>
        );

        // For medium screens (md to lg), wrap with tooltip for icon-only view
        if (!isMobile) {
          return (
            <Tooltip key={item.key}>
              <TooltipTrigger asChild>
                {linkContent}
              </TooltipTrigger>
              <TooltipContent className="lg:hidden">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        }

        return linkContent;
      })}
    </TooltipProvider>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-space-between">
        {/* Brand Logo */}
        <div className="flex items-center mr-6 lg:mr-8">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BrandName />
          </Link>
        </div>

        {/* Desktop Navigation - Full Width Distribution */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <div className="flex items-center space-x-2 lg:space-x-6 xl:space-x-8">
            <NavItems />
          </div>
        </div>

        {/* User Profile & Mobile Menu */}
        <div className="flex items-center space-x-2 ml-6 lg:ml-8">
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`${userColor} text-white font-semibold text-sm`}>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground capitalize">
                  {userRole}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`${userColor} text-white font-semibold text-lg`}>
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <NavItems isMobile={true} />
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
