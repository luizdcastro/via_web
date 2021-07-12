import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'
import './styles.css'

const VerticalDrawer = () => {
    const [subnav, setSubnav] = useState(false)  

    return (
        <div className="vertical-container">
            <ul className="vertical-menu-container">
                <li>
                    <Link className="vertical-menu-item" to="/orçamento">
                        <FiIcons.FiGrid size={22} />
                        <p className="vertical-menu-title">Orçamento</p>
                    </Link>
                </li>
                <Link className="vertical-menu-item" onClick={() => setSubnav(!subnav)}>
                    <FiIcons.FiDatabase size={22} />
                    <p className="vertical-menu-title">Database</p>
                    {                        !subnav ? 
                        <FiIcons.FiChevronDown className="vertical-drop-icon" size={20} />
                        :
                        <FiIcons.FiChevronUp className="vertical-drop-icon" size={20} />
                    }                    
                </Link>
                <li>{subnav ?
                    <div>
                        <Link className="vertical-menu-item" to="/database">
                            <FiIcons.FiChevronRight size={20} />
                            <p className="vertical-menu-title">DR</p>
                        </Link>                        
                    </div>
                    : null
                }
                </li>
                <li>
                    <Link className="vertical-menu-item" to="/importar">
                        <FiIcons.FiUploadCloud size={22} />
                        <p className="vertical-menu-title">Atualizar</p>
                    </Link>
                </li>
                <li>
                    <Link className="vertical-menu-item" to="/registros">
                        <FiIcons.FiList size={22} />
                        <p className="vertical-menu-title">Registros</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}



export default VerticalDrawer;