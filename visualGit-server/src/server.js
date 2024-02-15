const express = require('express');
const cors = require('cors');
const {simpleGit} = require('simple-git');
const config = require("../../config");

const app = express();
const port = 8888;

let defaultPath = config.path;
let git = simpleGit(defaultPath);

app.use(cors());
app.get('/',(req,res)=>{
    res.send({"message": "hello from root"});
});

/* Path APIs */
app.post('path',(req,res)=>{
    let {path} = req.body;
    try{
        if(path) git = simpleGit(path);
    }catch(e){
        res.json({"Error": e.message});
    }

});

/* Commit APIs */
app.get('/commit/all',async (req,res)=>{
    let historyLogs = await git.log();
    historyLogs.all = historyLogs.all.map((commit)=> {
        commit.refs = commit.refs.split(",");
        return commit;
    });
    historyLogs.all.reverse();
    res.json(historyLogs);
});

app.get('/commit/:from/:to',async (req,res)=>{
    let {from, to} = req.params;
    from = new Date(from);
    to = new Date(to);
    let commits = await git.log();
    commits = commits.all.filter((commit)=>(new Date(commit.date) <= to && new Date(commit.date) >= from));
    res.json(commits);
});

// get a limited commits starting from the latest.
app.get('/commit/:count',async (req,res)=>{
    let {count} = req.params;
    let commitByHash = await git.log({ maxCount:count});
    res.json(commitByHash);
});


/* Branch APIs */
app.get('/branch/all',async (req,res)=>{
    let branches = await git.branch();
    let local = branches.all.filter((branch)=>!branch.includes("remote"));
    let remote = branches.all.filter((branch)=>branch.includes("remote")).map((branch)=>branch.split("/").slice(-1));
    let branchesRes = {
        ...branches,
        local,
        remote
    }
    res.json(branchesRes);
});


app.get('/branch/local',async (req,res)=>{
    let branches = await git.branchLocal();
    res.json(branches);
});

app.get('/branch/remote',async (req,res)=>{
    let branches = await git.branch();
    branches = branches.all.filter((branch)=>branch.includes("remote"));//.map((branch)=>branch.split("/").slice(-1));
    res.json(branches);
});

app.listen(port, ()=>console.log(`app started on http://localhost:${port}/`));