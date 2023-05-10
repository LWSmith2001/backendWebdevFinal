const data = require("../model/states.json");

const State = require("../model/State");


const GetStates = async (req, res) => {
  const states = data;
  if (states.length == 0) {
    return res.status(400).json({message : "No States Found"});
  }
  console.log(states);
  res.json(states);
};

const GetState = async (req, res) => {

  const state = data.find(element => element["code"] === req.params.state.toUpperCase());

  if (!state) {
    return res.status(400).json({message : "Invalid State ID"});
  }

  res.json(state);
};

const CreateNewFunfact = async (req, res) => {
  const state = data.find(element => element["code"] === req.params.state.toUpperCase());
  if (!state) return res.status(400).json({message : "Invalid State ID"});
  
  if(!(await State.find({"stateCode":req.params.state.toUpperCase()}).count() > 0)) {
    await State.create({"stateCode":req.params.state.toUpperCase(), "funfacts": data.find(element => element["code"] === req.params.state.toUpperCase())["funfacts"]})
  }
  const currentff = await State.findOne({"stateCode":req.params.state.toUpperCase()});
    fun_facts = currentff.funfacts;
    fun_facts.push.apply(fun_facts, req.body.funfacts);
    console.log(fun_facts);

  await State.deleteOne({"stateCode": req.params.state.toUpperCase()});

  const result = State.create({"stateCode": req.params.state.toUpperCase(), "funfacts": fun_facts});

  res.status(200).json({funfacts: fun_facts});
}

const PatchFunfact = async (req, res) => {
  const state = data.find(element => element["code"] === req.params.state.toUpperCase());
  if (!req.body.funfacts) {
    return res.status(400).json({message : "Funfact required"});
  }
  if (!req.body.index) {
    return res.status(400).json({message : "Index required"})
  }
  if (!state) {
    return res.status(400).json({message : "Invalid State ID"});
  }

  const statedoc = await State.findOne({"stateCode":req.params.state.toUpperCase()}, {funfacts:1, _id:0});
  fflist = statedoc.funfacts

  if (fflist.length < req.body.index) {
    return res.status(400).json({message : "index out of range"})
  }
  console.log(fflist)
  fflist[req.body.index] = req.body.funfacts[0];

  await State.deleteOne({"stateCode": req.params.state.toUpperCase()});

  await State.create({"stateCode": req.params.state.toUpperCase(), "funfacts": fflist})

  return res.status(200).json({"stateCode": req.params.state.toUpperCase(), "funfacts": fflist})


}

const DeleteFunfact = async (req, res) => {
  const state = data.find(element => element["code"] === req.params.state.toUpperCase());
  if (!state) return res.status(400).json({message : "Invalid State ID"});
  if (!req.body.index) {
    return res.status(400).json({message : "Index required"});
  }
  if (await State.find({"stateCode":req.params.state.toUpperCase()}).length > 0) {
    return res.status(400).json({message : "State not in mongodb collection"});
  };
    
  currentff = await State.findOne({stateCode: req.params.state.toUpperCase()}, {funfacts: 1, _id: 0});

  if(currentff.funfacts.length == 0)return res.status(400).json({message: "No fun facts to delete"});
  if(currentff.funfacts.length < req.body.index) return res.status(400).json({message: "Index out of range"});

  await State.deleteOne({"stateCode": req.params.state.toUpperCase()});

  currentff.funfacts.splice(req.body.index-1, 1);

  console.log(currentff);

  const result = State.create({"stateCode": req.params.state.toUpperCase(), "funfacts": currentff.funfacts});

  res.status(200).json(currentff);
}

const GetStateFunfact = async (req, res) => {
  const state = data.find(element => element["code"] === req.params.state.toUpperCase());
  
  if (!await State.findOne({"stateCode": req.params.state.toUpperCase()})) {
    return res.status(400).json({message : "state not in mongodb collection"})
  }
  if (!state) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const stateDoc = await State.findOne({"stateCode": req.params.state.toUpperCase()});
  const funfacts = stateDoc.funfacts;
  const fflength = funfacts.length;
  const funfact = funfacts[Math.floor(Math.random() * fflength)];
  return res.status(200).json({"funfact": funfact});
}

const GetStateCapital = async (req, res) => {
  const test = data.find(element => element["code"] === req.params.state.toUpperCase());

  if (!test) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const state = data.find(element => element["code"] === req.params.state.toUpperCase())["state"];
  const capital = data.find(element => element["code"] === req.params.state.toUpperCase())["capital_city"];

  if (!capital) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const result = {'state' : state, 'capital' : capital};
  res.json(result);
}

const GetStateNickname = async (req, res) => {
  const test = data.find(element => element["code"] === req.params.state.toUpperCase());

  if (!test) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const state = data.find(element => element["code"] === req.params.state.toUpperCase())["state"];
  const nickname = data.find(element => element["code"] === req.params.state.toUpperCase())["nickname"];

  if (!nickname) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const result = {'state' : state, 'nickname' : nickname};
  res.json(result);
}

const GetStatePopulation = async (req, res) => {
  const test = data.find(element => element["code"] === req.params.state.toUpperCase());

  if (!test) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const state = data.find(element => element["code"] === req.params.state.toUpperCase())["state"];
  const population = data.find(element => element["code"] === req.params.state.toUpperCase())["population"];

  if (!population) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const result = {'state' : state, 'population' : population};
  res.json(result);
}

const GetStateAdmission = async (req, res) => {
  const test = data.find(element => element["code"] === req.params.state.toUpperCase());

  if (!test) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const state = data.find(element => element["code"] === req.params.state.toUpperCase())["state"];
  const admission = data.find(element => element["code"] === req.params.state.toUpperCase())["admission_date"];

  if (!admission) {
    return res.status(400).json({message : "Invalid State ID"});
  }
  const result = {'state' : state, 'admission' : admission};
  res.json(result);
}

module.exports = {
  GetStates,
  GetState,
  CreateNewFunfact,
  PatchFunfact,
  DeleteFunfact,
  GetStateFunfact,
  GetStateCapital,
  GetStateNickname,
  GetStatePopulation,
  GetStateAdmission
};

