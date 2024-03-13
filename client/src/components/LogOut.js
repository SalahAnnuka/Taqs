import { useNavigate } from "react-router-dom";


function LogOut({Username}){

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await fetch(`http://localhost:7777/logout/${Username}`, {
                method: 'POST',
            });
    
            const data = await response.json();
            if (data === "success") {
                // Handle successful logout here, e.g., redirect to login page or update state
                console.log("Logout successful");
                navigate("/");
                window.location.reload();
            } else if (data === "user not found") {
                // Handle case where user is not found
                console.log("User not found");
            } else {
                // Handle other failure cases
                console.log("Logout failed");
            }
        } catch (error) {
            // Handle error if fetch fails
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className='logout-button' onClick={handleLogout}>Log out</div>
    );

}

export default LogOut;