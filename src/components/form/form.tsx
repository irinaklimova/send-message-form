import styles from './form.module.css';
import type {ReactNode} from "react";

export default function Form({children, onSubmit}: {children: ReactNode, onSubmit: () => void}) {
    return <form className={styles.form} action={onSubmit}>
        {children}
    </form>
}