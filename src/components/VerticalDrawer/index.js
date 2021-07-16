import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'
import './styles.css'

const VerticalDrawer = () => {
    const [subnav, setSubnav] = useState(false)
    const [activeMenu, setActiveMenu] = useState("orçamento")

    return (
        <div className="vertical-container"> 
            <ul className="vertical-menu-container">
                <li>
                    <Link className={activeMenu === 'orçamento' ? 'menu-item-active' : 'vertical-menu-item'} to="/orçamento" onClick={() => setActiveMenu('orçamento')}>
                        <FiIcons.FiGrid size={22} />
                        <p className="vertical-menu-title">Orçamento</p>
                    </Link>
                </li>
                <Link className={activeMenu === 'database' ? 'menu-item-active' : 'vertical-menu-item'} to="" onClick={() => {setSubnav(!subnav); setActiveMenu('database')}}>
                    <FiIcons.FiDatabase size={22} />
                    <p className="vertical-menu-title">Database</p>
                    {!subnav ?
                        <FiIcons.FiChevronDown className="vertical-drop-icon" size={20} />
                        :
                        <FiIcons.FiChevronUp className="vertical-drop-icon" size={20} />
                    }
                </Link>
                <li>{subnav ?
                    <div>
                        <Link className={activeMenu === 'database-der' ? 'menu-item-active' : 'vertical-menu-item'}  to="/database-der" onClick={() => setActiveMenu('database-der')}>
                            <FiIcons.FiCode size={20} />
                            <p className="vertical-menu-title">DER</p>
                        </Link>
                        <Link className={activeMenu === 'database-sicro' ? 'menu-item-active' : 'vertical-menu-item'} to="/database-sicro" onClick={() => setActiveMenu('database-sicro')}>
                            <FiIcons.FiCode size={20} />
                            <p className="vertical-menu-title">Sicro</p>
                        </Link>
                    </div>
                    : null
                }
                </li>
                <li>
                    <Link className={activeMenu === 'importar' ? 'menu-item-active' : 'vertical-menu-item'}  to="/importar" onClick={() => setActiveMenu('importar')}>
                        <FiIcons.FiUploadCloud size={22} />
                        <p className="vertical-menu-title">Importar</p>
                    </Link>
                </li>               
                <div style={{ position: 'absolute', bottom: 15, width: '100%' }}>
                    <li>
                        <Link className={activeMenu === 'configurações' ? 'menu-item-active' : 'vertical-menu-item'}  to="/configurações" onClick={() => setActiveMenu('configurações')}>
                            <FiIcons.FiSettings size={22} />
                            <p className="vertical-menu-title">Configurações</p>
                        </Link>
                    </li>
                    <p className="disclamer">Neovia DB | BETA</p>
                </div>
            </ul>
        </div>
    )
}



export default VerticalDrawer;