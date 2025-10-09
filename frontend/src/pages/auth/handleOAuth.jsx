// src/pages/auth/handleOAuth.jsx (NEW FILE)
import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/context';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';

export default function HandleOAuth() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUserLogin, setIsLoggedIn } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Use URLSearchParams to easily parse the query string from the URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('user_id'); // Assuming your backend sends user_id

        if (token && userId) {
            // SUCCESSFUL LOGIN
            // 1. Store the token
            localStorage.setItem('token', token);
            
            // 2. Fetch the full user details using the token
            // A more robust app would fetch the full user profile here
            // using an authenticated API call. For simplicity, we'll use a placeholder:
            const userObject = { 
                _id: userId,
                // Add more properties if your backend provided them via query params
            };

            // 3. Update context state
            setUserLogin(userObject); 
            setIsLoggedIn(true);

            Swal.fire({
                title: 'Google Login Successful!',
                text: 'You have been logged in.',
                icon: 'success',
                confirmButtonText: 'Continue',
            }).then(() => {
                // 4. Redirect the user to the profile/dashboard page
                navigate('/profile', { replace: true });
            });

        } else if (params.get('error')) {
            // LOGIN FAILED (if backend redirects with an error)
            const errorMessage = params.get('error') || 'Google authentication failed.';
            Swal.fire({
                title: 'Authentication Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again',
            }).then(() => {
                navigate('/signin', { replace: true });
            });

        } else {
            // Unexpected redirection
            navigate('/signin', { replace: true });
        }
        
        setIsLoading(false);
    }, [location.search, navigate, setIsLoggedIn, setUserLogin]);

    // Show a loading state while processing the redirect
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className='text-white flex items-center gap-2'>
                    <ImSpinner9 className='text-4xl mx-auto spinner text-purple-600' /> 
                    <span>Authenticating with Google...</span>
                </p>
            </div>
        );
    }

    return null; // Component renders null after processing and redirecting
}