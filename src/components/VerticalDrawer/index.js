import React from 'react';
import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'
import './styles.css'

const VerticalDrawer = () => {

    return (
        <div className="vertical-container">
            <ul className="vertical-menu-container">
                <li>
                    <Link className="vertical-menu-item" to="/dashboard">
                        <FiIcons.FiGrid size={22} />
                        <p className="vertical-menu-title">Orçamento</p>
                    </Link>
                </li>
                <li>
                    <Link className="vertical-menu-item" to="/database">
                        <FiIcons.FiDatabase size={22} />
                        <p className="vertical-menu-title">Database</p>
                    </Link>
                </li>
                <li>
                    <Link className="vertical-menu-item" to="/importar">
                        <FiIcons.FiUploadCloud size={22}  />
                        <p className="vertical-menu-title">Atualizar</p>
                    </Link>
                </li>
                <li>
                    <Link className="vertical-menu-item" to="/registros">
                        <FiIcons.FiList size={22}  />
                        <p className="vertical-menu-title">Registros</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}



export default VerticalDrawer;