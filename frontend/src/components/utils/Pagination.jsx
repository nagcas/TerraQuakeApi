import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, setCurrentPage }) {
  // Generate visible page numbers
  const generatePageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Manage page changes
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <section className='relative z-30 mx-auto mt-16'>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex items-center space-x-2'>
            {/* Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed bg-gray-700'
                  : 'bg-purple-600 hover:bg-purple-500 cursor-pointer'
              }`}
            >
              <FaChevronLeft />
            </button>

            {/* Numbers */}
            {generatePageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                  currentPage === pageNum
                    ? 'bg-purple-600 text-white scale-110'
                    : 'bg-white/[0.08] text-white/70 hover:bg-purple-600 cursor-pointer'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed bg-gray-700'
                  : 'bg-purple-600 hover:bg-purple-500 cursor-pointer'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>

          <div className='text-sm text-gray-400'>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
            items
          </div>
        </div>
      )}
    </section>
  );
}
