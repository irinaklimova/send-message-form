import styles from './input-group.module.css';
import type {ReactNode} from "react";

export default function InputGroup({children}: {children: ReactNode}){
    return <div className={styles.inputGroup}>
        {children}
    </div>
}