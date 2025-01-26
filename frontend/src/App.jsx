// src/App.jsx
import React from 'react';
import UserForm from './components/UserForm';
import { Toaster } from 'react-hot-toast';  // Import toast notifications

function App() {
    return (
        <div className="">
            <Toaster position="top-right" reverseOrder={false} />  {/* Toast notifications container */}
            
            
            <div className="bg-gray-50 flex items-center justify-center">
                <UserForm />  
            </div>
        </div>
    );
}

export default App;
