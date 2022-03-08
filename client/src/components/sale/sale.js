import React, { useState } from 'react';

const SaleComponent = props => {
    const [sale, setSale] = useState({});
    const addSale = (a, b, c) => {
        debugger
        //קריאה לשרת
    }
    const onInputChange = (key, e) => {
        let newSale = { ...sale };
        newSale[key] = e.target.value;
        setSale(newSale);
    }

    return <>
        <input id='saleDescription' placeholder='הכנס תיאור מבצע' onChange={e => onInputChange('description', e)}></input>
        <input id='saleStartDate' placeholder='הכנס תאריך התחלה' type="date" onChange={e => onInputChange('endDate', e)}></input>
        <input id='saleEndDate' placeholder='הכנס תאריך סיום' type="date" onChange={e => onInputChange('startDate', e)}></input>
        <button onClick={addSale} class="btn-gold-small">הוסף</button>
    </>
}

export default SaleComponent;