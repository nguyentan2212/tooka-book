import { useState } from 'react';
import{ getToken, saveToken} from '../utilities/token';

export default function useUser(){
    const [user, setUser] = useState();

    const saveUser = user =>{
        saveToken(user.accessToken);
        setUser(user);
    };

    return {
        user,
        setUser: saveUser
    }
}