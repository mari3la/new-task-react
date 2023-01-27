import React from "react";
import { pink } from '@mui/material/colors';
import { Checkbox, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function ItemTask(props) {
    let { task } = props
    return (
        <div className={`container mx-auto rounded-lg mb-4 ${!task.check ? 'shadow-xl border' : ''}`} style={{backgroundColor: task.check ? '#fce4ec' : '#ffffff'}}>
            <div className="flex justify-between p-2">
                <div>
                    <Checkbox
                        checked={task.check}
                        onChange={(e) => {props.handleChange(e)}}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{
                        color: pink[900],
                        '&.Mui-checked': {
                            color: pink[900],
                        },
                        }}
                    />
                    <span style={{textDecoration: task.check ? 'line-through' : 'none'}}>{task.name}</span>
                </div>
                <div>
                    <IconButton aria-label="delete" onClick={() => {props.handleDeleteItem()}}>
                    <CloseIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default ItemTask;
