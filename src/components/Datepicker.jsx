import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';

function Datepicker({mensaje}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="text-center">
      <h6>{mensaje}</h6>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="form-control"
        locale={es}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}

export default Datepicker;
