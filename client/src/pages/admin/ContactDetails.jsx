import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import axios from 'axios';

const ContactDetails = ({ baseURL }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [status, setStatus] = useState('');
    const [loadingMsg, setloadingMsg] = useState('');
    const [token, SetToken] = useState("")
    const [fAddress, setFAddress] = useState("")
    const [cityAddress, setCityAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isFAddressEditable, setIsFAddressEditable] = useState(false);
    const [isCityAddressEditable, setIsCityAddressEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [id, setID] = useState("");

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
            setloadingMsg("Fetching Contact Info")
          const response = await axios.get(`${baseURL}/api/contact`);
          const data = response.data;
            setFAddress(response.data.f_address)
            setCityAddress(response.data.city_address)
            setEmail(response.data.email)
            setPhone(response.data.phone)
            setID(response.data._id)
          // Optionally set state
          // setBrand(data);
        } catch (error) {
          console.error('Error fetching Contact:', error.message);
        }finally{
            setLoadingState(false);
            setStatus('');
            setloadingMsg("")
        }
      };

    const handleFAddressChange = (e) => {
        setFAddress(e.target.value);
    };

    const handleCityAddressChange = (e) => {
        setCityAddress(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent form reload if inside a <form>      
        try {
            setLoadingState(true);
            setStatus('');
            setloadingMsg("Updating Brand Info")
          const response = await axios.put(`${baseURL}/api/contact/${id}`, {
            fAddress,
            cityAddress,
            email,
            phone
          });
          console.log(response)
          setStatus('✅ Contact updated Successfully');
        } catch (error) {
            setStatus('❌ Error updating Contact:', error);
        }finally{
            setLoadingState(false);
            setStatus('');
            setloadingMsg("")
            setIsFAddressEditable(false);
            setIsCityAddressEditable(false);
            setIsEmailEditable(false);
            setIsPhoneEditable(false);
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
                <h3 className='mt-3'>Manage Contact Info</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="">Factory Address</label>
                        <div className="d-flex mt-2 border rounded"
                        style={{border: "1px solid #111"}}>
                        <input
                            type="text"
                            className="form-control border-0"
                            name="address"
                            id='address'
                            value={fAddress}
                            disabled={!isFAddressEditable}
                            // value={formData.mainImg}
                            onChange={handleFAddressChange}
                        />
                        <button type="button" className='border-0 px-3' onClick={()=> setIsFAddressEditable(true)} style={{background: "#01923E", color: "#fff", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}><i class="bi bi-pencil-square"></i></button>
                        </div>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="">City Office Address</label>
                        <div className="d-flex mt-2 border rounded"
                        style={{border: "1px solid #111"}}>
                        <input
                            type="text"
                            className="form-control border-0"
                            name="address"
                            id='address'
                            value={cityAddress}
                            disabled={!isCityAddressEditable}
                            // value={formData.mainImg}
                            onChange={handleCityAddressChange}
                        />
                        <button type="button" className='border-0 px-3' onClick={()=> setIsCityAddressEditable(true)} style={{background: "#01923E", color: "#fff", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}><i class="bi bi-pencil-square"></i></button>
                        </div>

                    </div>
                    <div className="mb-3">
                    <label htmlFor="">Email</label>
                        <div className="d-flex mt-2 border rounded"style={{border: "1px solid #111"}}>
                        <input
                            type="text"
                            className="form-control border-0"
                            name="title"
                            id='title'
                            value={email}
                            disabled={!isEmailEditable}
                            // value={formData.mainImg}
                            onChange={handleEmailChange}
                        />
                        <button type="button" className='border-0 px-3' onClick={()=>{setIsEmailEditable(true)}} style={{background: "#01923E", color: "#fff", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}><i class="bi bi-pencil-square"></i></button>
                        </div>

                    </div>
                    <div className="mb-3">
                    <label htmlFor="">Phone</label>
                        <div className="d-flex mt-2 border rounded"style={{border: "1px solid #111"}}>
                        <input
                            type="text"
                            className="form-control border-0"
                            name="title"
                            id='title'
                            value={phone}
                            disabled={!isPhoneEditable}
                            // value={formData.mainImg}
                            onChange={handlePhoneChange}
                        />
                        <button type="button" className='border-0 px-3' onClick={()=>{setIsPhoneEditable(true)}} style={{background: "#01923E", color: "#fff", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}><i class="bi bi-pencil-square"></i></button>
                        </div>

                    </div>
                    <button className='btn text-white mt-3' style={{background: "#01923E"}} type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default ContactDetails;