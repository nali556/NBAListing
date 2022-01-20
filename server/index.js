const express = require("express")
const app = express();
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json()) //req.body

//Routes

//Create player

app.post("/players", async (req,res)=>{
    try{
        const {description} = req.body
        const newPlayer = await pool.query("INSERT INTO player (description) VALUES($1) RETURNING *", [description])
        
        res.json(newPlayer.rows[0])
    }catch(err){
        console.log(err.message)
    }
})

//Get all players
app.get("/players", async (req,res)=>{
    try{
        const allPlayers = await pool.query("SELECT * FROM player")
        res.json(allPlayers.rows)
    }catch(err){
        console.log(err.message)
    }
})

//Get a player
app.get("/players/:id", async (req,res)=>{
    try{
        const { id } = req.params
        const onePlayer = await pool.query("SELECT * FROM player WHERE player_id = $1", [id])
        res.json(onePlayer.rows[0])
    }catch(err){
        console.log(err.message)
    }
})

//Update a player
app.put("/players/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const {description} = req.body
        const updateTo = await pool.query("UPDATE player SET description = $1 WHERE player_id = $2", [description, id])

        res.json("Player updated")
    }catch(err){
        console.log(err.message)
    }
})

//Delete a player
app.delete("/players/:id", async (req,res)=>{
    try{
       const {id} = req.params
       const deletePlayer = await pool.query("DELETE FROM player WHERE player_id = $1", [id])
       res.json("Player deleted")
    }catch(err){
        console.log(err.message)
    }
})

app.listen(5001, () =>{
    console.log("Server has started on port 5001")
})