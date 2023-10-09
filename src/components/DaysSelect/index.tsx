import React, { FC, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'

interface Props {
    onDateSelectionChange: (
        selectedDates: DateObject[] | DateObject | null
    ) => void
}

const DatePickerComponent: FC<Props> = ({ onDateSelectionChange }) => {
    const [selectedDays, setSelectedDays] = useState<DateObject[]>([])
    const selectedDates = selectedDays.map(day => day.format('DD/MM/YYYY'))
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
                weekStartDayIndex={1}
                format="DD/MM/YYYY"
                value={selectedDates}
                onChange={handleDayChange}
                minDate={new Date()}
                sort
                showOtherDays
                // plugins={[<DatePanel key="datePanelKey" />]}
            />
        </div>
    )
}

export default DatePickerComponent
