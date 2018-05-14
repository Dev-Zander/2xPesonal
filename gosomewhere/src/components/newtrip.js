import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './header';
import { getTravelerDetails } from '../redux/reducer';
import axios from 'axios';



class NewTrip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tripName: '',
            country: '',
            city: '',
            state: '',
            start: '',
            end: '',
            desc: ''
        }

        this.updateTripName = this.updateTripName.bind(this)
        this.updateTripCountry = this.updateTripCountry.bind(this)
        this.updateTripCity = this.updateTripCity.bind(this)
        this.updateTripState = this.updateTripState.bind(this)
        this.updateTripStart = this.updateTripStart.bind(this)
        this.updateTripEnd = this.updateTripEnd.bind(this)
        this.updateTripDesc = this.updateTripDesc.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

    }

    updateTripName(event) {
        this.setState({
            tripName: event.target.value
        })
    }
    updateTripCountry(event) {
        this.setState({
            country: event.target.value
        })
    }
    updateTripCity(event) {
        this.setState({
            city: event.target.value
        })
    }
    updateTripState(event) {
        this.setState({
            state: event.target.value
        })
    }
    updateTripStart(event) {
        this.setState({
            start: event.target.value
        })
    }
    updateTripEnd(event) {
        this.setState({
            end: event.target.value
        })
    }
    updateTripDesc(event) {
        this.setState({
            desc: event.target.value
        })
    }
    handleSubmit() {
        let tripInfo = {
            tripName: this.state.tripName,
            country: this.state.country,
            city: this.state.city,
            state: this.state.state,
            start: this.state.start,
            end: this.state.end,
            desc: this.state.desc
        }
   axios.post('/api/create/newTrip', tripInfo) 

    }
    handleCancel() {
        console.log('buttonClicked')
        this.setState({
            tripName: '',
            country: '',
            city: '',
            state: '',
            start: '',
            end: '',
            desc: ''
        })
    }



    render() {

        return (
            <div>
            <Header />
            <div className="new-trip-container">
    <h1 className='new-trip-text'>Enter New Trip Information</h1>
                <div className="add-trip-input-box">
                    <div className="add-trip-text">Trip Name</div>
                    <input onChange={this.updateTripName} className="new-trip-input" />
                </div>
                <div className="add-trip-input-box">
                    <div className="add-trip-text">Trip Country</div>
                    <input onChange={this.updateTripCountry} className="new-trip-input" />
                </div>
                <div className="add-trip-input-box">
                    <div className="add-trip-text">Trip City</div>
                    <input onChange={this.updateTripCity} className="new-trip-input" />
                </div>
                <div className="add-trip-input-box">
                    <div className="add-trip-text">Trip State</div>
                    <input onChange={this.updateTripState} className="new-trip-input" />
                </div>
                <div className="add-trip-input-box">
                    <div className="add-trip-text">Trip Start</div>
                    <input onChange={this.updateTripStart} type="date" className="new-trip-input" />
                </div>
                <div className="add-trip-input-box">
                    <div className="add-trip-text">Trip End</div>
                    <input onChange={this.updateTripEnd} type="date" className="new-trip-input" />
                </div>
                <div className="add-trip-input-box">
                    <div className="add-trip-text">Trip Description</div>
                    <input onChange={this.updateTripDesc} className="new-trip-input" />
                </div>
                <div className="create-trip-buttons">
                    <Link to='/dashboard'> <button className="trip-cancel-button" onClick={this.handleCancel}>Cancel</button> </Link>
                    <Link to='/dashboard'> <button className="trip-create-button" onClick={this.handleSubmit}>Create Trip</button></Link>
                </div>


            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        travelerID: state.travelerID
    }
}
export default connect(mapStateToProps, { getTravelerDetails })(NewTrip);