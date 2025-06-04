import styles from './button.module.css';
import type {ReactNode} from "react";
type BtnType = "submit" | "button" | "reset" | undefined;

export default function Button({children, ...props}: {children: ReactNode, type: BtnType}) {
    return <button className={styles.button} {...props}>
        {children}
    </button>
}