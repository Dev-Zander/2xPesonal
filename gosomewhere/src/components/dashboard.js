import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {getTripDetails} from '../redux/reducer';




class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {

            upcomingTrips: [],
            upcomingError: ''

        }
    }

    componentDidMount(){
        axios.get(`/api/getusertrips`).then(response =>{
            this.setState({
                upcomingTrips: response.data
            })
        }).catch(response => {
            this.setState({
                upcomingError: 'No Upcoming Trips'
            })
        })
    }


    render(){

        let upComingTripList = this.state.upcomingTrips.map((trip, index)=>{
            return (
                <div key={index} className="list-of-upcoming-trips">
                <div className="trip-name">{trip.trip_name}</div>
                <div className="trip-dates">
                <div className="trip-start-date">
                <div className="div-start-text">Trip Start</div>
                {trip.trip_start}</div>
                <div className="trip-start-date">
                <div className="div-end-text">Trip End</div>
                {trip.trip_end}</div>
                </div>
                <div className="upcoming-trips-buttons">
               <Link to='/tripdetails'> <span><button className="trip-details-button" onClick={(e)=>{this.props.getTripDetails(e.target.value)}} value={trip.id}>Trip Details</button></span></Link>
                </div>


                
                </div>
         )})

        return(
            <div className="dashboard-container">
            <Header/>
            <div className="dashboard-container-list">
            {upComingTripList}
            {this.state.upcomingError}
           </div> 
           </div>
        )
    }
}
function mapStateToProps(state){
    return{
        tripID: state.tripID
    }
}

export default connect(mapStateToProps, {getTripDetails})(Dashboard)