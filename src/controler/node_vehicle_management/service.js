const {Op} = require('sequelize');

const response = require('../base/response');
const convert = require('../base/convert');
const {location_vehicle} = require('./model/location_vehicle');
const moment = require('moment');
const direct = require('../../config/direct.json')
const {checkData} = require('../../utils/checkData')

async function list_nodeVehicle(req, res) {
    const {id,rfid,status, node_id} = req.query;
    // check query
    let check = checkData(
        ["id","rfid","status","fromDate","toDate"],
        ["isInt","isText",[0,1],"isDate","isDate"],
        req.query
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");
    
    let fromDate = convert.convertInputDate(req.query.fromDate)
    let toDate = convert.convertInputDate(req.query.toDate + " 23:59:59")
    let condition = {};
    try {
        // filter theo id
        if(!!id){
            if(typeof(id)==="string") Object.assign(condition,{id: id})
            else Object.assign(condition,{id: {[Op.or]: id}})
        } 
        // filter theo rfid
        if(!!rfid){
            if(typeof(rfid)==="string") Object.assign(condition,{rfid: rfid})
            else Object.assign(condition,{rfid: {[Op.or]: rfid}})
        } 
        // filter theo node_id
        if(!!node_id){
            if(typeof(node_id)==="string") Object.assign(condition,{node_id: node_id})
            else Object.assign(condition,{node_id: {[Op.or]: node_id}})
        } 
        // filter theo ngày
        if(!!fromDate && !!toDate) Object.assign(condition,{create_at: {[Op.between]: [fromDate, toDate]}})
        else if(!!fromDate)  Object.assign(condition,{create_at: {[Op.gte]: fromDate}})
        else if(!!toDate)  Object.assign(condition,{create_at: {[Op.lte]: toDate}})
        // filter theo status
        if(!!status){
            if(typeof(status)==="string") Object.assign(condition,{status: status})
            else Object.assign(condition,{status: {[Op.or]: status}})
        } 

        const get_nodeVehicle = await location_vehicle.findAll({
            raw: true,
            where: condition
        });
        response.ok(res, get_nodeVehicle);
    } catch (error) {
        response.internal(res, error);
    }
}

async function get_nodeDeviceById(req, res) {
    const {id} = req.params;
    // check params
    let check = checkData(
        ["id"],
        ["isInt"],
        req.params
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");

    try {
        const get_nodeVehicle = await location_vehicle.findAll({
            raw: true,
            where: {
                id:id
            }
        });
        response.ok(res, get_nodeVehicle);
    } catch (error) {
        response.internal(res, error);
    }
}

async function get_nodeDeviceByRfid(req, res) {
    const {rfid} = req.params;
    if(rfid===undefined) rfid = req.body.rfid;
    // check params
    let check = checkData(
        ["rfid"],
        ["isText"],
        req.params
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");
    //main
    try {
        const get_nodeVehicle = await location_vehicle.findOne({
            where: {rfid:rfid},
            raw: true,
            order: [['create_at', 'DESC']]
        });
        return response.ok(res, get_nodeVehicle);
    } catch (error) {
        console.log(error);
        return response.internal(res, error);
    }
}

async function add_nodeVehicle(req, res) {
    // check body
    let check = checkData(
        ["rfid"],
        ["isText"],
        req.body
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");
    //gan bien
    const {rfid,node_id} = req.body;
    // main
    try {
        const create_location_vehicle = await location_vehicle.create({
            rfid: rfid,
            node_id: node_id,
            create_at: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        return response.created(res, create_location_vehicle);
    } catch (error) {
        console.log(error);
        return response.internal(res, error);
    }
}

async function add_nodeVehicleComein(req, res) {
    // check body
    let check = checkData(
        ["rfid"],
        ["isText"],
        req.body
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");
    //gan bien
    const {rfid} = req.body;
    // main
    try {
        const create_location_vehicle = await location_vehicle.create({
            rfid: rfid,
            create_at: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        return response.created(res, create_location_vehicle);
    } catch (error) {
        console.log(error);
        return response.internal(res, error);
    }
}

async function update_destinationId(req, res) {
    const {node_id,id} = req.body;
    //main
    try {
        const update_location_vehicle = await location_vehicle.update(
            { node_id: node_id},
            {
                where:{id:id}
            },
        );
        Promise.all([update_location_vehicle])
            .then(result => {
                response.ok(res, result[0]);
            })
            .catch(error => response.internal(res, error))
    } catch (error) {
        response.internal(res, error);
    }
}

async function directVehicle(req, res) {
    // check body
    let check = checkData(
        ["rfid"],
        ["isText"],
        req.body
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");
    // gan bien
    const {rfid,node_id} = req.body;
    // main
    try {
        await location_vehicle.findOne({
            where: {rfid:rfid},
            raw: true,
            attributes:["node_id"],
            order: [['create_at', 'DESC']]
        })
            .then(result=>{
                return response.ok(res, direct[node_id][result.node_id]);
            })
            .catch(()=>{
                response.badRequest(res, "Không tồn tại mã RFID");
            })
    } catch (error) {
        console.log(error);
        response.internal(res, error);
    }
}

async function delete_rfidExist(req,res,next) {
    // check body
    let check = checkData(
        ["rfid"],
        ["isText"],
        req.body
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");
    // gan bien
    let {rfid} = req.body;
    if(rfid===undefined) rfid = req.params;
    // main
    try {
        const delete_vehicle = await location_vehicle.destroy({
            where:rfid
        })
        Promise.all([delete_vehicle])
            .then(result=>{
                return response.ok(res, result[0]);
            })
            .catch(error=>{
                response.internal(res, error);
            })
    } catch (error) {
        response.internal(res, error);
    }
}

async function mdw_getIdFromRfid(req, res,next) {
    const {rfid} = req.body;
    // check params
    let check = checkData(
        ["rfid"],
        ["isText"],
        req.body
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");

    try {
        await location_vehicle.findOne({
            where: {rfid:rfid},
            raw: true,
            attributes:["id"],
            order: [['create_at', 'DESC']]
        })
            .then(result=>{
                req.body.id = result.id;
            })
            .catch(error=>{
                response.internal(res, error);
            })
        if(!!req.body.id) {
            next();
        }
    } catch (error) {
        console.log(error);
        response.internal(res, error);
    }
}

async function comeinOneStep(req, res) {
    // check body
    let check = checkData(
        ["rfid"],
        ["isText"],
        req.body
    )
    if (check.value === false) 
        return response.badRequest(res,check.error_message);
    else if(check.value === null)
        return response.badRequest(res,"Lỗi dữ liệu");
    //gan bien
    const {rfid,node_id} = req.body;
    // main
    try {
        await location_vehicle.count({
            where:{
                rfid : rfid
            }
        })
            .then(result=>{
                if(result === 0){
                    location_vehicle.create({
                        rfid: rfid,
                        node_id: node_id,
                        create_at: moment().format('YYYY-MM-DD HH:mm:ss')
                    })
                        .then(result=>{
                            return response.created(res, result);
                        })
                        .catch(()=>{
                            response.badRequest(res, "Lỗi tạo mới location_vehicle function comeinOneStep");
                        })
                } else{
                    location_vehicle.findOne({
                        where: {rfid:rfid},
                        raw: true,
                        attributes:["node_id"],
                        order: [['create_at', 'DESC']]
                    })
                        .then(result=>{
                            return response.ok(res, direct[node_id][result.node_id]);
                        })
                        .catch(()=>{
                            response.badRequest(res, "Không tồn tại mã RFID");
                        })
                }
            })
            .catch(error=>{
                response.internal(res, error)
            })
    } catch (error) {
        console.log(error);
        response.internal(res, error);
    }
}

module.exports = {
    // res
    list_nodeVehicle: list_nodeVehicle,
    add_nodeVehicleComein: add_nodeVehicleComein,
    comeinOneStep: comeinOneStep,
    update_destinationId: update_destinationId,
    directVehicle: directVehicle,
    get_nodeDeviceById: get_nodeDeviceById,
    get_nodeDeviceByRfid: get_nodeDeviceByRfid,
    delete_rfidExist: delete_rfidExist,

    mdw_getIdFromRfid: mdw_getIdFromRfid,
};
