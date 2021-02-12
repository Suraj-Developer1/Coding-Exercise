const express = require("express");
const app = express();

//set Upper limit for the payload
app.use(express.json({ limit: "10mb" }));

app.post("/payload", (req, res, next) => {
    let reqPayloadData = req.body.payload;
    let replaceData = req.body.referenceData;    
    let response = payloadRec(reqPayloadData, replaceData);
    res.send({ status: true, message: 'Payload proceed successfully', data: response });
});

function payloadRec(reqPayloadData, replaceData){
    if(reqPayloadData.valueType == "string"){
        let oldvalue = reqPayloadData.value;
        let oldvalue1 = oldvalue.split('{');
        let oldvalue2 = oldvalue1.length > 1 ? oldvalue1[1].toString().split('}') : "";
        let oldvalue3 = oldvalue2.length > 1 ? oldvalue2[1] : "";
        let replaceStr = oldvalue2.length > 1 ? replaceData[oldvalue2[0]] : "";
        reqPayloadData.value = oldvalue1[0] + replaceStr + oldvalue3;
    }
    else{
        (reqPayloadData.value).forEach(element => {
            payloadRec(element, replaceData);
        });
    }
    return reqPayloadData;
}

app.listen(8000, () => {
    console.log("listening server");
});
