import React from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
}

const DatePickerComp: React.FC = () => (
    <Space style={{ marginRight: '1rem' }} direction="vertical">
        <DatePicker
            style={{ width: 250 }}
            placeholder="Seleccionar fecha"
            onChange={onChange}
        />
    </Space>
)

export default DatePickerComp
