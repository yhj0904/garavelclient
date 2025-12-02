import React from 'react';
import { format } from 'date-fns';

const BookingList = ({ bookings }) => {
    if (!bookings || bookings.length === 0) {
        return <p className="no-data">No bookings found.</p>;
    }

    return (
        <div className="booking-list">
            {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                        <span className="booking-date">
                            {format(new Date(booking.booking_time), 'PPP p')}
                        </span>
                        <span className={`booking-status status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                        </span>
                    </div>
                    <div className="booking-details">
                        <p><strong>Branch:</strong> {booking.branch?.name || 'Unknown Branch'}</p>
                        {booking.service && <p><strong>Service:</strong> {booking.service.name}</p>}
                        {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingList;
