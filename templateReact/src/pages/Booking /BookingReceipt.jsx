import React from "react";

const BookingReceipt = ({ user, countedSeat, pickedSeat, totalPrice }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Seats Count</th>
          <th>Picked Seat</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user}</td>
          <td>{countedSeat}</td>
          <td>{pickedSeat}</td>
          <td>{totalPrice}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookingReceipt;
