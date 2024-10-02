import { Fragment } from "react";
import { Dialog, DialogActions, DialogTitle , Button} from "@mui/material";
function TodoDetails({showdetails,tododetails,setShowdetails,setTododetails}){
    return <Fragment>
        <Dialog open={showdetails} onClose={() => setShowdetails(false)}>
            <DialogTitle>{ tododetails?.todo}</DialogTitle>
            <DialogActions>
                <Button 
                      onClick={() =>{  setShowdetails(false) 
                                        setTododetails(null)
                                    }
                      }
                >Close</Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

export default TodoDetails;