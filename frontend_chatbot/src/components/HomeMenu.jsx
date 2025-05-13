import styles from "./HomeMenu.module.css"
import { useNavigate } from 'react-router-dom';
import QRCODE from '../img/QRCODE.png'
import perfil from '../img/jesuinoprofile.png'

export default function HomeMenu(){
    const navigate = useNavigate()

    return (
    <div className={styles.container}>
        <div className={styles.containerTopo}>
            <button className={styles.buttonExit} onClick={() => navigate('/')}>X</button>
        </div>
        <div className={styles.containerCenter}>
            <div className={styles.containerProfile}>

                <div className={styles.nickProfile}>
                    <img src={perfil}/>
                    <h3>Olá, Manassés</h3>
                </div>
                
                <div className={styles.labelInformationsUser}>
                    <label>manasses@gmail.com</label>
                    <label>(88) 12345-6789</label>
                </div>

            </div>

            <div className={styles.containerQRcode}>
                <h4>Escaneie o QR Code abaixo</h4>
                <img src={QRCODE}/>
            </div>
   
        </div>
        <div className={styles.containerFooter}>
            <h4>© Copyright</h4>
        </div>
        
    </div>
    )
}