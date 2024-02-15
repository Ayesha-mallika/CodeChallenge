import { useEffect, useState } from "react";
import './AddEvent.css';
import axios from "axios";
import { toast } from "react-toastify";

function UpdateEvent({id}){
    const [title,setTitle]=useState("");
    const [location,setLocation]=useState("");
    const [max,setMax]=useState("");
    const [date,setDate]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState(0);
    const [events,setEvent]=useState({});
    const [image,setimage]=useState("");

    useEffect(() => {
        axios.get('http://localhost:5086/api/Event/GetByEventId', {
            params: {
                id: id
            }
        })
        .then((response) => {
            const eventData = response.data;
            console.log(eventData); // Log the entire response
            setEvent(eventData);
            console.log(events)
        })
        .catch((error) => {
            console.error("Error fetching event data:", error);
        });
    }, []);
    
    
    
    useEffect(() => {
        if (events.eventID) {
            setDescription(events.description);
            setPrice(events.registrationFee);
            setTitle(events.title);
            setDate(events.date);
            setLocation(events.location);
            setMax(events.maxAttendees);
            setimage(events.image);
        }
    }, [events]);
    


    const updateEvent=(e)=>{
        e.preventDefault();
        const jsonData = {
            id: events.id,
            title: title,
            description: description,
            date: date,
            registrationFee: price,
            location:location,
            maxAttendees:max,
            userId: localStorage.getItem("id"),
            image:image
        };
        axios.put("http://localhost:5086/api/Event",jsonData,{
            params :{
                id : id
            },headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(async (userData)=>{
            toast.success("Event Updated");
        })
        .catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        })

    }

    return(
        <div>
            <div class="center">
                <h1>Update Event</h1>
                <form onSubmit={updateEvent}>
                <div class="row">
                        <div class="col">
                            <div class="inputbox">
                                <input type="text" required value={title} onChange={(e)=>(setTitle(e.target.value))}/>
                                <span>Title</span>
                            </div>
                            <div class="inputbox">
                                <input type="text" required value={description} onChange={(e)=>(setDescription(e.target.value))}/>
                                <span>Description</span>
                            </div>
                            <div class="inputbox">
                                <input type="text" required value={location} onChange={(e)=>(setLocation(e.target.value))}/>
                                <span>Location</span>
                            </div>
                            
                        </div>
                        <div class="col">
                            <div class="inputbox">
                                <input type="text" required value={max} onChange={(e)=>(setMax(e.target.value))}/>
                                <span>Max Attendees</span>
                            </div>
                            <div class="inputbox">
                                <input type="date" required value={date} onChange={(e)=>(setDate(e.target.value))}/>
                                <span>Event Date</span>
                            </div>
                            <div class="inputbox">
                                <input type="number" required value={price} onChange={(e)=>(setPrice(e.target.value))}/>
                                <span>Price</span>
                            </div>
                        </div>
                    </div>
                    <div class="row ctr">
                        <button type="submit" class="btn btn-primary" >Update Event</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
export default UpdateEvent;