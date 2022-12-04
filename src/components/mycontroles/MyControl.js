import React from 'react'
import ButtonInput from './mui/InputButton'
import CheckBox from './mui/InputCheckBox'
import InputPassword from './mui/InputPassword'
import InputText from './mui/InputText'
import InputTime from './mui/InputTime'
import RadioButtons from './mui/InputRadio'
import SubmitButton from './mui/SubmitBottun'
import InputComboBox from './mui/InputComboBox'
import InputComboBoxSearch from './mui/InputComboBoxSearch'
import InputComboBoxSearchGroup from './mui/InputComboBoxSearchGroup'
import InputDate from './mui/InputDate'

function MyControl(props) {
    const { control , ...rest} = props
    switch( control ){
        case 'InputText':
            return <InputText {...rest} />
        case 'InputTime':
            return <InputTime {...rest} />
        case 'InputPassword':
            return <InputPassword {...rest} />
        case 'ButtonInput':
            return <ButtonInput {...rest} />
        case 'InputComboBox':
            return <InputComboBox {...rest} />
        case 'InputComboBoxSearch':
            return <InputComboBoxSearch {...rest} />
        case 'InputComboBoxSearchGroup':
            return <InputComboBoxSearchGroup {...rest} />
        case 'RadioButtons':
            return <RadioButtons {...rest} />
        case 'CheckBox':
            return <CheckBox {...rest} />
        case 'InputDate':
            return <InputDate {...rest} />
        case 'SubmitButton':
            return <SubmitButton {...rest} />  
        default: return null
    }
}

export default MyControl