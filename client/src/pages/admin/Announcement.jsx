import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import axios from 'axios';

const Announcement = ({ baseURL }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [status, setStatus] = useState('');
    const [loadingMsg, setloadingMsg] = useState('');
    const [token, SetToken] = useState("")
    const [announcement, setAnnouncement] = useState("")
    const [announcements, setAnnouncements] = useState([])

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
            setloadingMsg("Fetching Announcements")
            const response = await axios.get(`${baseURL}/api/announcements`);
            const data = response.data;
            setAnnouncements(data);
        } catch (error) {
            console.error('Error fetching Announcements:', error.message);
        } finally {
            setLoadingState(false);
            setStatus('');
            setloadingMsg("")
        }
    };

    const handleAnnouncementChange = (e) => {
        setAnnouncement(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent form reload if inside a <form>      
        try {
            setLoadingState(true);
            setStatus('');
            setloadingMsg("Updating Brand Info")
            const response = await axios.post(`${baseURL}/api/announcements/create`, {
                announcement,
            });

            setStatus('✅ Announcement Added Successfully');
        } catch (error) {
            setStatus('❌ Error adding Announcement:', error);
        } finally {
            setLoadingState(false);
            setStatus('');
            setloadingMsg("")
            fetchDetails();
        }
    };

    const handleDelete = async (id) => {     
        try {
            console.log(id)
            setLoadingState(true);
            setStatus('');
            setloadingMsg("Deleting Announcement")
            const response = await axios.delete(`${baseURL}/api/announcements/${id}`);
            setStatus('✅ Announcement Deleted Successfully');
        } catch (error) {
            setStatus('❌ Error Deleting Announcement:', error);
        } finally {
            setLoadingState(false);
            setStatus('');
            setloadingMsg("")
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
                <h3 className='mt-3'>Manage Announcements</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="">Announcement</label>
                        <div className="d-flex mt-2 border rounded" style={{ border: "1px solid #111" }}>
                            <input
                                type="text"
                                className="form-control border-0"
                                name="title"
                                id='title'
                                value={announcement}
                                // value={formData.mainImg}
                                onChange={handleAnnouncementChange}
                            />
                        </div>

                    </div>
                    <button className='btn text-white mt-3' style={{ background: "#01923E" }} type='submit'>Save</button>
                </form>

                {announcements.length === 0 ? (
                    <h3 className='mt-5'>No Announcement created yet!</h3>
                ) : (
                    <div className='mt-5'>
                        {announcements.map((a) => (
                        <div className='d-flex mb-2 ps-3  justify-content-between align-items-center w-100' style={{background: "rgb(232, 232, 232)", borderRadius: "5px"}} key={a._id}>
                            <p className='mb-0 py-3 w-100'>{a.title}</p>
                            <button type="button" className='border-0 py-3 px-3' onClick={()=>{handleDelete(a._id)}} style={{background: "#01923E", color: "#fff", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}><i class="bi bi-trash"></i></button>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Announcement;