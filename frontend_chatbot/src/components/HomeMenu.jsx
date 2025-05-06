import styles from "./HomeMenu.module.css"
import { useNavigate } from 'react-router-dom';

export default function HomeMenu(){
    const navigate = useNavigate()

    return (
    <div className={styles.container}>
        <div className={styles.container1}> 
            <div className={styles.container2}>
                <div className={styles.containerProfile}>
                        
                </div>
                <div className={styles.containerQRcode}>
            

                </div>
                    
            </div>
        </div>
    </div>
    )
}