import { useEffect, useState } from "react";
import './Events.css';
import axios from "axios";
import { toast } from "react-toastify";

function Events(){
    const [events,setEvents]=useState([]);
    const [search,setSearch]=useState("All");

    useEffect(()=>{
        getEvents();
    },[]);

    const getEvents=()=>{
      if(search==""){
        setSearch("All");
      }
        axios.get('http://localhost:5086/api/Event',{
            params: {
               search : search
            }
          })
          .then((response) => {
            const posts = response.data;
            setEvents(posts);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    var checkEvents = events.length>0?true:false;
    return(
        <div class="events">
            <div class="search row">
                <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
                    <div class="col">
                        <input class=" form-control form-control-sm ml-3 w-75" type="text" placeholder="Search by title/Location" onChange={(e)=>{setSearch(e.target.value)}} aria-label="Search"/>
                    </div>
                </form>
            </div>
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
                          <p className="card-text">Max Attendees: {event.max}</p>
                          <p className="card-text">Price: $.{event.price}</p>
                          <a href="#" className="btn btn-primary">
                            view
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  
                :<div>No Events, Enter a search term</div>}

            </div>
        </div>
    );

}
export default Events;