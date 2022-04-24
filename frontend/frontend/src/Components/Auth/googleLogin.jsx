import GoogleLogin from 'react-google-login';


const GoogleLoginn=()=>{
    const responseGoogle = (response) => {
        console.log(response);
      }
    return(
        <div>
            <GoogleLogin
                clientId="85152679862-0r4ske989g87qjeh6vchajr8reh7uoj4.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
export default GoogleLoginn;