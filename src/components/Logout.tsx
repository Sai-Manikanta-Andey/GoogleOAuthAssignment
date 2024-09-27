import { GoogleLogout } from "react-google-login";

export default function Logout() {
const onLogoutSuccess = () => {
    console.log("Logout made successfully");
}

    return (
        <div>
            <GoogleLogout
                clientId={`${import.meta.env.CLIENT_ID}`}
                buttonText="Logout" onLogoutSuccess={onLogoutSuccess}
            />
        </div>
    );
}