import React, { FC, useState } from 'react'
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import DatePickerHeader from 'react-multi-date-picker/plugins/date_picker_header'
import Settings from 'react-multi-date-picker/plugins/settings'
import Toolbar from 'react-multi-date-picker/plugins/toolbar'

interface Props {
    onDateSelectionChange: (
        selectedDates: DateObject[] | DateObject | null
    ) => void
}

const DatePickerComponent: FC<Props> = ({ onDateSelectionChange }) => {
    const [selectedDays, setSelectedDays] = useState<DateObject[]>([])
    console.log(selectedDays)
    console.log(selectedDays.map(day => day.format('DD/MM/YYYY')))
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
                plugins={[<DatePanel key="datePanelKey" />]}
            />
        </div>
    )
}

export default DatePickerComponent
