


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup'; // Import the Popup component

const HomePage = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState(null); // State for the popup message

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/get-users`);
                setFriends(response.data.data.sort((a, b) => b.Points - a.Points));
            } catch (error) {
                console.error('Error fetching friends:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    const handleClaimPoints = async (friendUsername) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/claim-points`, {
                username: friendUsername,
            });

            const updatedPointFriends = friends.map((friend) =>
                friend.username === friendUsername
                    ? { ...friend, Points: response.data.data.Points }
                    : friend
            );

            updatedPointFriends.sort((a, b) => b.Points - a.Points);
            setFriends(updatedPointFriends);
            
            // Set popup message
            setPopupMessage(`Points claimed successfully for ${friendUsername}!`);
            
            // Automatically close the popup after a few seconds
            setTimeout(() => {
                setPopupMessage(null);
            }, 3000); // Adjust the duration as needed

        } catch (error) {
            console.error('Error updating points:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    // Get the top 3 friends
    const topFriends = friends.slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col items-center bg-blue-100 p-6">
            
            {/* Buttons Section */}
            <div className="buttons gap-2 flex mb-4">
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                    <h1 className="text-2xl font-semibold text-gray-800 rounded-sm">Daily</h1>
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                    <h1 className="text-2xl font-semibold text-gray-800 rounded-sm">Weekly</h1>
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                    <h1 className="text-2xl font-semibold text-gray-800 rounded-sm">Monthly</h1>
                </button>
            </div>

            {/* Top 3 Friends Section */}
            


<div className="bg-white p-4 shadow rounded-lg mb-4">
                <h2 className="text-xl font-semibold mb-4  justify-center">Top 3 </h2>
                <div className="flex justify-between">
                    {topFriends.map((friend, index) => (
                        <div key={friend._id} className="flex flex-col items-center mx-2"> {/* Added horizontal margin */}
                            <span className="font-semibold">{index + 1}. {friend.username}</span>
                            <span>{friend.Points} Points</span>
                            <span className="text-orange-500 font-bold">{friend.Points} Prize</span>
                        </div>
                    ))}
                </div>
            </div>


            {/* Leaderboard Table */}
            <table className="min-w-full bg-purple-50 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-white text-violet-700">
                    <tr>
                        <th className="p-4 text-left">Rank</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {friends.map((friend, index) => (
                        <tr
                            key={friend._id}
                            onClick={() => handleClaimPoints(friend.username)}
                            className="cursor-pointer transition hover:bg-violet-100 border-b last:border-none"
                        >
                            <td className="p-4 text-gray-700 font-medium">{index + 1}</td>
                            <td className="p-4 text-gray-800 font-semibold">{friend.username}</td>
                            <td className="p-4 text-gray-700">{friend.Points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4 text-sm text-gray-500">Click on a name to increase points and update rankings</p>

            {/* Popup Message */}
            {popupMessage && (
                <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
            )}
        </div>
    );
};

export default HomePage;
