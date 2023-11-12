import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';

function Datepicker({mensaje, cambioFecha}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    handleDateChange(selectedDate)
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date)
    cambioFecha(date)
  }

  return (
    <div className="text-center">
      <h6>{mensaje}</h6>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        className="form-control"
        locale={es}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}

export default Datepicker;
