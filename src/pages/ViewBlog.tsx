/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/*********************************2: Imports / primereact ********************************/ 
import { Accordion, AccordionTab } from 'primereact/accordion';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { Chip } from 'primereact/chip';
import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';


/*********************************3: Imports / custom css ********************************/
import '../assets/css/speeddial.css'

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

  const [content, setContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState<boolean>(true);

  const location = useLocation();
  const currentBlogState = location.state?.blogData as BlogData;

  const toast = useRef<any>(null);

  const navigate = useNavigate();
  const redirectToEditBlog = () => {
        navigate(`/editBlog?blogId=${currentBlog.blogId}`); 
  };
  const items = [
        {
            label: 'Send',
            icon: 'pi pi-send',
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            label: 'Bookmark',
            icon: 'pi pi-bookmark',
            command: () => {
                window.location.hash = "/fileupload"
            }
        },
        {
            label: 'Edit',
            icon: 'pi pi-user-edit',
            command: () => {
                redirectToEditBlog();
            }
        }
    ];

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
          config.API_URL + "/blogs/" + currentBlogState.id,
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

    const fetchContent = async () => {
      try {
        //const url = `https://${bucket}.s3.${region}.amazonaws.com/blogs/${blogId}.json`;
        //const url = 'https://blog.her-healing-initiative.org/BlogContent_e482eccf-066f-4c5c-9e6d-1628900c5988.html';
        const filename = `BlogContent_${currentBlogState.blogId}.html`
        const s3APIUrl =  `${config.API_URL}/s3/getContent?key=${filename}`;
        const response = await axios.get(s3APIUrl);
        //console.log(response.data);
        setContent(response.data);
      } catch (err) {
        console.error('Error fetching blog content:', err);
        setError('Failed to load blog content. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    // Call the async function
    fetchBlogData();
    fetchContent();
    
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
      <Toast ref={toast} />
      <div className="grid">
        {/* ---------------------------------Banner------------------------------------ */} 
        <div className="col-12">
            <img src={currentBlog.blogImage} style={{width:'100%', height:'200px'}}/>
        </div> 
        {/* ----------------------------------Title--------------------------------------- */}
        <div className="col-11"><h1 style={{textAlign:'center'}}>{currentBlog.title}</h1></div>
        <div className="col-1 speeddial-circle-demo" > 
           <SpeedDial model={items} radius={80} direction="down" type="semi-circle" className="p-speeddial-rounded"/>
        </div>
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
      {/* ----------------------------------User Blog Profile-------------------------- */}
      <Divider />
      <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{ __html: content }} >
      </div>
    </div>
  );
};

export default ViewBlog;