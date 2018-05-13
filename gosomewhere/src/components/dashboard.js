import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../media/xrossTrekLogo.png';
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
                <span>
                <span>Trip Start</span>
                {trip.trip_start}</span>
                <span>
                <span>Trip End</span>
                {trip.trip_end}</span>
                </div>
                <div className="upcoming-trips-buttons">
               <Link to='/tripdetails'> <span><button className="trip-details-button" onClick={(e)=>{this.props.getTripDetails(e.target.value)}} value={trip.id}>Trip Details</button></span></Link>
                </div>


                
                </div>
         )})

        return(
            <div className="dashboard-container">
            <Header/>
            {upComingTripList}
            {this.state.upcomingError}
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