import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Hooks/authActions'; // Assuming you have an action to handle login

function Loginpage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            // Dispatch login action with username and password
            await dispatch(loginUser({ username, password }));
       
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
                Username:
                <input
                    type="text"
                    className="login-input"
                    placeholder='Enter User Name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className='btn login-btn'
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
