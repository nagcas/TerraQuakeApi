import axios from '@config/axios.js';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetaData from '@pages/noPage/metaData';

export default function forgotPassword() {
  const [loading, setLoading] = useState(false);
  const forgotPasswordSchema = yup
    .object({
      email: yup.string().email().required('Email is required !'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  let navigate = useNavigate();

  const handleForgotPassword = (data) => {
    setLoading(true);
    
    const formData = {
      email: data.email,
    };
    axios
      .post('/auth/forgot-password', formData)
      .then((res) => {
        localStorage.setItem(
          'passwordChangeRequestingEmail',
          res.data.user.email
        );
        Swal.fire({
           title: 'Success!',
          text: 'If the email exists in our system, a password reset link has been sent.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/');
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.response?.data?.message || 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/signup');
          setLoading(false);
        });
      });
  };

  return (
    <>
      <MetaData
        title='Forgot Password'
        description='Forgot Password Page of TerraQuake'
      />
      <section className='min-h-screen flex items-center justify-center p-6 rounded-lg'>
        <div className='p-8 rounded-lg w-full max-w-md'>
          <h2 className='text-3xl text-center text-white font-bold mb-6'>
            Forgot Password ?
          </h2>
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <div className='mb-6'>
              <label className='block text-white text-sm font-semibold mb-2'>
                Enter your email
              </label>
              <input
                className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                name='email'
                autoComplete='off'
                {...register('email')}
              />
              <p className='text-red-600 pt-1'>{errors.email?.message}</p>
            </div>
            <button
              className='w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer'
              type='submit'
              aria-label='Recover your account password'
            >
              {loading ? (
                <p className='text-white'>
                  <ImSpinner9 className='text-2xl mx-auto spinner' />
                </p>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
          </form>
          {/* Divider */}
          <div className='flex items-center my-8'>
            <div className='flex-grow border-t border-gray-500'></div>
            <span className='mx-4 text-gray-200 text-sm font-medium'>
              Or return to your account
            </span>
            <div className='flex-grow border-t border-gray-500'></div>
          </div>

          <p className='text-gray-400 text-sm text-center mb-4'>
            Enter your email and we’ll send you a password reset link if it
            matches an existing account.
          </p>

          <Link
            to='/signin'
            className='block text-center mt-2 text-purple-400 hover:text-purple-600 font-semibold transition duration-300'
            aria-label='Navigate to sign in page'
          >
            Back to Sign In
          </Link>
        </div>
      </section>
    </>
  );
}
