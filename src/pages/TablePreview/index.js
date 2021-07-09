import React, {useEffect} from 'react'
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getTable } from '../../redux/actions/TableActions'

import './styles.css'

const TablePreview = ({table, dispatchGetTable}) => {
    const { tableId } = useParams()

    useEffect(() =>
    dispatchGetTable(tableId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
        [tableId])

    return (
        <div>
            <p>Table ID: {table[0]?.id}</p>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetTable: (tableId) => dispatch(getTable(tableId)),
});

const mapStateToProps = (state) => ({
    table: state.table,
});

export default connect(mapStateToProps, mapDispatchToProps)(TablePreview);


