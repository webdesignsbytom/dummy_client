export const formatDateHandler = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2); // last two digits

  return `${day}/${month}/${year}`;
};

export const filteredBookings = (bookings, filter) => {
  return bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'cancelled' && booking.cancelled) return true;
    if (filter === 'denied' && booking.denied) return true;
    if (filter === 'unconfirmed' && !booking.bookingApproved) return true;

    const bookingDate = new Date(booking.date);
    const today = new Date();

    if (filter === 'day' && bookingDate.toDateString() === today.toDateString())
      return true;
    if (filter === 'week' && isSameWeek(bookingDate, today)) return true;
    if (
      filter === 'month' &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    )
      return true;

    return false;
  });
};

export const isSameWeek = (date1, date2) => {
  const startOfWeek = new Date(date2);
  startOfWeek.setDate(date2.getDate() - date2.getDay());
  const endOfWeek = new Date(date2);
  endOfWeek.setDate(date2.getDate() + (6 - date2.getDay()));
  return date1 >= startOfWeek && date1 <= endOfWeek;
};
