import { useState } from "react";
import './AddEvent.css';
import axios from "axios";
import { toast } from "react-toastify";

function AddEvent(){
    const [title,setTitle]=useState("");
    const [location,setLocation]=useState("");
    const [max,setMax]=useState("");
    const [date,setDate]=useState("");
    const [id,setid]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState(0);
    var image=null;

    const addEvent=(event)=>{
        event.preventDefault();
        const jsonData = {
            title: title,
            description: description,
            date: date,
            price: price,
            location:location,
            max:max,
            userId: localStorage.getItem("id")
        };
        const formdata = new FormData();
        formdata.append('json',JSON.stringify( jsonData));
        formdata.append('image',image);

        axios.post("http://localhost:5086/api/Event/AddEvent",formdata,
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type':'multipart/form-data',
            }
        })
        .then(async (userData)=>{
            toast.success("Event Added");
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })

    }
    const handleimg=(e)=>{
        image=e.target.files[0];
        console.log(e.target.files[0]);
    }

    return(
        <div class="addevent">
            <div class="center">
                <h1>Add Event</h1>
                <form onSubmit={addEvent}>
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
                            <div class="inputbox">
                                <input type="text" required value={max} onChange={(e)=>(setMax(e.target.value))}/>
                                <span>Max Attendees</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="inputbox">
                                <input type="date" required value={date} onChange={(e)=>(setDate(e.target.value))}/>
                                <span>Event Date</span>
                            </div>
                            <div class="inputbox">
                                <input type="number" required value={price} onChange={(e)=>(setPrice(e.target.value))}/>
                                <span>Price</span>
                            </div>
                            <div class="inputbox">
                                <input type="file" accept="image/*" required value={image} onChange={handleimg}/>
                                <span>Image</span>
                            </div>
                        </div>
                    </div>
                    <div class="row ctr">
                        <button type="submit" class="btn btn-primary" >Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
export default AddEvent;