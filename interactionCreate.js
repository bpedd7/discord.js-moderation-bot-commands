//interactionCreate 

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ban') {
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id);
    
    if (!member) return interaction.reply('User not found in this server.');

    try {
      await member.ban();
      await interaction.reply(`${user.tag} has been banned.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('I could not ban this user.');
    }
  }

  if (commandName === 'kick') {
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id);
    
    if (!member) return interaction.reply('User not found in this server.');

    try {
      await member.kick();
      await interaction.reply(`${user.tag} has been kicked.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('I could not kick this user.');
    }
  }

  if (commandName === 'mute') {
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) return interaction.reply('User not found in this server.');

    const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
    if (!mutedRole) {
      try {
        const role = await interaction.guild.roles.create({
          name: 'Muted',
          permissions: [],
        });
        interaction.guild.channels.cache.forEach(channel => {
          channel.permissionOverwrites.create(role, {
            SEND_MESSAGES: false,
            SPEAK: false,
          });
        });
      } catch (err) {
        return interaction.reply('An error occurred while creating the Muted role.');
      }
    }

    try {
      await member.roles.add(mutedRole);
      await interaction.reply(`${user.tag} has been muted.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('I could not mute this user.');
    }
  }

  if (commandName === 'unmute') {
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) return interaction.reply('User not found in this server.');

    const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
    if (!mutedRole || !member.roles.cache.has(mutedRole.id)) {
      return interaction.reply(`${user.tag} is not muted.`);
    }

    try {
      await member.roles.remove(mutedRole);
      await interaction.reply(`${user.tag} has been unmuted.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('I could not unmute this user.');
    }
  }

  if (commandName === 'warn') {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided.';
    await interaction.reply(`${user.tag} has been warned. Reason: ${reason}`);
  }
});

bot.login(token);
