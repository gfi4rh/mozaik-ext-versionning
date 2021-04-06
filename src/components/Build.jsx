import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment from 'moment';
import 'moment/locale/fr';
const  { ProgressBar }                         = Mozaik.Component;


class Build extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			build : null
		}  
	}
	
	getApiRequest() {
		let { name, url } = this.props;
		
		return {
			id:     `jenkins.build.${ name }`,
			params: {
				name : name,
				url : url
			}
		};
	}
	
	onApiData(build) {
		this.setState({
			build : build
		});
	}
	
	
	render() {
		
		const { title } = this.props;
		const { build } = this.state;
		
		let statusNode = null
		let time = null
		let number = null
		
		if(build){
			
			moment.locale('fr')
			
			if(!build.building){
				
				let backgroundColor = null;
				let status = null
				
				switch(build.result){
					case "SUCCESS" : 
						backgroundColor = '#198452'
						status = 'SUCCESS'
					break;
					case "UNSTABLE" : 
						backgroundColor = '#ffd32a'
						status = 'UNSTABLE'
					break;
					case "ABORTED" : 
						backgroundColor = '#c8a318'
						status = 'ABORTED'
					break;
					case "FAILURE" : 
						backgroundColor = '#ff3f34'
						status = 'FAILURE'
					break;
				}
				
				
				let timeAgo = moment(build.timestamp).fromNow();
				let duration = moment.utc(build.duration).format("HH:mm:ss");
				
				statusNode = <div className="jenkins_build_box jenkins_build_status" style={{backgroundColor : backgroundColor}}>{status}</div>
				time = <div className="jenkins_build_time">{`${timeAgo} | Durée : ${duration}`}</div>
				
			} else {
				
				let diff = moment().diff(build.timestamp)
				let chrono = moment.utc(diff).format("HH:mm:ss")
				let completed = diff*100/build.estimatedDuration
				
				time = 
				<div className="jenkins_build_progress">
					<div className="jenkins_build_time_progress">{chrono}</div>
					<ProgressBar completed={completed > 100 ? 100 : completed} color={'#35a446'} height={'0.3em'} colorEnd={'#2b3847'}/>
				</div>
				
			}
			
			number = <div className="jenkins_build_box jenkins_build_number">{build.displayName}</div>
		}
		
		return (
			<div className="jenkins_build_line">
				<div className="jenkins_build_name">{title}</div>
				{number}
				{statusNode}
				{time}
			</div>
			);
		}
	}
	
	Build.displayName = 'Build';
	
	reactMixin(Build.prototype, ListenerMixin);
	reactMixin(Build.prototype, Mozaik.Mixin.ApiConsumer);
	
	export default Build;
