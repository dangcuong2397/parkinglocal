const {Op} = require('sequelize');

const response = require('../base/response');
const convert = require('../base/convert');
const checkData = require('../../utils/checkData');
const {node_status} = require('./model/node_status');
const validator = require('validator');

async function list_nodeStatus(req, res) {
    const {status, node_id} = req.query;
    let fromDate = convert.convertInputDate(req.query.fromDate)
    let toDate = convert.convertInputDate(req.query.toDate + " 23:59:59")
    let condition = {};
    // filter theo ngày
    if(!!fromDate && !!toDate) Object.assign(condition,{create_at: {[Op.between]: [fromDate, toDate]}})
    else if(!!fromDate)  Object.assign(condition,{create_at: {[Op.gte]: fromDate}})
    else if(!!toDate)  Object.assign(condition,{create_at: {[Op.lte]: toDate}})
    // filter theo status
    if(!!status){
        if(typeof(status)==="string") Object.assign(condition,{status: status})
        else Object.assign(condition,{status: {[Op.or]: status}})
    } 
    // filter theo node_id
    if(!!node_id){
        if(typeof(node_id)==="string") Object.assign(condition,{node_id: node_id})
        else Object.assign(condition,{node_id: {[Op.or]: node_id}})
    } 
    try {
        const get_nodeStatus = await node_status.findAll({
            raw: true,
            where: condition
        });
        response.ok(res, get_nodeStatus);
    } catch (error) {
        response.internal(res, error);
    }
}

async function add_nodeStatus(req, res) {
    const {node_id,status,create_at,note} = req.body;
    try {
        // node_id da check tai mdw truoc
        if( ![1,2,3].includes(status) ) return response.badRequest(res,"Sai định dạng status:INT");
        if( !checkData.isDate(create_at) ) return response.badRequest(res,"Sai định dạng date:date");
        if(!!note) {
            if( !checkData.isTextOnly(note) ) return response.badRequest(res,"Sai định dạng note:text only");
        }

        const nodeStatus = await node_status.create({
            node_id: node_id,
            status: status,
            create_at: create_at,
            note: note
        });
        response.created(res, nodeStatus);
    } catch (error) {
        console.log(error);
        response.internal(res, error);
    }
}

async function edit_nodeStatus(req, res) {
    const {id} = req.params;
    const {node_id,status,create_at,note} = req.body;
    try {
        // node_id da check tai mdw truoc
        if(!!status)
        if( ![1,2,3].includes(status) ) return badRequest(res,"Sai định dạng status:INT");
        if( !checkData.isDate(create_at) ) return badRequest(res,"Sai định dạng date:date");
        if(!!note) {
            if( !checkData.isTextOnly(note) ) return badRequest(res,"Sai định dạng note:text only");
        }

        const nodeStatus = await node_status.create({
            node_id: node_id,
            status: status,
            create_at: create_at,
            note: note
        });

        response.created(res, nodeStatus);
    } catch (error) {
        response.internal(res, error);
    }
}

module.exports = {
    // res
    list_nodeStatus: list_nodeStatus,
    add_nodeStatus: add_nodeStatus,
    // edit_nodeStatus: edit_nodeStatus,
    
};
