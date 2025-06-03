import styles from '../modules/Protocols.module.css';
import { FiX } from "react-icons/fi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

import { BiDotsVerticalRounded  } from "react-icons/bi";

import { CgProfile } from "react-icons/cg";

export default function Protocols(){
    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <CgProfile className={styles.iconProfile} />
                <h1>Perfil</h1>
                <button><BiDotsVerticalRounded className={styles.iconOptions}/></button>
            </div>
            <div className={styles.containerCenter}>
                <h1>Lista de Protocolos</h1>
                <div className={styles.containerListProtocols}>
                    <div className={styles.containerProtocol} style={{ backgroundColor: 'gray'}}>
                        <div className={styles.container1}>
                            <input type="checkbox" className={styles.checkbox} />
                            <label>Protocolo 1</label>
                        </div>
                        <div className={styles.container1}>
                            <label>08:10</label>
                            <label><FiX style={{ color: 'red', fontSize: '1.5rem', backgroundColor: 'transparent'  }} /></label>
                        </div>
                    </div>

                     <div className={styles.containerProtocol} style={{ backgroundColor: 'yellow'}} >
                        <div className={styles.container1}>
                            <input type="checkbox" className={styles.checkbox} />
                            <label>Protocolo 2</label>
                        </div>
                        <div className={styles.container1}>
                            <label>08:20</label>
                            <label><MdOutlineAccessTimeFilled style={{ color: 'black', fontSize: '1.5rem', backgroundColor: 'transparent'  }} /></label>
                        </div>
                    </div>

                     <div className={styles.containerProtocol} style={{ backgroundColor: 'green'}}>
                        <div className={styles.container1}>
                            <input type="checkbox" className={styles.checkbox} />
                            <label>Protocolo 3</label>
                        </div>
                        <div className={styles.container1}>
                            <label>08:30</label>
                            <label><BsCheckLg style={{ color: 'black', fontSize: '1.5rem', backgroundColor: 'transparent' }} /></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}