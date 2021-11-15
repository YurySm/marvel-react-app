import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} style={{display: 'block', margin: '0 auto'}} alt="Error"/>
    )
}

export default ErrorMessage;