import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import axios from 'axios';

const Certifications = ({ baseURL }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [status, setStatus] = useState('');
    const [loadingMsg, setloadingMsg] = useState('');
    const [token, SetToken] = useState("")
    const [certificates, SetCertificates] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/admin")
            return;
        }
        SetToken(token)
        fetchCertificates();
    }, [])

    const fetchCertificates = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/certificate/all`); // Adjust if baseURL is needed
            if (response.data.success) {
                SetCertificates(response.data.data) // array of certificates
            } else {
                console.warn('Fetch failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching certificates:', error);
            return [];
        }
    };

    const handleTriggerCertificateImgInput = () => {
        document.getElementById("certificateImg").click();
    }

    const handleSubmit = () => {

    }

    const handleRemoveCertificate = async (id) => {
        setLoadingState(true);
        setStatus('');
        setloadingMsg("Deleting Certificate")
        try {
            console.log("Calling DELETE:", `${baseURL}/api/certificate/${id}`);
            const res = await axios.delete(`${baseURL}/api/certificate/${id}`);
            console.log(res)
            if (res.data.success) {
                setStatus("✅ Certificate deleted successfully.");
            } else {
                setStatus(`❌ Delete failed: ${res.data.message || 'Server error.'}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            setStatus("❌ An error occurred while deleting.");
        } finally {
            setLoadingState(false);
            setloadingMsg("")
            fetchCertificates();
        }
    }

const handleCertificateChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("certificateImg", file);
    console.log(formData)

    try {
        setLoadingState(true);
        setStatus('');
        setloadingMsg("Uploading Certificate")

        const response = await fetch(`${baseURL}/api/certificate/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            setStatus("✅ Certificate uploaded successfully.");
        } else {
            setStatus(`❌ Upload failed: ${data.message || 'Server error.'}`);
        }
    } catch (error) {
        console.error("Upload error:", error);
        setStatus("❌ An error occurred while uploading.");
    } finally {
        setLoadingState(false);
        setloadingMsg("")
        fetchCertificates();
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
            <h3 className='mt-3'>Manage Certifications</h3>
            <form action={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        hidden
                        accept="image/*"
                        name="mainImg"
                        id='certificateImg'
                        // value={formData.mainImg}
                        onChange={handleCertificateChange}
                    />
                    <div className="d-flex gap-2">
                        <div className="d-flex w-100 mt-2 justify-content-center align-items-center rounded flex-column" style={{ border: "1px dashed black", height: '100px', width: "100px", cursor: "pointer" }}
                            onClick={handleTriggerCertificateImgInput}
                        >
                            <i style={{fontSize: "25px"}} class="bi bi-cloud-arrow-up-fill"></i>
                            <p className='text-center' style={{ fontSize: "18px" }}>Upload new certificate</p>
                        </div>
                    </div>
                </div>
            </form>

            <div className="row">
                {certificates.map((cert) => (
                    <div key={cert._id} className="col-6 col-md-4 col-lg-3 mb-4">
                        <div className="card shadow-sm position-relative">
                            <img
                                src={cert.url}
                                alt="Certificate"
                                className="card-img-top"
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <button className='position-absolute border-0 rounded bg-danger top-0 end-0'
                                onClick={() => handleRemoveCertificate(cert._id)}
                            >
                                <i class="bi bi-x text-white"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
}

export default Certifications