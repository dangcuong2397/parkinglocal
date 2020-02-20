const {Op} = require('sequelize');
const {media}= require('./model/media')
const response = require('../base/response');
const {downloadMedia,deleteMedia} = require('./download')
const convert = require('../base/convert');
const moment = require('moment');
const {checkData} = require('../../utils/checkData')

async function addAdv(req, res) {
    return response.ok(
        res, 
        {
            // add:[
            //     {name: "qc2.jpg", link:"https://photo-zmp3.zadn.vn/cover_video/7/c/0/d/7c0d93b9c83ad8b2b76939550465274e.jpg",uuid:"5"},
            // ],
            delete:[
                {name: "qc2.jpg",uuid:"5"}
            ]
        }
    );
}
async function map(req, res) {
    return response.ok(
        res, 
        {
            // add:{
            //     name: "map.jpg",
            //     link:"https://www.transitlink.com.sg/images/eguide/mrt_sys_map_3.jpg",
            //     uuid:"sdfhgjk"
            // },
            delete:
                {name: "map.jpg",uuid:"sdfhgjk"}
            
        }
    );
}

async function fnHandUpdateAdv(data,ip) {
    try {
        if(!!data.add){
            for (const item of data.add) {
                try {
                    downloadMedia(item.link,`${item.company}_${item.name}`,undefined,undefined,(status)=>{
                        if(status){
                            media.create({
                                name: `${item.company}_${item.name}`,
                                link: `http://${ip}:3000/media/${item.name}`,
                                company: item.company,
                                uuid: item.uuid,
                                create_at: moment().format('YYYY-MM-DD HH:mm:ss')
                            })
                        } else{
                            // lưu log + cảnh báo 
                        }
                    })
                } catch (error) {
                    // lưu log + cảnh báo 
                }
            }
        }
        if(!!data.delete){
            for (const item of data.delete) {
                    media.destroy({
                        where:{
                            name: item.name,
                            uuid: item.uuid,
                        }
                    })
                        .then(
                            deleteMedia(`${item.company}_${item.name}`,undefined,undefined,(status)=>{
                                if(!status){
                                    // lỗi xóa file hoặc cú pháp => lưu lại log và cảnh báo

                                }
                            })
                        )
                        .catch(
                            // lưu lại log và cảnh báo
                        )
            }
        }
    } catch (error) {
        return false;
    }
}

async function fnHandUpdateMap(data,ip) {
    try {
        if(!!data.add){
            try {
                downloadMedia(data.add.link,"map.jpg",undefined,undefined,(status)=>{
                    if(status){
                        media.create({
                            name: "map.jpg",
                            link: `http://${ip}:3000/media/map.jpg}`,
                            company: data.add.company,
                            uuid: data.add.uuid,
                            create_at: moment().format('YYYY-MM-DD HH:mm:ss')
                        })
                    } else{
                        // lưu log + cảnh báo 
                        console.log("loi 1");
                    }
                })
            } catch (error) {
                // lưu log + cảnh báo 
                console.log("loi 2");
            }
        }
        if(!!data.delete){
            media.destroy({
                where:{
                    name: data.delete.name,
                    uuid: data.delete.uuid,
                }
            })
                .then(
                    deleteMedia("map.jpg",undefined,undefined,(status)=>{
                        if(!status){
                            // lỗi xóa file hoặc cú pháp => lưu lại log và cảnh báo
                            
                        }
                    })
                )
                .catch(
                    // lưu lại log và cảnh báo
                )
        }
    } catch (error) {
        return false;
    }
}

async function fnHandUpdateDirect(data,ip) {
    try {
        if(!!data.add){
            try {
                downloadMedia(data.add.link,"direct.json",'./src/','config',(status)=>{
                    if(status){
                        media.create({
                            name: "direct.json",
                            link: `http://${ip}:3000/media/direct.json}`,
                            company: data.add.company,
                            uuid: data.add.uuid,
                            create_at: moment().format('YYYY-MM-DD HH:mm:ss')
                        })
                    } else{
                        // lưu log + cảnh báo 
                    }
                })
            } catch (error) {
                // lưu log + cảnh báo 
            }
        }
        if(!!data.delete){
            media.destroy({
                where:{
                    name: data.delete.name,
                    uuid: data.delete.uuid,
                }
            })
                .then(
                    deleteMedia("direct.json",'./src/','config',(status)=>{
                        if(!status){
                            // lỗi xóa file hoặc cú pháp => lưu lại log và cảnh báo

                        }
                    })
                )
                .catch(
                    // lưu lại log và cảnh báo
                )
        }
    } catch (error) {
        return false;
    }
}

async function fnHandUpdateSchedule(data,ip) {
    try {
        if(!!data.add){
            try {
                downloadMedia(data.add.link,"schedule.json",'./src/','config',(status)=>{
                    if(status){
                        media.create({
                            name: "schedule.json",
                            link: `http://${ip}:3000/media/schedule.json}`,
                            company: data.add.company,
                            uuid: data.add.uuid,
                            create_at: moment().format('YYYY-MM-DD HH:mm:ss')
                        })
                    } else{
                        // lưu log + cảnh báo 
                    }
                })
            } catch (error) {
                // lưu log + cảnh báo 
            }
        }
        if(!!data.delete){
            media.destroy({
                where:{
                    name: data.delete.name,
                    company: data.delete.company,
                    uuid: data.delete.uuid,
                }
            })
                .then(
                    deleteMedia("schedule.json",'./src/','config',(status)=>{
                        if(!status){
                            // lỗi xóa file hoặc cú pháp => lưu lại log và cảnh báo

                        }
                    })
                )
                .catch(
                    // lưu lại log và cảnh báo
                )
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    // res
    addAdv: addAdv,
    map: map,
    fnHandUpdateAdv: fnHandUpdateAdv,
    fnHandUpdateMap: fnHandUpdateMap,
    fnHandUpdateDirect: fnHandUpdateDirect,
    fnHandUpdateSchedule: fnHandUpdateSchedule,
};
