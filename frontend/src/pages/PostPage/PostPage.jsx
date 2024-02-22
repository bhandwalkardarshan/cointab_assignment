import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../components/styles.css'

const PostPage = () => {
  const { id } = useParams();
//   console.log(id)
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showDownloadInExcel, setshowDownloadInExcel] = useState(false); 
  const baseURL = 'http://localhost:3031';

  useEffect(() => {
    // Fetch user data
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });

    // Fetch posts for the specific userId
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [id]);

  const handleBulkAddClick = async () => {
    setshowDownloadInExcel(true)
    // Implement your logic for bulk adding posts here
    const response = await axios.post(`${baseURL}/bulk/posts`, posts );
    // console.log(response)
    alert(response.data.message)
    
  };

  const handleDownloadExcelClick = async () => {
    // Logic for Download In Excel button click
    console.log('Download In Excel clicked');
    try {
        const response = await axios.post(`${baseURL}/download`, posts, {
            responseType: 'blob' // Treat response as a blob (binary data)
        });

        // Create a blob object from the response data
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a temporary anchor element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'exported.xlsx'); // Set the filename for download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading Excel file:', error);
        // Handle error appropriately, e.g., show an error message to the user
    }
    
  };

  return (
    <div className='postpagecontainer'>
      {user && (
        <div>
          <h2>User Information:</h2>
          <p>Name: {user.name}</p>
          <p>Company: {user.company.name}</p>
        </div>
      )}
         {/* Buttons section */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleBulkAddClick}>Bulk Add</button>
        {showDownloadInExcel && (
            <button onClick={handleDownloadExcelClick}>Download In Excel</button>
        )}
      </div>

      <h2>Posts:</h2>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
