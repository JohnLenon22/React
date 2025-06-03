import styles from "../modules/HomeMenu.module.css"
import { useNavigate } from 'react-router-dom';
import qrcode from '../img/QRCODE.png'
import perfil from '../img/jesuinoprofile.png'
import voltar from '../img/voltar.png'
import logoIFCE from '../img/image.svg'
import { GoX } from "react-icons/go";

export default function HomeMenu(){
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <div className={styles.containerCenter}>
                <div className={styles.containerExit}>
                    <button onClick={() => navigate('/')}><GoX /></button>
                </div>   

                <div className={styles.containerProfile}>
                    <img src={perfil}/>
                    <div className={styles.labelInformationsUser}>
                        <label>Olá, Manasses</label>
                        <label>manasses@gmail.com</label>
                        <label>(88) 12345-6789</label>
                        <button onClick={() => navigate('/Protocols')}>Meus Protocolos</button>
                    </div>
                </div>
                <div className={styles.containerQRcode}>
                    <h4>Escaneie o QR Code abaixo</h4>
                    <img src={qrcode}/>
                </div>
                <div className={styles.footer}>
                    © 2025 DGJ. Todos os direitos reservados.
                </div>
            </div>     
        </div>
    )
}