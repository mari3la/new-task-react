import React from "react";
import { Button, TextField, Stack } from '@mui/material';
// images
import imagen from '../assets/images/assignment.png'

function CreateNewTask(props) {
const [text, setText] = React.useState('');

  const handleAddNewTask = () => {
    if(text) {
      props.tasks.push({
        name: text,
        check: false
      })
    }
    setText('')
    props.saveTasks(props.tasks)
  }

  const handleChangeTask = (e) => {
    setText(e.target.value)
  }

  return (
    <div id="item-container" className="container mx-auto rounded-xl shadow-2xl border p-10 bg-white">
        <div className="flex flex-col">
            <span className="text-4xl text-pink-900 font-bold">Create new task</span>
            <Stack>
                <div className="mt-12 pr-5">
                <span>Task Name</span>
                <TextField
                    placeholder="Lunch rocket to the moon"
                    id="margin-normal"
                    margin="normal"
                    fullWidth
                    value={text}
                    onChange={handleChangeTask}
                />
                <Button variant="contained" style={{backgroundColor: "#880e4f"}} onClick={handleAddNewTask}>Create task</Button>
                </div>
                <div className="pt-12">
                    <img
                        src={`${imagen}?w=161&fit=crop&auto=format`}
                        alt="imagen"
                        loading="lazy"
                    />
                </div>
            </Stack>
        </div>
    </div>
  );
}

export default CreateNewTask;
