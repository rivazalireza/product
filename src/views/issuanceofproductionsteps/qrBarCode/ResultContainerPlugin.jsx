import React from 'react';
import { useNavigate, } from 'react-router-dom'

const ResultContainerPlugin = (props) => {
    let results = props.results[0];
    const navigate = useNavigate()
    navigate(
        '/OrderNumber',
        { state: results }
    );
}

export default ResultContainerPlugin;