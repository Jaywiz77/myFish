const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

require('dotenv').config(); //initialize dotenv
const {Client, Intents, MessageEmbed}= require('discord.js'); //import discord.js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');



const gameport = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "build")));

const GAME_EVENT = "GAME EVENT";
const SPECIAL_EVENT = "SPECIAL EVENT";
const DISCONNECT_EVENT = "DISCONNECT EVENT";

const specialEvents = {
    SYNC_STATE: "SYNC STATE"
}

// When client connects
io.on("connection", socket => {
    console.log(`Client id ${socket.id} connected`);

    socket.on(GAME_EVENT, action => {
        io.emit(GAME_EVENT, action)
    });

    socket.on("playClick", action => {
        io.emit("playClick",action);
    });

        socket.on("playMove",action => {
        io.emit("playMove",action);
    });


    socket.on(SPECIAL_EVENT, action => {
        switch (action.type) {
            case specialEvents.SYNC_STATE:
                console.log(`[${SPECIAL_EVENT}] ${action.type} | ${socket.id} ping ${action.playerid}`);
                io.to(action.playerid).emit(SPECIAL_EVENT, {
                    ...action
                });
                break;
            default:
                break;
        }
    });


    // When client disconnects
    socket.on("disconnecting", () => {
        console.log(`Client id ${socket.id} disconnecting`)
        io.emit(DISCONNECT_EVENT, socket.id);
    });
});

server.listen(gameport, () => {
    console.log(`App listening on port ${gameport}`);
});

//Discordjs part

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

const commands = [
    new SlashCommandBuilder()
        .setName("newpingugame")
        .setDescription("start a new pingu Game!"),
].map((command) => command.toJSON());



(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({
    intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}); //create new client

const gameUrl = "http://104.215.188.54:3002/"


client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;  
  switch (interaction.commandName) {
    case "newpingugame":
          const newRoomEmbed = new MessageEmbed()
              .setTitle("Hungry Pingu Game")
              .setDescription("Click this link to join the game!")
              .setURL(`${gameUrl}`)
              .setImage(`${gameUrl}/images/pengu1.gif`)
              .setTimestamp();
          interaction.channel.send({ content: `${interaction.user.username} has created a pingu game!`, embeds: [newRoomEmbed] });

      break;
   }
})

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); 
