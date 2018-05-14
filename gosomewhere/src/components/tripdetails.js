import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import { connect } from 'react-redux';
import axios from 'axios';





class TripDetails extends Component {
    constructor(props) {

        super(props)
        this.state = {
            newTraveler: '',
            currentTravelers: [],
            currentTripID: this.props.tripID,
            tripDetails: [],
            tripName: '',
            tripStart: '',
            tripEnd: '',
            tripCity: '',
            tripState: '',
            tripCountry: '',
            tripDesc: '',
            tripOwner: '',
            currentUser: '',
            addTravelerToggle: true,
            modifyTrip: false

        }
        this.updateTripName = this.updateTripName.bind(this)
        this.updateTripCountry = this.updateTripCountry.bind(this)
        this.updateTripCity = this.updateTripCity.bind(this)
        this.updateTripState = this.updateTripState.bind(this)
        this.updateTripStart = this.updateTripStart.bind(this)
        this.updateTripEnd = this.updateTripEnd.bind(this)
        this.updateTripDesc = this.updateTripDesc.bind(this)
        this.changeInvite = this.changeInvite.bind(this)
        this.handleTripInvite = this.handleTripInvite.bind(this)
        this.submitNewTraveler = this.submitNewTraveler.bind(this)
        this.modifyTrip = this.modifyTrip.bind(this)
        this.cancelEditProfile = this.cancelEditProfile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.leaveTrip = this.leaveTrip.bind(this)
        this.deleteTrip = this.deleteTrip.bind(this)
    }

    deleteTrip() {
        axios.delete(`/api/deleteTrip/${this.state.currentTripID}`).then(response => {


        })
    }
    leaveTrip() {
        axios.delete(`/api/leaveTrip/${this.state.currentTripID}`).then(response => {
            this.setState({
                modifyTrip: false
            })
        })

    }


    updateTripName(event) {
        this.setState({
            tripName: event.target.value
        })
    }
    updateTripCountry(event) {
        this.setState({
            tripCountry: event.target.value
        })
    }
    updateTripCity(event) {
        this.setState({
            tripCity: event.target.value
        })
    }
    updateTripState(event) {
        this.setState({
            tripState: event.target.value
        })
    }
    updateTripStart(event) {
        this.setState({
            tripStart: event.target.value
        })
    }
    updateTripEnd(event) {
        this.setState({
            tripEnd: event.target.value
        })
    }
    updateTripDesc(event) {
        this.setState({
            tripDesc: event.target.value
        })
    }

    cancelEditProfile() {
        this.setState({
            modifyTrip: false
        })
    }

    modifyTrip() {
        this.setState({
            modifyTrip: true
        })
    }

    handleTripInvite(Info) {
        this.setState({
            newTraveler: Info,
            
        })
    }

    submitNewTraveler() {
        axios.post(`/api/inviteToTrip/${this.state.newTraveler}/${this.state.currentTripID}`).then(response =>{
            this.setState({
                addTravelerToggle: true
            })
        })
    }

    changeInvite() {

        this.setState({
            addTravelerToggle: false
        })
    }

    handleSubmit() {
        let tripInfo = {
            tripID: this.state.currentTripID,
            tripName: this.state.tripName,
            country: this.state.tripCountry,
            city: this.state.tripCity,
            state: this.state.tripState,
            start: this.state.tripStart,
            end: this.state.tripEnd,
            desc: this.state.tripDesc
        }
        axios.post('/api/create/updateTrip', tripInfo).then(response => {
            this.setState({
                modifyTrip: false
            })
        })

    }


