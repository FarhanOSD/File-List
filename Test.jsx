import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

function Tast2() {


  // State declarations
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [file, setFile] = useState(null);
  const [state, setState] = useState('');
  const [files, setFiles] = useState(getDatafromLS());


  // Get data from localStorage
  function getDatafromLS() {
    const dataLs = localStorage.getItem('files');
    return dataLs ? JSON.parse(dataLs) : [];
  }


  // Save to localStorage when files state changes
  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files));
  }, [files]);



  // Handle form submission
  const handleFormData = e => {
    e.preventDefault();
    if (!id || !firstName || !lastName || !state || !file) {
      alert('Please fill out all fields');
      return;
    }



    // Check for duplicate IDs
    if (files.some(item => item.id === id)) {
      alert('ID must be unique');
      return;
    }



    const data = {
      id,
      firstname: firstName,
      last_name: lastName,
      file_: file.name,
      state,
    };



    setFiles([...files, data]);
    setId('');
    setFirstName('');
    setLastName('');
    setState('');
    setFile(null);
  };



  // Delete a single item
  const deleteItem = deleteId => {
    const filteredItems = files.filter(item => item.id !== deleteId);
    setFiles(filteredItems);
  };



  // Remove all items
  const handleRemoveAll = () => setFiles([]);



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">


      {/* Form */}
      <form
        onSubmit={handleFormData}
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        
        {/* ID Input */}
        <div className="mb-6">
          <label className="block text-gray-300 font-bold mb-2">ID</label>
          <input
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            className="w-full p-3 rounded bg-gray-200"
          />
        </div>

        {/* First Name and Last Name Inputs */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-1/2 p-3 rounded bg-gray-200"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="w-1/2 p-3 rounded bg-gray-200"
          />
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-gray-300 font-bold mb-2">File</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="w-full p-3 rounded bg-gray-200"
          />
        </div>

        {/* State Input */}
        <div className="mb-6">
          <label className="block text-gray-300 font-bold mb-2">State</label>
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={e => setState(e.target.value)}
            className="w-full p-3 rounded bg-gray-200"
          />
        </div>

        <button className="w-full p-3 bg-green-600 text-white rounded">
          Submit
        </button>
      </form>

      {/* Data Display */}
      <div className="w-full mt-10">
        {files.length > 0 ? (
          <table className="w-full text-gray-300">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>File</th>
                <th>State</th>
                <th>ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(item => (
                <tr key={item.id}>
                  <td>{item.firstname}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <a
                      href={URL.createObjectURL(new Blob([item.file_]))}
                      download={item.file_}
                      className="text-blue-400 underline"
                    >
                      {item.file_}
                    </a>
                  </td>
                  <td>{item.state}</td>
                  <td>{item.id}</td>
                  <td>
                    <button onClick={() => deleteItem(item.id)}>
                      <MdDelete className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-gray-300">No data added yet!</h2>
        )}
        {files.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="w-full p-3 bg-red-600 text-white rounded mt-4"
          >
            Remove All
          </button>
        )}
      </div>
    </div>
  );
}

export default Tast2;
