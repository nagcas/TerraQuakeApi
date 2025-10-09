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
        // Parse query parameters from URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('user_id'); // Backend should pass user_id
        const name = params.get('name');      // Username from backend
        const email = params.get('email');    // Email from backend
        const avatar = params.get('avatar');  // Avatar URL
        const role = params.get('role');      // User role

        if (token && userId) {
            // ✅ Save token and user data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                _id: userId,
                name: name || "Anonymous",
                email: email || "",
                avatar: avatar || "",
                role: role || "user"
            }));

            // ✅ Update context state
            setUserLogin(JSON.parse(localStorage.getItem('user')));
            setIsLoggedIn(true);

            // Show success message and redirect to profile
            Swal.fire({
                title: 'Login Successful!',
                text: 'You have been logged in.',
                icon: 'success',
                confirmButtonText: 'Continue',
            }).then(() => {
                navigate('/profile', { replace: true });
            });

        } else if (params.get('error')) {
            // Handle authentication error
            const errorMessage = params.get('error') || 'Authentication failed.';
            Swal.fire({
                title: 'Authentication Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again',
            }).then(() => {
                navigate('/signin', { replace: true });
            });
        } else {
            // Unexpected redirect — go back to sign in
            navigate('/signin', { replace: true });
        }

        setIsLoading(false);
    }, [location.search, navigate, setIsLoggedIn, setUserLogin]);

    // Loading state while processing OAuth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className='text-white flex items-center gap-2'>
                    <ImSpinner9 className='text-4xl spinner text-purple-600' /> 
                    <span>Authenticating...</span>
                </p>
            </div>
        );
    }

    return null; // Component does not render anything after redirect
}