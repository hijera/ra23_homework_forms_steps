import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import StepsModel from "../models/StepsModel";
InputForm.propTypes = {
    submitFunc: PropTypes.func.isRequired,
    editObj: PropTypes.instanceOf(StepsModel)
};

function InputForm(props) {
    const { submitFunc,editObj } = props;
    const [localParams,setParams] = useState({
        date:'',
        dist:'',
        isEdit:false,
        id:null,
    });
    /* Единственный способ который я отрыл чтобы отредактировать элемент */
    useEffect(() => {
        if (editObj && editObj.id!==null)
        {
        setParams({...editObj,isEdit:true});
        }
    }, [editObj]);

    const dateController = evt =>{
        const { target } = evt;
        const template='11.11.11';
        const joinedString = target.value+template.slice(target.value.length);
        const templateMatch = (joinedString.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[0-9]|1[0-2])\.[0-9]{2}$/)!==null);
        return (templateMatch);
    };
    const distController = evt => {
        const { target } = evt;
        return (target.value.match(/^[0-9]+(\.[0-9]*?)?$/)!==null);
    };

    const form = [
        {type:'text',name:'date',valueName:'date',label:'Дата (ДД.ММ.ГГ)',inputController:dateController},
        {type:'text',name:'dist',valueName:'dist',label:'Пройдено км.',inputController:distController}
    ];

    const getFormValue = evt => {
       return editObj ? 'Изменить' : 'ОК';
    };

    const formSubmit = evt => {
        evt.preventDefault();
        if (editObj)
        {
            setParams({...localParams,isEdit:true,id:editObj.id});
        }
        submitFunc(localParams);
        setParams({date:'',dist:'',isEdit:false,id:null});
    };

    const formChange = evt => {
        const { target } = evt;
        const object=form.find(item=>{ return (item.name==target.name)});
        if (typeof object.inputController !== 'undefined')
        {
            if (object.inputController(evt)===false)
                evt.preventDefault();
            else
                setParams({...localParams,[target.name] : target.value})
        }
        else
        {
            setParams({...localParams,[target.name] : target.value})
        }
    };






    return (
        <div  >
            <form className={"input-form"} onSubmit={formSubmit}>
                {form.map(item=><div className={"form-input-element"} key={'div'+item.name}>
                    <label>{item.label}</label>
                    <input  key={item.name} name={item.name} value={localParams[item.valueName]} onChange={formChange} /></div>)}
                <div className={'form-input-element'} >
                    <div className={"empty-block"} />
                    <input type="submit" value={getFormValue()} />
                </div>
            </form>
        </div>
    );
}

export default InputForm;