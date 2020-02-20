'use strict';
/**
 * Module:
 * Author:      
 * Created by:  
 * Modified:
 *
 */

const lodash = require('lodash');

const {_Error_Code} = require('./models/_error_code');
const ErrorInfo = {
    304: "Không thể chỉnh sửa",
    400: "Sai cấu trúc yêu cầu",
    401: "Tài khoản chưa được xác thực",
    403: "Không đủ quyền thực hiện",
    404: "Không tìm thấy ",
    422: "Không thể xử lý, kiểm tra dữ liệu đầu vào",
    500: "Lỗi thuộc về server",
};

async function addNewErrorType(statusCode, message){
    try{
        let [errorCode=null, errorMessage="", errorDescription=""] = [message._error_code, message._error_message];
        if(!errorCode) return;
        if(ErrorInfo[statusCode]){
            errorDescription = ErrorInfo[statusCode];
            switch (statusCode) {
                case 500: errorMessage = "Internal Server Error";
                break;
                case 404: errorDescription += lodash.words(errorMessage)[0];
                break;
            }
        }

        let _error_code = await _Error_Code.update({
            statusCode, errorCode, errorMessage
        }, {
            where:{
                errorCode
            }
        });
        if(!_error_code[0]){
            _Error_Code.create({
                statusCode, errorCode, errorMessage, errorDescription
            });
        }
    } catch (err) {
        log.error(err.message);
    }
}
// addNewErrorType("432", )

module.exports = {
    addNewErrorType,
}
