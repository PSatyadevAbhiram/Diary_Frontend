import React, {useState} from 'react';
import { useRouter } from 'next/router';

function Auth(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();
    
    const handleusername = (e) => {
        setUsername(e.target.value);
    }
    const handlepassword = (e) => {
        setPassword(e.target.value);
    }
    const handlelogin = () => {
        if(username === 'admin' && password === 'admin'){
            setIsAuthenticated(true);
            router.push('/home');
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            {isAuthenticated ? <h1>Hello Admin</h1> : 
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" onChange={handleusername}/>
                <input type="password" placeholder="password" onChange={handlepassword}/>
                <button type="submit" onClick={handlelogin}>Login</button>
            </form>}
        </div>
    );
}

export default Auth;