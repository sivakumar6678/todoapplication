import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";

 function TodoItem({todo,fetchsingletodo}) {
    //  console.log("Todo Item",todo);
    return (
        <Card sx={{
            maxWidth: 545,
            margin: '10px auto',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <CardContent>
                <Typography variant="h5" color={'text.secondary'}>
                    {todo?.todo}
                </Typography>
            </CardContent>
            <CardActions sx={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'lightgray',

            }}>
                <Button sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    opacity: '0.6',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: 'yellow',
                        opacity: '1',
                    }
                    }}
                    onClick={() => fetchsingletodo(todo?.id)} >Show Deatils</Button>
            </CardActions>
        </Card>
    )
 }

 export default TodoItem;