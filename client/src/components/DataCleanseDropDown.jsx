import React, {useState} from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const DataCleanseDropDown = ({functionNames, onSelectChange}) => {
    
    const options = functionNames.map(({ _id, function_name }) => ({
        label: function_name,
        value: _id
    }));

    const handleSelectChange = (selectedOptions) => {
        const selectedFunctionNames = selectedOptions.map(option => option.value);
        
        onSelectChange(selectedFunctionNames)
    };

    console.log("these are function Names ---->", functionNames)
    return (
        <div> 
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={null}
                isMulti
                options={options}
                onChange={handleSelectChange}
                name="functionNames"
            />
        </div>
    )
}

export default DataCleanseDropDown