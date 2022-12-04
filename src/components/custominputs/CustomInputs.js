/** Custom Inputs */
 import React,{useState} from "react";
 import { Field } from "formik";
 import classnames from "classnames";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import InputIcon from "react-multi-date-picker/components/input_icon"
//https://shahabyazdi.github.io/react-multi-date-picker/installation/

 const InputFeedback = ({ error }) =>
 error ? <div className="input-feedback">{error}</div> : null;

const Labely = ({ error, className, children, ...props }) => {
 return (
   <label className="label" {...props}>
     {children}
   </label>
 );
};

const TextInput = ({
 type,
 id,
 label,
 error,
 value,
 onChange,
 className,
 ...props
}) => {
 const classes = classnames("input-group",{"animated shake error": !!error},className);
 return (
   <div className={classes}>
     <Labely htmlFor={id} error={error}>{label}</Labely>
     <input
       id={id}
       className="text-input"
       type={type}
       value={value}
       onChange={onChange}
       {...props}
     />
     <InputFeedback error={error} />
   </div>
 );
};
const SelectInput =({
 id,
 name,
 label,
 error,
 value,
 onChange,
 className,
 items,
 ...props

}) =>{
 const classes = classnames({"animated shake error": !!error},className);
 return(
   <div className={classes}>
     <Labely htmlFor={id} error={error} style={{textAlign:'right'}}>{label}</Labely>
     <Field
     as="select"
     name={name}
     id={id}
     className="form-control"
     value={value}
     >
     <option className="d-none" value="">
     {label}
     </option>
     {
     items.map(item => (
         <option key={item.value} value={item.value} >{item.label}</option>
         ))
     }
     </Field>
     <InputFeedback error={error} />
     </div>
 )
}
const CheckInput = ({
 id,
 name,
 label,
 error,
 value,
 onChange,
 className,
 ...props
}) => {
 const classes = classnames("input-group",{"animated shake error": !!error},className);
 return (
   <div className={classes}>
     <input
       id={id}
       className="check-input"
       type='checkbox'
       value={value}
       onChange={onChange}
       {...props}
     />
      <Labely htmlFor={id} error={error} style={{marginTop: '5px'}}>
       {label}
     </Labely>
     <InputFeedback error={error} />
   </div>
 );
};

const PersianDateInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
 }) => {
  
  const classes = classnames({"animated shake error": !!error},className);
  return (

    <div className={classes}>
      <Labely htmlFor={id} error={error} style={{textAlign:'right'}}>{label}</Labely>
      
      <DatePicker
       render={<InputIcon/>}
      id={id}
      name={id}
      type={type}
      calendar={persian}
      locale={persian_fa}
      value={value}
      onChange={(date)=>{
        onChange(date)
      }}
      // onChange={(value) => {
      //   setstate(value)
      // }}
       {...props}
/>
      <InputFeedback error={error} />
    </div>
  );
 };
{/*  */}
export {TextInput,SelectInput,CheckInput , PersianDateInput}