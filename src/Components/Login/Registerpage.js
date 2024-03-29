import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Hooks/UserSlice';
import './Registerpage.css';

function Registerpage(props){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === repassword) {
            dispatch(registerUser(username, email, password));
        } else {
            // Handle password mismatch error
            console.error("Password mismatch");
        }
    }
    return(props.trigger) ? (
        <div className='popup'>
            <h1 className="text-center text-zinc-900 text-[40px] font-bold font-['Bitter'] leading-[56px]">Join ITEC</h1>
            <p className="w-[503px] h-7 text-center text-zinc-900 text-base font-normal font-['Raleway'] leading-relaxed">We never post or share anything on your social without asking.</p>
            <label className='username flex flex-col text-left'>
                Username:
                <input type="text" className="login-input" placeholder='Enter User Name' value={username} onChange={(e) => setUsername(e.target.value)}/>
                Email:
                <input type="text" className="email-input" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                Password:
                <input type="password" className="password-input" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                Confirm Password:
                <input type="Password" className="repassword-input" placeholder='Enter Confirm Password' value={repassword} onChange={(e) => setRepassword(e.target.value)}/>
            </label>
            
            
            <div className='popup-inner'>
                <button
                    className='btn register-btn'
                    onClick={handleSubmit}
                >
                    Register
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

export default Registerpage;