import React from "react";
import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import {Stack, Checkbox, IconButton, FormControl, OutlinedInput, Paper, InputAdornment, CircularProgress} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// components 
import ItemTask from './ItemTask'

const gradientText = {
  backgroundImage: 'linear-gradient(45deg, #880e4f, #52dafe)',
  backgroundSize: '100%',
  backgroundRepeat: 'repeat',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent'
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#880e4f' : '#880e4f',
  },
}));

function ListTask(props) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        let filterCheck = props.tasks.filter(i => i.check)
        let result = (filterCheck.length * 100) / props.tasks.length
        setProgress(result)
    }, [props.tasks]);

    const completeTasks = props.tasks.filter(i => i.check).length

    const handleChange = (e, index) => {
        props.tasks[index].check = !props.tasks[index].check
        props.saveTasks(props.tasks)
    }

    const handleDeleteItem = (index) => {
        props.tasks.splice(index, 1)
        props.saveTasks(props.tasks)
    }

  return (
    <div className="container mx-auto px-5">
        <Stack spacing={2}>
            <Stack spacing={2} style={{height: '20vh'}}>
                <span className="text-6xl font-bold text-center" style={gradientText}>Your tasks</span>
                <div className="flex flex-col">
                    <span className="text-right w-full font-bold" style={{color: '#880e4f'}}>{completeTasks + '/' + props.tasks.length}</span>
                    <BorderLinearProgress variant="determinate" value={progress} />
                </div>
                <Paper className="flex items-center rounded-5 bg-gray-200" elevation={0}>
                <FormControl variant="standard" style={{width: '100%'}}>
                    <OutlinedInput
                        id="outlined-adornment"
                        type="text"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle visibility"
                                    edge="end"
                                    onClick={props.handleCleanSearch}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        placeholder="Buscar tarea"
                        value={props.searchText}
                        onChange={(e) => {props.handleFilterTask(e)}}
                    />
                </FormControl>
                </Paper>
            </Stack>
            {props.loading ?
                <div className=" flex justify-center items-center h-64">
                    <CircularProgress
                        size={95}
                        sx={{
                            color: (theme) => {
                                return theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
                            },
                        }}
                    />
                </div>
            :
                <div style={{height: '60vh'}}>
                {!props.filterTasks.length ?
                    <div className="container mx-auto rounded-xl p-10 text-center bg-white">
                        <FormatListBulletedIcon sx={{ fontSize: 145 }} className="text-pink-900"/>
                        <p className="text-lg font-medium text-pink-900">No hay resultados</p>
                    </div>
                :
                    <div className=" py-4" style={{height: document.getElementById('item-container') ? (document.getElementById('item-container').offsetHeight / 1.5) : 500, overflowY: 'scroll' }}>
                        {props.filterTasks.map((item, index) => {
                            return(
                                <ItemTask
                                    key={index}
                                    task={item}
                                    handleDeleteItem={() => { handleDeleteItem(index) }}
                                    handleChange={(e) => { handleChange(e, index) }}
                                />
                            )
                        })}
                    </div>
                }
                </div>
            }
        </Stack>
    </div>
  );
}

export default ListTask;
