import type {ChangeEvent} from "react";
import styles from './input.module.css';

export default function Input(
    {field, setField, placeholder, id, label, isTextarea} :
    {field: { value: string, error: string}, setField: (e: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => void, placeholder: string, id: string, label?: string, isTextarea?: boolean}) {
    
    const Element = isTextarea ? `textarea` : `input`
    return <div className={`${styles.inputWrapper} ${label ? styles.wrapperWithLabel : ''}`}>
        <label className={`${styles.inputLabel} ${label ? '' : styles.hidden}`} htmlFor={id}>{label}</label>
        <Element id={id} value={field.value} className={`${styles.input} ${label ? styles.inputWithLabel : ''}`} onChange={setField} placeholder={label ? placeholder : ''} />
        {!label && <label className={styles.inputHiddenLabel}>{placeholder}</label>}
        {field.error && <span className='error'>{field.error}</span>}
    </div>
}
