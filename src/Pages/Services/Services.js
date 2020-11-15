import React, {Component} from "react";
import {Button, Divider, Segment, Loader} from "semantic-ui-react";
import '../../Styles/HomePage.css'
import CreateNewHTMH from "../../Components/Forms/CreateNewHTMH";
import SubscribeToHTMH from "../../Components/Forms/SubscribeToHTMH";
import {apiEndPoints, axiosConfig, serverURL} from "../../Utils/Config";
import axios from "axios";
import HTMHInfo from "../../Components/HTMHInfo/HTMHInfo";

export default class Services extends Component{

    constructor(props) {
        super(props);
        this.state = {
            htmhStatus: undefined,
            htmhInfo: {
                serviceToken: '',
                active: '',
                startDatetime: '',
                endDatetime: '',
                subscribersList: [],
                equipments: [],
                subsNum: '',
                secretKey: '',
                permitRun: false,
                isOwner: false
            }
        };
    }

    componentDidMount() {
        axios.get(serverURL + apiEndPoints.services.htmh.getService, axiosConfig)
            .then(res=>{
                if (res.status === 200){
                    this.setState({htmhStatus: true, htmhInfo: res.data})
                }
                else {
                    this.setState({htmhStatus: false})
                }
            })
            .catch(e=> console.log('A problem has occurred', e))
    }


    render() {
        return(
            <div className="container">
                <Segment>
                    <h3>
                        Home-To-Multi-Home
                    </h3>
                    <Divider/>
                    { !this.state.htmhStatus ? <Button.Group>
                        <CreateNewHTMH/>
                        <Button.Or/>
                        <SubscribeToHTMH/>
                    </Button.Group>
                    :
                    <div>
                        <HTMHInfo htmhInfo={this.state.htmhInfo}/>
                        {this.state.htmhInfo.isOwner && <Button
                                positive
                                disabled={!this.state.htmhInfo.permitRun}
                                style={{marginTop:'5%'}}
                        >
                            Go
                        </Button>}
                        {this.state.htmhInfo.isOwner && <Button
                            negative
                            style={{marginTop:'5%'}}
                        >
                            Delete
                        </Button>}
                    </div>
                    }
                </Segment>
            </div>
        );
    };
}
