import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import axios from 'axios';

const BrandInfo = ({ baseURL }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [status, setStatus] = useState('');
    const [loadingMsg, setloadingMsg] = useState('');
    const [token, SetToken] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [isDescEditable, setIsDescEditable] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/admin")
            return;
        }
        SetToken(token)
        fetchDetails();
    }, [])

    const fetchDetails = async () => {
        try {
            setLoadingState(true);
            setStatus('');
            setloadingMsg("Fetching Brand Info")
          const response = await axios.get(`${baseURL}/api/brand`);
          const data = response.data;
            setTitle(response.data.title)
            setDescription(response.data.description)
          // Optionally set state
          // setBrand(data);
        } catch (error) {
          console.error('Error fetching brand:', error.message);
        }finally{
            setLoadingState(false);
            setStatus('');
            setloadingMsg("")
        }
      };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        console.log(title)
    };

    const handleDescChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent form reload if inside a <form>      
        try {
            setLoadingState(true);
            setStatus('');
            setloadingMsg("Updating Brand Info")
          const response = await axios.put(`${baseURL}/api/brand/edit`, {
            title,
            description,
          });
      
          setStatus('✅ Brand updated Successfully');('✅ Brand updated Successfully');
        } catch (error) {
            setStatus('❌ Error updating brand:', error);
        }finally{
            setLoadingState(false);
            setStatus('');
            setloadingMsg("")
            setIsTitleEditable(false);
            setIsDescEditable(false);
            fetchDetails();
        }
      };

    return (
        <div className="d-flex fit-screen">
            {loadingState && <Loader message={loadingMsg} />}
            {/* Sidebar Backdrop */}
            {isSidebarOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-grow-1 content-area p-3">
                {/* Toggle Button on Mobile */}
                <button className="btn btn-outline-dark d-md-none mb-3" onClick={() => setIsSidebarOpen(true)}>
                    <i class="bi bi-caret-left"></i> Menu
                </button>
                {/* Status Message */}
                {status && (
                    <div className={`mt-3 alert ${status.includes('✅') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                        {status}
                        <button type="button" className="btn-close" onClick={() => setStatus('')} aria-label="Close"></button>
                    </div>
                )}
                <h3 className='mt-3'>Manage Brand Info</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="">Brand Name</label>
                        <div className="d-flex mt-2 border rounded"
                        style={{border: "1px solid #111"}}>
                        <input
                            type="text"
                            className="form-control border-0"
                            name="title"
                            id='title'
                            value={title}
                            disabled={!isTitleEditable}
                            // value={formData.mainImg}
                            onChange={handleTitleChange}
                        />
                        <button type="button" className='border-0 px-3' onClick={()=> setIsTitleEditable(true)} style={{background: "#01923E", color: "#fff", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}><i class="bi bi-pencil-square"></i></button>
                        </div>

                    </div>
                    <div className="mb-3">
                    <label htmlFor="">Brand Description</label>
                        <div className="d-flex mt-2 border rounded"style={{border: "1px solid #111"}}>
                        <input
                            type="text"
                            className="form-control border-0"
                            name="title"
                            id='title'
                            value={description}
                            disabled={!isDescEditable}
                            // value={formData.mainImg}
                            onChange={handleDescChange}
                        />
                        <button type="button" className='border-0 px-3' onClick={()=>{setIsDescEditable(true)}} style={{background: "#01923E", color: "#fff", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}><i class="bi bi-pencil-square"></i></button>
                        </div>

                    </div>
                    <button className='btn text-white mt-3' style={{background: "#01923E"}} type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default BrandInfo;