import React, {useState} from 'react';
import './Loginpage.css';

function Loginpage(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        // Here you can access username and password values
        console.log("Username:", username);
        console.log("Password:", password);
        // You can perform further actions such as sending data to a server for authentication
    };

    return(props.trigger) ? (
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
                onChange={(e)=>setUsername(e.target.value)}
                />
                Password:
                <input
                 type="password" 
                 className="login-input" 
                 placeholder='Enter Password'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
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
                 onClick={()=>props.setTrigger(false)}
                >
                    Close
                </button>
            </div>
        </div>
    ) : "";
}

export default Loginpage;