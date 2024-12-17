//bot online + slash commands 

const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

const token = 'YOUR_BOT_TOKEN'; 
const clientId = 'YOUR_CLIENT_ID'; 
const guildId = 'YOUR_GUILD_ID'; (test guild id)

// Slash command registration
const commands = [
  new SlashCommandBuilder().setName('ban').setDescription('Ban a user').addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true)),
  new SlashCommandBuilder().setName('kick').setDescription('Kick a user').addUserOption(option => option.setName('user').setDescription('User to kick').setRequired(true)),
  new SlashCommandBuilder().setName('mute').setDescription('Mute a user').addUserOption(option => option.setName('user').setDescription('User to mute').setRequired(true)),
  new SlashCommandBuilder().setName('unmute').setDescription('Unmute a user').addUserOption(option => option.setName('user').setDescription('User to unmute').setRequired(true)),
  new SlashCommandBuilder().setName('warn').setDescription('Warn a user').addUserOption(option => option.setName('user').setDescription('User to warn').setRequired(true)),
].map(command => command.toJSON());

// Register slash commands
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
