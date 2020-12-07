import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import {  createMuiTheme, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from "@material-ui/styles";
import MyTooltip from "../MyTooltip";

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#2D6DCD',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#2D6DCD',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2498D5',
      },
      '&:hover fieldset': {
        borderColor: '#2498D5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2498D5',
      },
    },
  }

})(TextField)

const theme = createMuiTheme({

  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
        '&:focus': {
          webkitboxShadow: '0 0 0 30px black inset !important',
        },
        '&:active': {
          webkitboxShadow: 'black !important'
        }
      },
    },
      MuiIconButton : {
        root : {
          '&:focus' : {
            outline : 'none'
          }
        }
      }
  }
})

class TextFieldInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
  }

  handleInputChange = (e) => {
    this.props.handleChange(e)
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }
  
  render() {
    const classes = this.props;
    return (
      <div className = "text-field-input">
        <ThemeProvider theme={theme}>
          {
            this.props.auth ?
            (
                this.props.hoverMsg ? 
                (
                  <div style={{ height : '15px', width : '100%', position : 'relative' }}>
                  <MyTooltip title={this.props.hoverMsg} customTitle={this.props.customTooltipStyle} >
                    <i
                    className="fas fa-info-circle"
                    style={{
                        color: '#daca9e',
                        cursor: 'pointer',
                        fontSize: '18px',
                        position: 'absolute',
                        top: '-7px',
                        right :'6px'
                    }}
                ></i>
                  </MyTooltip>
                  </div>
                )
                :
                <div style={{ height : '0px', width : '100%'}} >
                </div>
            )
            :
            <div style={{ height : '10px', width : '100%'}} >
            </div>
          }
          <CssTextField
            className={classes.useStyles}
            id={this.props.id}
            label={this.props.label}
            name={this.props.name}
            placeholder={this.props.placeholder}
            inputRef={this.props.inputRef}
            maxLength={this.props.maxLength}
            variant="outlined"
            rows={this.props.rows}
            multiline={this.props.multiline ? true : false}
            disabled={this.props.disabled ? true : false}
            requied={this.props.requied}
            fullWidth
            type={(!this.state.showPassword) ? this.props.type : 'text'}
            value={this.props.value}
            onChange={this.state.handleInputChange}
            style={{ WebkitBackgroundColor: this.state.backgroundColor }}
            InputProps={
              this.props.type === 'password' ?
                (
                  {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          disableRipple
                        >
                          {this.state.showPassword ? <Visibility style={{ fontSize: '17px' }} /> : <VisibilityOff style={{ fontSize: '17px' }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    minLength: this.props.minLength,
                    onChange: (e) => this.handleInputChange(e),
                    style: this.props.inputStyle,
                  }
                )
                :
                (
                  this.props.type === "number" ?
                  (
                    {
                    step : 'any',
                    minLength : this.props.minLength,
                    maxLength : this.props.maxLength,
                    onChange: (e) => this.handleInputChange(e),
                    style: this.props.inputStyle
                  }
                  )
                  :
                  this.props.type === "date" ?
                  (
                    {
                    shrink : 'false',
                    onChange: (e) => this.handleInputChange(e),
                    style: this.props.inputStyle
                  }
                  ):
                  (
                    {
                      minLength: this.props.minLength,
                      onChange: (e) => this.handleInputChange(e),
                      style : this.props.inputStyle
                    }
                  )
                )
            }
            InputLabelProps={
              this.props.shrink == false ?
                (
                  {
                    shrink: true,
                    style: {
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#9b9b9b',
                      borderColor: '9b9b9b'
                    }
                  }
                )
                :
                (
                  {
                    style: {
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#9b9b9b',
                      borderColor: '9b9b9b'
                    }
                  }
                )
            }
          />
        </ThemeProvider>
      </div>
    )
  }
}

TextFieldInput.propTypes = {
  type:PropTypes.string,
  label:PropTypes.string,
  name:PropTypes.string,
  id:PropTypes.string,
  required:PropTypes.bool,
  auth:PropTypes.bool,
  inputStyle:PropTypes.object,
  handleChange:PropTypes.func,
  defaultValue:PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  handleClickShowPassword: PropTypes.func,
  disabled:PropTypes.bool,
  shrink:PropTypes.bool,
  autoFocus:PropTypes.bool,
  multiline:PropTypes.bool,
  backgroundColor:PropTypes.bool
};

export default TextFieldInput;


