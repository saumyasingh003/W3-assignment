import React from "react";
import { Toaster } from "react-hot-toast";
import UserTable from "../src/components/UserTable";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <UserTable />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
