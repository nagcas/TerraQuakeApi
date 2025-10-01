import React, { useState } from 'react';
import MetaData from '@pages/noPage/metaData'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    alert('Thank you for your message!');
  };

  return (
    // This is the single main container for the page
    <div className="min-h-screen text-white p-4 md:p-8">
      <MetaData
        title="Contact Us - TerraQuake API"
        description="Get in touch with the TerraQuake API team for support or inquiries."
        ogTitle="Contact Us - TerraQuake API"
        twitterTitle="Contact Us - TerraQuake API"
      />

     
      <div className="h-28"></div>

      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-teal-400">Contact Us</h2>
         <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* ... your form fields are here ... */}
            {/* Name Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your first name"
                  required
                />
              </div>
              {/* Last Name Field */}
              <div>
                <label htmlFor="lastName" className="block text-gray-400 mb-2 font-semibold">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-400 mb-2 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Content Field */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-gray-400 mb-2 font-semibold">Message</label>
              <textarea
                id="content"
                name="content"
                rows="6"
                value={formData.content}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;