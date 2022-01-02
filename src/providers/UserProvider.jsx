import React, { createContext, useState } from 'react';

//create a context, with createContext api
export const UserContext = createContext();

const UserProvider = (props) => {
    const [userDetails, setUserDetails] = useState({});

    return (
        // this is the provider providing state
        <UserContext.Provider value={[userDetails, setUserDetails]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;