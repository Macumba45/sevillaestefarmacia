import React, { FC, useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'

interface Props {
    onDateSelectionChange: (
        selectedDates: DateObject[] | DateObject | null
    ) => void
    initialDates: DateObject[]
}

const DatePickerComponent: FC<Props> = ({
    onDateSelectionChange,
    initialDates,
}) => {
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

    useEffect(() => {
        setSelectedDays(initialDates) // Actualiza las fechas seleccionadas cuando cambian las fechas iniciales
    }, [initialDates])

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
                disabled={new Date() < new Date()}
                plugins={[<DatePanel key="datePanelKey" />]}
                className={'CALENDARIOMODAL'}
            />
        </div>
    )
}

export default DatePickerComponent
