import React, { FC, useState } from 'react'
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker'

interface Props {
    onDateSelectionChange: (
        selectedDates: DateObject[] | DateObject | null
    ) => void
}

const DatePickerComponent: FC<Props> = ({ onDateSelectionChange }) => {
    const [selectedDays, setSelectedDays] = useState<DateObject[]>([])

    // Función para manejar el cambio del día seleccionado
    const handleDayChange = (dates: DateObject[] | DateObject | null) => {
        if (Array.isArray(dates)) {
            setSelectedDays(dates)
        } else {
            setSelectedDays([dates as DateObject])
        }
        // Llama a la función proporcionada desde las propiedades para pasar los datos seleccionados
        onDateSelectionChange(dates)
    }

    return (
        <div>
            <Calendar
                value={selectedDays}
                onChange={handleDayChange}
                minDate={new Date()}
            />
        </div>
    )
}

export default DatePickerComponent
