export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isNaN(date)) {
    console.warn(`Invalid date format provided: ${dateString}`);
    return dateString;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

