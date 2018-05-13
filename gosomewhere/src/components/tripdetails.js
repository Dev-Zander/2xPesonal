import React, { Component } from 'react';
import Header from './header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';





class TripDetails extends Component {
    constructor(props) {

        super(props)
        this.state = {
            newTraveler:'',
            currentTravelers: [],
            currentTripID: this.props.tripID,
            tripDetails: [],
            tripDetails: '',
            tripName: '',
            tripStart: '',
            tripEnd: '',
            tripCity: '',
            tripState: '',
            tripCountry: '',
            tripDesc: '',
            addTravelerToggle: true
        }
        this.changeInvite = this.changeInvite.bind(this)
        this.handleTripInvite = this.handleTripInvite.bind(this)
        this.submitNewTraveler = this.submitNewTraveler.bind(this)
    }

    handleTripInvite(Info){
        this.setState({
            newTraveler:Info
        })
    }
    
    submitNewTraveler(){
        axios.post(`/api/inviteToTrip/${this.state.newTraveler}/${this.state.currentTripID}`)
    }

    changeInvite() {

        this.setState({
            addTravelerToggle: false
        })
    }


    componentDidMount() {
        let tripDetailsID = this.state.currentTripID
        axios.get(`/api/getTripDetails/${tripDetailsID}`).then(
            tripInfo => {

                this.setState({
                    tripDetails: tripInfo.data[0],
                    tripName: tripInfo.data[0].trip_name,
                    tripStart: tripInfo.data[0].trip_start,
                    tripEnd: tripInfo.data[0].trip_end,
                    tripCity: tripInfo.data[0].trip_city,
                    tripState: tripInfo.data[0].trip_state,
                    tripCountry: tripInfo.data[0].trip_country,
                    tripDesc: tripInfo.data[0].trip_description
                })
            }
        ).catch(
            response => {
                console.log('Error Getting Trip Details')
            }
        )
        axios.get(`/api/getTravelers/${tripDetailsID}`).then(
            travelers => {
                this.setState({
                    currentTravelers: travelers.data
                })
                console.log('Error Getting Travelers')
                console.log(travelers)
            }
        )
    }

    render() {

        let Travelers = this.state.currentTravelers.map((traveler, index) => {
            return (
                <div key={index} className="list-of-travelers">
                    <div className="travelers-first-name">{traveler.first_name}</div>
                    <div className="travelers-last-name">{traveler.last_name}</div>
                </div>
            )
        })

        return (
            <div className="trip-details-container">
                <Header />

                <div>Trip Name:</div><div>{this.state.tripName}</div>
                <div>Trip Start:</div><div>{this.state.tripStart}</div>
                <div>Trip End:</div><div>{this.state.tripEnd}</div>
                <div>Trip City:</div><div>{this.state.tripCity}</div>
                <div>Trip State:</div><div>{this.state.tripState}</div>
                <div>Trip Country:</div><div>{this.state.tripCountry}</div>
                <div>Trip Description:</div><div>{this.state.tripDesc}</div>
                <div className="traveler-list">
                    <span>Travelers</span>
                    <div className="travelers">
                        {Travelers}
                        {this.state.addTravelerToggle ?
                            <div>
                                <button onClick={this.changeInvite} className="invite-user-button">Invite New Traveler</button>
                            </div> :
                            <div>
                                <span className="input-invite-text">Enter E-mail of New Traveler </span>
                                <input onChange={(e)=>{this.handleTripInvite(e.target.value)}} className="new-user-email" />
                                <button onClick={this.submitNewTraveler} className="submit-invite">Submit Invite</button>
                            </div>

                        }


                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tripID: state.tripID
    }
}

export default connect(mapStateToProps)(TripDetails)