import { useEffect, useState } from "react";
import './Events.css';
import axios from "axios";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import UpdateEvent from "./UpdateEvent";

function AdminEvents(){
    const [events,setEvents]=useState([]);
    const [eid,setEid]=useState(0);
    const[isPopupOpen,setPopupOpen]=useState(false);
    useEffect(()=>{
        getEvents();
    },[]);

    const edit = (id) => {
        setEid(id);
        setPopupOpen(true);
    };

    const getEvents=()=>{
        axios.get('http://localhost:5086/api/Event/GetByUserId',{
            params: {
              id : localStorage.getItem("id")
            }
          })
          .then((response) => {
            const posts = response.data;
            console.log(posts)
            setEvents(posts);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    const deleteEvent= (delID) => {
      console.log(delID);
        const confirmation = window.confirm("Are you sure you want to delete the event?");
        if(confirmation){
         axios.delete('http://localhost:5086/api/Event/RemoveEvent', {
         params :{
           Id : delID
         },
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       })
         .then((response) => {
           toast.success("Event Deleted");
           getEvents();
         })
         .catch(function (error) {
           toast.error(error.response ? error.response.data : 'An error occurred');
         }); 
        } 
   }

    var checkEvents = events.length>0?true:false;
    return(
        <div class="events">
            <div class="displayEvents">
                {checkEvents? 
                    <div className="card-container">
                    {events.map((event, index) => (
                      <div className="card" style={{ width: "30%", marginRight: "20px" }} key={index}>
                        <img className="card-img-top" src={event.image} alt="Card image" />
                        <div className="card-body">
                        <h4 className="card-title">Title: {event.title}</h4>
                          <p className="card-text">Descrtipton: {event.description}</p>
                          <p className="card-text">Location: {event.location}</p>
                          <p className="card-text">Date: {event.date}</p>
                          <p className="card-text">Max Attendees: {event.maxAttendees}</p>
                          <p className="card-text">Price: $.{event.registrationFee}</p>
                          <button className="btn btn-primary" onClick={()=>edit(event.id)}>Edit</button>
                          <button className="btn btn-danger btnspc" onClick={() => deleteEvent(event.id)}>Delete</button>
                        </div>
                        <Popup open={isPopupOpen} onClose={() => setPopupOpen(false)} overlayStyle={{ background: 'rgba(0, 0, 0, 0.6)' }}>
            <UpdateEvent id={eid}/>
              </Popup>
                      </div>
                    ))}
                  </div>
                :<div>No Events</div>}
            </div>
            
        </div>
    );

}
export default AdminEvents;