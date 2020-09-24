import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from "@material-ui/styles";
import color from '@material-ui/core/colors/amber';

const useStyles = makeStyles(theme => ({
  
  customTooltip : {
    fontSize : '18px',
     fontFamily: "ProximaNova-Bold",
     padding: '10px',
     borderRadius: '6px',
     color : "#fff",
     backgroundColor : '#17a2b8'
 
  },
  customTitle : {
    backgroundColor : '#daca9e !important',
    border : '1px solid #9b9b9b',
    minWidth : '200px',
    maxWidth : '300px',
    borderRadius : '1px solid #9b9b9b',
    padding : '10px',
    fontSize : '16px',
    lineHeight : '26px',
    textAlign : 'center',
    fontFamily : 'ProximaNova-Bold'
  }

}))


const  MyTooltip = (props) =>  {
  const classes = useStyles();

  const [open , setOpen ] = useState(false)
  
  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }
    return (
      <React.Fragment>
        <Tooltip
          open={open}
          title={props.title}
          placement={props.placement}
          onOpen={handleOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
          classes={{ tooltip : props.customTitle ?  classes.customTitle  : classes.customTooltip  }}
        >
        {props.children}
        </Tooltip>
      </React.Fragment>
        
    )
}

MyTooltip.defaultProps = {
  placement : 'top'
}

export default MyTooltip;