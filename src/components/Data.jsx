import React from 'react';
import PropTypes from 'prop-types';
import StepsModel from "../models/StepsModel";

Data.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.instanceOf(StepsModel)),
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

function Data(props) {
    const { steps,onEdit,onDelete }=props;
    const onElEdit = ((evt,id) => {
        evt.preventDefault();
            onEdit(id);
        });
    const onElDelete = ((evt,id) => {
        evt.preventDefault();
            onDelete(id);
    });
    return (
        <div className={'results'}>
            <div className={"header"} >
                <div className={"head-element"}>Дата (ДД.ММ.ГГ)</div>
                <div className={"head-element"}>Пройдено км.</div>
                <div className={"head-element"}>Действия</div>
            </div>
            <div className={'container'} >
                {steps.sort((a,b)=>
                    (a.timestamp>b.timestamp)? 1 : (a.timestamp===b.timestamp) ? 0 : -1).map(
                    step=><div className={'container-line'} key={step.id}>
                    <form>
                        <div className={'container-element'}>{step.date}</div>
                        <div className={'container-element'}>{step.dist.toFixed(1)}</div>
                        <div className={'actions container-element'}>
                            <span><button onClick={(evt) => onElEdit(evt,step.id)} name={"edit"}>✎</button></span>
                            <span><button onClick={(evt) => onElDelete(evt,step.id)} name={"delete"}>✘</button></span>
                        </div>
                    </form>
                </div>)}
            </div>
        </div>
    );
}

export default Data;