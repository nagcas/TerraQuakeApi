import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import Spinner from '@/components/spinner/Spinner';
import axios from '@/config/Axios.js';

export default function DeleteUser({ users, setUsers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      // If no token is found, show an error alert
      if (!token) {
        Swal.fire({
          title: 'Error!',
          text: 'Deteled account.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        setLoading(false);
        return;
      }

      // Ask for confirmation before performing the delete request
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      // If the user cancels, stop the process
      if (!result.isConfirmed) {
        setLoading(false);
        return;
      }

      // Perform account deletion request
      const response = await axios.delete(`/users/${users._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in authorization header
        },
      });

      // Show success message after account deletion
      await Swal.fire({
        title: 'Deleted!',
        text: response.data.message || 'Account has been deleted successfully.',
        icon: 'success',
        confirmButtonText: 'Home page',
      });

      // Update the list
      setUsers((prev) =>
        prev.map((u) =>
          u._id === users._id ? { ...u, deleted: true } : u
        )
      );

    } catch (error) {
      // Handle possible errors and display them
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        'An error occurred. Please try again.';
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      // Always stop loading, regardless of the result
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className='px-4 py-1 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.02] hover:bg-purple-400 transition-all duration-300 cursor-pointer'
      >
        <FaXmark />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center'
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className='bg-black w-11/12 max-w-3xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative'
            >
              {/* Header */}
              <header className='p-5 bg-purple-400/20 border-b border-white/10 flex justify-between items-center'>
                <h2 className='text-white uppercase tracking-wider text-sm font-semibold'>
                  Delete User: {users?.name}
                </h2>

                <button
                  onClick={toggleModal}
                  className='text-white/60 hover:text-white transition duration-300 text-xl cursor-pointer'
                >
                  <FaXmark />
                </button>
              </header>

              {/* Body */}
              <div className='flex flex-col items-center gap-4 mt-20'>
                <p className='text-2xl text-center pt-5 text-gray-300'>
                  You are about to deactivate this user account. This is a
                  reversible action and the user can be restored at any time.
                </p>
                <p className='text-xl text-center text-gray-300'>
                  Please confirm that you want to proceed with the temporary
                  deactivation of this user.
                </p>
              </div>

              {/* Footer */}
              <div className='flex justify-end p-6 gap-4 pt-4'>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-6 py-2 text-md font-semibold  rounded-full border border-white/5 
                        bg-gradient-to-r from-purple-600 to-pink-500 text-white 
                        transition-all duration-300 cursor-pointer 
                        ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.03]'}`}
                  aria-label='Delete your account'
                >
                  {loading ? <Spinner /> : 'Delete account'}
                </button>

                <button
                  type='button'
                  onClick={toggleModal}
                  className='px-6 py-2 text-md border border-white/5 bg-white/[0.06] 
                    rounded-full shadow-xl transition-all duration-300 cursor-pointer 
                    hover:scale-[1.03] hover:bg-white/[0.12]'
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
