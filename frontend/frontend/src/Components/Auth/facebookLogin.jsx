import FacebookLogin from 'react-facebook-login';

const FacebookLoginn=()=>{
    const fbResponse = (response) => {
        console.log(response);
      }
    return(
        <div>
            <FacebookLogin
                appId="576311900365803"
                autoLoad={true}
                textButton="LOGIN WITH FACEBOOK"
                fields="name,email,picture"
                callback={fbResponse}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            />
        </div>
    )
}
export default FacebookLoginn;