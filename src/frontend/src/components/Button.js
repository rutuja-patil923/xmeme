import PropTypes from 'prop-types'

const Button = ({color,text,onClick}) => {
    return (
        <button className='button'
            style={{backgroundColor:color}}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
