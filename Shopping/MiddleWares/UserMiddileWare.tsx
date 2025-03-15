import { Alert } from 'react-native'
import React, {} from 'react'
import axios from 'axios'
import { UserParam } from '../src/Types/HomeProps';
import { BASE_URL } from '../BASE_URL';

interface IUserProps {
    setGetUserId: React.Dispatch<React.SetStateAction<UserParam[]>>
    getUserId: string|null;
}

export const fetchUserById = async ({ getUserId, setGetUserId }: IUserProps) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/profile/${getUserId}`);

        if (response?.data?.result) {
            setGetUserId(response.data.result);
        } else {
            console.warn("No user found .");
            setGetUserId([]); 
        }

    } catch (err) {
        console.error("An error occurred :", err);
    }
};