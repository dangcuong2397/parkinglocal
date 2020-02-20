const {Op} = require('sequelize');
const validator = require('validator');
const response = require('../base/response');
const {isText,isEmpty} = require('../../utils/checkData');
const {node_device} = require('./model/node_device');


async function list_nodeDevice(req, res) {
    try {
        const get_nodeDevice = await node_device.findAll({
            raw: true
        });
        response.ok(res, get_nodeDevice);
    } catch (error) {
        response.internal(res, error);
    }
}

async function get_nodeDevice(req, res) {
    const {id} = req.params;
    try {
        const get_nodeDevice = await node_device.findOne({
            where:{
                id:id
            },
            raw: true
        });
        response.ok(res, get_nodeDevice);
    } catch (error) {
        response.internal(res, error);
    }
}

async function add_nodeDevice(req, res) {
    const {ip,name,park_name,row,col,x_pixcel,y_pixcel,floor} = req.body;
    try {
        // check data
        if( !isText(ip,/[.:]/g) ) return badRequest(res,"Sai định dạng IP:TEXT");
        if( !isText(name) ) return badRequest(res,"Sai định dạng name:TEXT");
        if( !isText(park_name) ) return badRequest(res,"Sai định dạng park_name:TEXT");
        if( !isText(row) ) return badRequest(res,"Sai định dạng row:TEXT");
        if( !isText(col) ) return badRequest(res,"Sai định dạng col:TEXT");
        if(!!floor) {
            if( !validator.isInt(JSON.stringify(floor)) ) return badRequest(res,"Sai định dạng floor:INT");
        }
        if(!!x_pixcel) {
            if( !validator.isInt(JSON.stringify(x_pixcel)) ) return badRequest(res,"Sai định dạng x_pixcel:INT");
        }
        if(!!y_pixcel){
            if( !validator.isInt(JSON.stringify(y_pixcel)) ) return badRequest(res,"Sai định dạng y_pixcel:INT");
        }
        
        const nodeDevice = await node_device.create({
            ip: ip,
            name: name,
            park_name: park_name,
            row: row,
            col: col,
            x_pixcel: x_pixcel,
            y_pixcel: y_pixcel,
            floor: floor
        });
        response.created(res, nodeDevice);
    } catch (error) {
        response.internal(res, error);
    }
}

async function add_list_nodeDevice(req, res) {
    let listRes = req.body;
    let listNode = [];
    try {
        // check data + filter data
        listRes.map(node=>{
            if( !isText(node.ip,/[.:]/g) ) return badRequest(res,"Sai định dạng IP:TEXT");
            if( !isText(node.name) ) return badRequest(res,"Sai định dạng name:TEXT");
            if( !isText(node.park_name) ) return badRequest(res,"Sai định dạng park_name:TEXT");
            if( !isText(node.row) ) return badRequest(res,"Sai định dạng row:TEXT");
            if( !isText(node.col) ) return badRequest(res,"Sai định dạng col:TEXT");
            if(!!node.floor) {
                if( !validator.isInt(JSON.stringify(node.floor)) ) return badRequest(res,"Sai định dạng floor:INT");
            }
            if(!!node.x_pixcel) {
                if( !validator.isInt(JSON.stringify(node.x_pixcel)) ) return badRequest(res,"Sai định dạng x_pixcel:INT");
            }
            if(!!node.y_pixcel){
                if( !validator.isInt(JSON.stringify(node.y_pixcel)) ) return badRequest(res,"Sai định dạng y_pixcel:INT");
            }
            listNode.push({ip:node.ip,
                name:node.name,
                park_name:node.park_name,
                row:node.row,
                col:node.col,
                floor: node.floor,
                x_pixcel:node.x_pixcel,
                y_pixcel:node.y_pixcel
            })
        })
        console.log(listNode);
        const nodeDevice = await node_device.bulkCreate(listNode);
        response.created(res, nodeDevice);
    } catch (error) {
        response.internal(res, error);
    }
}

