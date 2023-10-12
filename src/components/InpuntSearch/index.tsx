// import { AudioOutlined } from '@ant-design/icons'
import React from 'react'
import { Input, Space } from 'antd'

interface SearchProps {
    onSearch?: (value: string, e: any, info: any) => void
    placeholder?: string
    allowClear?: boolean
    enterButton?: boolean
    size?: 'large' | 'middle' | 'small'
}

const { Search } = Input

// const suffix = (
//     <AudioOutlined
//         style={{
//             fontSize: 16,
//             color: '#1677ff',
//         }}
//     />
// )

const onSearch: SearchProps['onSearch'] = (value: any, _e: any, info: any) =>
    console.log(info?.source, value)

const SearchInputComp: React.FC = () => (
    <Space style={{ marginLeft: '1rem' }} direction="vertical">
        <Search
            style={{ width: 250 }}
            placeholder="Busca a tus clientes"
            onSearch={onSearch}
            enterButton
        />
    </Space>
)

export default SearchInputComp
