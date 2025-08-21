/*********************************1: Imports / react *************************************/
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/ 
import { Accordion, AccordionTab } from 'primereact/accordion';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { Chip } from 'primereact/chip';

/*********************************3: Imports / custom css ********************************/

/*********************************4: Imports config ********************************/
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

/*********************************5: Start : Application Code ********************************/
interface BlogData {
  id: string;
  blogId: string;
  blogImage: string;
  authorIcon: string;
  publicationDate:Date;
  title: string;
  content: string;
}

const ViewBlog: React.FC = () => {
  // Use a union type for the state that can be an object or null
  const [currentBlog, setCurrentBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const currentBlogState = location.state?.blogData as BlogData;

  // The 'blogData' is probably just the ID, which is safer to get from the URL
  // If possible, use useParams() instead: const { id } = useParams();

  useEffect(() => {
    // Only fetch data if blogData exists
    if (!currentBlogState) {
      setError("No blog data passed to this page.");
      setLoading(false);
      return;
    }
    
    // Async function to handle the API call
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          config.API_URL + "/api/blogs/" + currentBlogState.id,
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        );
        // Correct: Set state only after the data has been successfully fetched
        setCurrentBlog(response.data);
      } catch (err) {
        console.error("Failed to fetch blog data:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        // Correct: Always set loading to false when the request completes
        setLoading(false);
      }
    };
    
    // Call the async function
    fetchBlogData();
    
    // The dependency array now includes currentBlogState
  }, [currentBlogState]); // React now knows to re-run the effect if this variable changes

  if (loading) {
    return <div>Loading blog post...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentBlog) {
      return <div>Blog not found.</div>;
  }

  return (
    <div className="w-90" style={{padding:'2rem'}}>
      <div className="grid">
        {/* ---------------------------------Banner------------------------------------ */} 
        <div className="col-12">
            <img src={currentBlog.blogImage} style={{width:'100%', height:'200px'}}/>
        </div> 
        {/* ----------------------------------Title--------------------------------------- */}
        <div className="col-12"><h1 style={{textAlign:'center'}}>{currentBlog.title}</h1></div>
      </div>
      {/* ----------------------------------User Blog Profile-------------------------- */}
      <div className="flex justify-content-center flex-wrap">
          <div className="flex align-items-center justify-content-center">
            <Avatar image={require( `../assets/images/event-organizers/${currentBlog.authorIcon}.png`)} className="mr-2" size="normal" shape="circle"/>
          </div>
          <div className="flex align-items-center justify-content-center">
            <span style={{verticalAlign:'middle', margin:'15px',fontFamily:'Lucida Handwriting', fontSize:'15px'}}><b>{"Aditi Rajaraman"}</b></span> 
          </div>
      </div>
    </div>
  );
};

export default ViewBlog;