async function edit_nodeDevice(req, res) {
    const {id} = req.params;
    const {ip,name,park_name,row,col,x_pixcel,y_pixcel,floor} = req.body;
    let body = {};
    try {
        // check data
        if(!!ip){
            if( !isText(ip,/[.:]/g) ) return badRequest(res,"Sai định dạng IP:TEXT");
            else{Object.assign(body,{ip:ip})}
        }
        if(!!name){
            if( !isText(name) ) return badRequest(res,"Sai định dạng name:TEXT");
            else{Object.assign(body,{name:name})}
        }
        if(!!park_name){
            if( !isText(park_name) ) return badRequest(res,"Sai định dạng park_name:TEXT");
            else{Object.assign(body,{park_name:park_name})}
        }
        if(!!row){
            if( !isText(row) ) return badRequest(res,"Sai định dạng row:TEXT");
            else{Object.assign(body,{row:row})}
        }
        if(!!col){
            if( !isText(col) ) return badRequest(res,"Sai định dạng col:TEXT");
            else{Object.assign(body,{col:col})}
        }
        if(!!floor){
            if( !validator.isInt(JSON.stringify(floor)) ) return badRequest(res,"Sai định dạng floor:INT");
            else{Object.assign(body,{floor:floor})}
        }
        if(!!x_pixcel){
            if( !validator.isInt(JSON.stringify(x_pixcel)) ) return badRequest(res,"Sai định dạng x_pixcel:INT");
            else{Object.assign(body,{x_pixcel:x_pixcel})}
        }
        if(!!y_pixcel){
            if( !validator.isInt(JSON.stringify(y_pixcel)) ) return badRequest(res,"Sai định dạng y_pixcel:INT");
            else{Object.assign(body,{y_pixcel:y_pixcel})}
        }
        const update_nodeDevice = await node_device.update(
            body,
            {
                where:{id:id}
            }
        );
        if(!!update_nodeDevice) {
            Promise.all([update_nodeDevice,fn_get_nodeDevice(id)])
                .then(result => {
                    response.ok(res, result[1]);
                })
                .catch(error => response.internal(res, error))
        }
    } catch (error) {
        response.internal(res, error);
    }
}

async function mdw_nodeDevice_exist(req,res,next) {
    let id = isEmpty(req.body) ? undefined:  req.body.node_id;
    if(isEmpty(id)) id = req.params.id || req.params.node_id;
    if(isEmpty(id)) id = req.query.node_id;
    if(isEmpty(id)) return response.badRequest(res,"Lỗi định dạng trường node_id không được để trống");
    console.log(id);
    try {
        const get_nodeDevice = await node_device.findOne({
            where: {
                id:id
            },
            raw: true
        });
        if (get_nodeDevice !== null) next();
        else return response.badRequest(res,`Không tìm thấy node_device ID=${id}`)
    } catch (error) {
        response.internal(res, error);
    }
}

async function mdw_nodeDevice_exist_allowEmpty(req,res,next) {
    let id = isEmpty(req.body) ? undefined:  req.body.node_id;
    if(isEmpty(id)) id = req.params.id || req.params.node_id;
    if(isEmpty(id)) id = req.query.node_id;
    if(isEmpty(id)) next();
    else {
        try {
            const get_nodeDevice = await node_device.findOne({
                where:{
                    id:id
                },
                raw: true
            });
            if (get_nodeDevice !== null) next();
            else return response.badRequest(res,`Không tìm thấy node_device ID=${id}`)
        } catch (error) {
            response.internal(res, error);
        }
    }
}

async function fn_get_nodeDevice(id_nodeDevice) {
    return await node_device.findOne({
        where:{
            id:id_nodeDevice
        },
        raw: true
    });
}

module.exports = {
    // res
    list_nodeDevice: list_nodeDevice,
    get_nodeDevice: get_nodeDevice,
    add_nodeDevice: add_nodeDevice,
    add_list_nodeDevice: add_list_nodeDevice,
    edit_nodeDevice: edit_nodeDevice,
    
    mdw_nodeDevice_exist: mdw_nodeDevice_exist,
    mdw_nodeDevice_exist_allowEmpty: mdw_nodeDevice_exist_allowEmpty,

};
