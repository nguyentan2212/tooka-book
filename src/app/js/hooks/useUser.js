import { useState } from 'react';
import{ getToken, saveToken} from '../utilities/token';

export default function useUser(){
    const [user, setUser] = useState(getToken());

    const saveUser = user =>{
        saveToken(user);
        setUser(user);
    };

    return {
        user,
        setUser: saveUser
    }
}