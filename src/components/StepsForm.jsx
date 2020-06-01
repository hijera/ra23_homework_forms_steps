import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InputForm from "./InputForm";
import Data from "./Data";
import StepsModel from "../models/StepsModel";

StepsForm.propTypes = {

};

function getTimestamp(date)
{
    const dataparts=date.split('.');
    return Math.round(new Date('20' + dataparts[2], dataparts[1] - 1, dataparts[0]).getTime()) / 1000;
}

function StepsForm(props) {
    const [steps,setSteps] = useState([]);
    const [editObj,setEditObj] = useState(null);
    const [buttonName,setButtonName] = useState('OK');
    const addData = params => {
        if (!params.isEdit)
        {
            const foundItem=steps.findIndex(step=>(step.date===params.date))
            console.log(foundItem);
                setSteps(steps=> {
                   if (foundItem===-1) {
                       return [...steps, new StepsModel(params.date, params.dist)]
                   }
                   else
                   {
                       steps[foundItem].dist=parseFloat(steps[foundItem].dist)+parseFloat(params.dist);
                       steps[foundItem].timestamp=getTimestamp(params.date);
                       return [...steps]
                   }
                });
        }
        else
        {
            setSteps(steps.map(step=>(
                (step.id===params.id) ?
                    {...step,date:params.date,dist:parseFloat(params.dist),timestamp:getTimestamp(params.date)} :
                    step )
            ));
        }
        setEditObj(null);

    };
    const onEdit = id =>{
        console.log(id);
        const foundStep=steps.find((step)=>(step.id===id));
        setEditObj(foundStep);

    };
    const onDelete = id => {
        setSteps(steps.filter(step=>step.id!==id));
    };
    return (
        <div class={'app-form'}>
            <InputForm submitFunc={addData} editObj={editObj}  />
            <Data steps={steps} onEdit={onEdit} onDelete={onDelete}/>
        </div>
    );
}

export default StepsForm;