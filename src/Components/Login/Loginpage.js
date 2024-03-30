import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser} from '../../Hooks/UserSlice'; // Import loginUser

function Loginpage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            // Dispatch loginUser action with email and password
            await dispatch(loginUser(email, password));
       
            // If login is successful, fetch user info
          
       
            // Close the login popup upon successful login
            props.setTrigger(false);
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login failure, e.g., show error message
        }
    };

    return (props.trigger) ? (
        <div className='popup'>
            <h1 className="text-center text-zinc-900 text-[40px] font-bold font-['Bitter'] leading-[56px]">Join ITEC</h1>
            <p className="w-[503px] h-7 text-center text-zinc-900 text-base font-normal font-['Raleway'] leading-relaxed">We never post or share anything on your social without asking.</p>
            <label className='username flex flex-col text-left'>
                Email:
                <input
                    type="text"
                    className="login-input"
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                Password:
                <input
                    type="password"
                    className="login-input"
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>


            <div className='popup-inner'>
                <button
                    className='btn login-btn hover:bg-blue-800'
                    onClick={handleSubmit}
                >
                    Login
                </button>
                <button
                    className='btn close-btn'
                    onClick={() => props.setTrigger(false)}
                >
                    Close
                </button>
            </div>
        </div>
    ) : null;
}

export default Loginpage;
