import React, { Component } from 'react';
import logo from '../media/xrossTrekLogo.png';
import Header from './header';
import axios from 'axios';




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
        return(
            <div className="dashboard-container">
            <Header/>
            </div>
        )
    }
}

export default Dashboard