    componentDidMount() {
        let tripDetailsID = this.state.currentTripID
        axios.get(`/api/getTripDetails/${tripDetailsID}`).then(
            tripInfo => {

                console.log(tripInfo, 'Trip Info')

                this.setState({
                    tripDetails: tripInfo.data[0],
                    tripName: tripInfo.data[0].trip_name,
                    tripStart: tripInfo.data[0].trip_start,
                    tripEnd: tripInfo.data[0].trip_end,
                    tripCity: tripInfo.data[0].trip_city,
                    tripState: tripInfo.data[0].trip_state,
                    tripCountry: tripInfo.data[0].trip_country,
                    tripDesc: tripInfo.data[0].trip_description,
                    tripOwner: tripInfo.data[0].trip_owner_id,
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

        axios.get('/api/getcurrentUser').then(
            currentUser => {
                this.setState({
                    currentUser: currentUser.data[0].id
                })
            }
        )
    }

    render() {

        let Travelers = this.state.currentTravelers.map((traveler, index) => {
            console.log(traveler)
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
                {this.state.modifyTrip ?
                    <div className="edit-detail-container">
                        <div className="trip-detail-title">Trip Name:</div><input className="trip-detail-input" onChange={this.updateTripName} value={this.state.tripName} />
                        <div className="trip-detail-title">Trip Start:</div><input className="trip-detail-input" type="date" onChange={this.updateTripStart} value={this.state.tripStart} />
                        <div className="trip-detail-title">Trip End:</div><input className="trip-detail-input" type="date" onChange={this.updateTripEnd} value={this.state.tripEnd} />
                        <div className="trip-detail-title">Trip City:</div><input className="trip-detail-input" onChange={this.updateTripCity} value={this.state.tripCity} />
                        <div className="trip-detail-title"> Trip State:</div><input className="trip-detail-input" onChange={this.updateTripState} value={this.state.tripState} />
                        <div className="trip-detail-title" >Trip Country:</div><input className="trip-detail-input" onChange={this.updateTripCountry} value={this.state.tripCountry} />
                        <div className="trip-detail-title">Trip Description:</div><input className="trip-detail-input-desc" onChange={this.updateTripDesc} value={this.state.tripDesc} />
                        <div className="modify-trip">
                            <div ><button className="save-change-button" onClick={this.handleSubmit}>Save Change</button></div>
                            <div><button className="cancel-change-button" onClick={this.cancelEditProfile}>Cancel Change</button></div>
                        </div>
                    </div> :
                    <div className="edit-detail-container2">
                        <div className="trip-detail-title2">Trip Name:</div><div className="trip-detail-title3">{this.state.tripName}</div>
                        <div className="trip-detail-title2">Trip Start:</div><div className="trip-detail-title3">{this.state.tripStart}</div>
                        <div className="trip-detail-title2">Trip End:</div><div className="trip-detail-title3">{this.state.tripEnd}</div>
                        <div className="trip-detail-title2">Trip City:</div><div className="trip-detail-title3">{this.state.tripCity}</div>
                        <div className="trip-detail-title2">Trip State:</div><div className="trip-detail-title3">{this.state.tripState}</div>
                        <div className="trip-detail-title2">Trip Country:</div><div className="trip-detail-title3">{this.state.tripCountry}</div>
                        <div className="trip-detail-title2">Trip Description:</div><div className="trip-detail-title3">{this.state.tripDesc}</div>
                        <button className="leave-trip-button" onClick={this.leaveTrip}>Leave Trip</button>
                        {this.state.currentUser === this.state.tripOwner && this.state.modifyTrip === false ?
                            <div className="modify-trip-container">
                                <button className="modify-trip-button" onClick={this.modifyTrip}>Modify Trip</button>
                                <Link to='/dashboard'> <button className="delete-trip-button" onClick={this.deleteTrip}>Delete Trip</button></Link>
                            </div> :
                            // <button className="leave-trip-button" onClick={this.leaveTrip}>Leave Trip</button>
                            ''
                        }
                    </div>
                }

                <div className="traveler-list">

                    <div className="travelers">
                        <div className="list-of-travelers-container">
                            <div className="travelers-list-title">Travelers</div>
                            {Travelers}
                        </div>
                        {this.state.addTravelerToggle ?
                            <div>
                                <button onClick={this.changeInvite} className="invite-user-button">Invite New Traveler</button>
                            </div> :
                            <div>
                                <span className="input-invite-text">Enter E-mail of New Traveler </span>
                                <input onChange={(e) => { this.handleTripInvite(e.target.value) }} className="new-user-email" />
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