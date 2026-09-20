import React, { useState, useEffect } from "react"; 
import axios from "axios";

function App() {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [usersList, setUsersList] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  const handelData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setError({});
  };

  const readDataFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Data");
      if (response.data.success) {
        setUsersList(response.data.usersData); 
      }
    } catch (err) {
      console.error("Error reading data:", err);
    }
  };

  useEffect(() => {
    readDataFromServer();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUserId) {
        // 1. Send the updated info to your backend server
        const response = await axios.post(`http://localhost:3000/update/${editUserId}`, {
          name: FormData.name,
          email: FormData.email,
          password: FormData.password,
        });
        
        console.log("Update server response:", response.data);

        // 2. Client-side replacement: Map through state, find the old object, and replace it completely
        setUsersList((prevList) =>
          prevList.map((user) =>
            user._id === editUserId
              ? { ...user, name: FormData.name, email: FormData.email, password: FormData.password }
              : user
          )
        );

        setEditUserId(null); // Exit edit mode
      } else {
        // Create new user registration
        await axios.post("http://localhost:3000/Register", {
          name: FormData.name,
          email: FormData.email,
          password: FormData.password,
        });
      }
      
      // 3. Re-sync with backend to guarantee database alignment
      readDataFromServer();
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handelDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      if (id === editUserId) cancelEdit();
      readDataFromServer();
    } catch (err) {
      console.error("Deletion failed:", err);
    }
  };

  const startEdit = (user) => {
    setEditUserId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800 antialiased">
      {/* Form Container Card */}
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="mb-6 text-xl font-bold text-slate-900 text-center">
          {editUserId ? "✏️ Edit Account Info" : "User Registration"}
        </h2>
        
        <form onSubmit={handelSubmit} className="space-y-4">
          <div>
            <input
              onChange={handelData}
              name="name"
              value={FormData.name}
              type="text"
              placeholder="Enter Your Name"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          
          <div>
            <input
              onChange={handelData}
              name="email"
              value={FormData.email}
              type="email"
              placeholder="Enter Your Email"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          
          <div>
            <input
              onChange={handelData}
              name="password"
              value={FormData.password}
              type="password"
              placeholder="Enter Your Password"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-2">
            {editUserId && (
              <button 
                type="button"
                onClick={cancelEdit}
                className="flex-1 cursor-pointer rounded-lg bg-slate-100 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-98"
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              className={`flex-1 cursor-pointer rounded-lg px-4 py-2.5 font-semibold text-white transition active:scale-98 ${
                editUserId ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {editUserId ? "Save Changes" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Users List Container */}
      <div className="mx-auto mt-10 max-w-4xl">
        <h3 className="mb-4 text-lg font-semibold text-slate-700">Registered Accounts</h3>
        
        {usersList.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-6 bg-white rounded-xl border border-dashed border-slate-200">
            No registered accounts found in the database.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {usersList.map((user) => (
              <div 
                key={user._id} 
                className={`flex flex-col justify-between rounded-xl border bg-white p-5 shadow-xs transition hover:shadow-sm ${
                  editUserId === user._id ? "border-amber-400 ring-2 ring-amber-100" : "border-slate-200"
                }`}
              >
                <div className="space-y-1.5 mb-4">
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                    {editUserId === user._id ? "⚡ Currently Editing" : "Account Information"}
                  </p>
                  <h4 className="text-base font-semibold text-slate-800"><span className="font-normal text-slate-500">Name:</span> {user.name}</h4>
                  <p className="text-sm text-slate-600"><span className="font-normal text-slate-500">Email:</span> {user.email}</p>
                  <p className="text-sm text-slate-600"><span className="font-normal text-slate-500">Password:</span> {user.password}</p>
                </div>
                
                <div className="flex gap-2 border-t border-slate-100 pt-3">
                  <button 
                    onClick={() => startEdit(user)}
                    className="flex-1 cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handelDelete(user._id)}
                    className="flex-1 cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
