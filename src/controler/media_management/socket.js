const {socket}  = require('./../../socket');
const {fnHandUpdateAdv,fnHandUpdateMap,fnHandUpdateDirect,fnHandUpdateSchedule} = require('./service');
const address = require('address');
const axios = require('axios');

var ip = address.ip();
socket.on(process.env.socket_topic,(mess)=>{
	for (const action of mess) {
		try {
			switch (action) {
				case 'update adv':
					// lấy api update media
					axios({
						url: "http://localhost:3000/api/v1/media/addAdv",
						method: 'GET'
					})
						.then(result => {
							fnHandUpdateAdv(result.data,ip);
						})
						.catch(error => {
							return error
						});
					break;
				case 'update map':
					// lấy api update media
					axios({
						url: "http://localhost:3000/api/v1/media/map",
						method: 'GET'
					})
						.then(result => {
							fnHandUpdateMap(result.data,ip);
						})
						.catch(error => {
							return error
						});
					break;
				case 'update direct':
					// lấy api update media
					axios({
						url: "http://localhost:3000/api/v1/media/addAdv",
						method: 'GET'
					})
						.then(result => {
							fnHandUpdateDirect(result.data,ip);
						})
						.catch(error => {
							return error
						});
					break;
				case 'update schedule':
					// lấy api update media
					axios({
						url: "http://localhost:3000/api/v1/media/addAdv",
						method: 'GET'
					})
						.then(result => {
							fnHandUpdateSchedule(result.data,ip);
						})
						.catch(error => {
							return error
						});
					break;
				default:
					break;
			}
		} catch (error) {
			console.log(`Lỗi function socket.on file: /src/controler/media_management/socket    ${error}`);
		}
	}
})