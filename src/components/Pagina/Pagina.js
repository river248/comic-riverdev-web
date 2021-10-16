import React from 'react'
import { Pagination } from 'react-bootstrap'

import './Pagina.scss'

function Pagina() {
    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )
}

export default Pagina
