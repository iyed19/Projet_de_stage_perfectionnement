const agentCollection = require("../models/agent");

exports.getAddAgent = (req,res) => {
    res.render("addAgent");
};
exports.addAgent = async (req, res) =>{
    const agentData = {
        name: req.body.agentname,
        lastName: req.body.lastName,
        serialNumber: req.body.number.slice(0,5),
        service: req.body.service
    }

    const existingAgent = await agentCollection.findOne({serialNumber: agentData.serialNumber});

    if(existingAgent){
        res.send("This agent's number already exists !");
    }else{
        const agentdata = await agentCollection.insertMany(agentData);
    }  
};
    


exports.getUpdateAgent = async (req, res) => {
    try{
        const listAgents = await agentCollection.find({}, {"__v": false});
        res.render('updateAgent', {listAgents});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};
exports.updateAgent = async (req, res) => {
    const newAgentData = {
        name: req.body.name,
        lastName: req.body.lastName,
        serialNumber: req.body.serialNumber,
        service: req.body.service
    }

    const selectedAgentId  = req.body.option;

    if(selectedAgentId) {
        const updatedAgent = await agentCollection.updateOne(
            { _id: selectedAgentId },
            { $set: newAgentData }
        );
        res.status(200).send('Agent updated successfully!');
    }else{
        res.status(500).send('Internal Server Error');
        console.log(err);
    }  
}



exports.getDeleteAgent = async (req, res) => {
    try{
        const listAgents = await agentCollection.find({}, {"__v": false});
        res.render('deleteAgent', {listAgents});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};
exports.deleteAgent = async (req, res) => {
    const selectedAgentId  = req.body.option;
    try {
        const existingAgent = await agentCollection.findOne({ _id: selectedAgentId});
        if(existingAgent){
            const deletedAgent = await agentCollection.deleteOne({ _id: selectedAgentId });
            res.status(200).send('Agent deleted successfully!');
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};



exports.getAgents = async (req, res) => {
    try{
        const listAgents = await agentCollection.find({}, {"__v": false});
        res.render('listOfAgent', {listAgents});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};