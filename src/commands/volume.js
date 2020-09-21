module.exports = {
    name: 'volume',
    description: 'Muda o volume da música',
    category: 'Musica',
    aliases: ['vol'],
    usage: '[volume (1/100)]',
    guildOnly: true,
    cooldown: 3,
    execute(client, message, args) {
        const player = client.music.players.get(message.guild.id);

        if (!player)
            return message.channel.send(':x: Não estou a tocar nada de momento!');
        
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel || (voiceChannel && voiceChannel.id !== player.voiceChannel.id))
            return message.channel.send(':x: Precisas de estar no meu canal de voz para usar esse comando!');

        if (!args[0]) 
            return message.channel.send(`:speaker: Volume atual \`${player.volume}\``)

        if (Number(args[0]) <= 0 || Number(args[0]) > 100) 
            return message.channel.send(':x: O volume pode variar apenas <1/100>');

        player.setVolume(Number(args[0]));

        message.channel.send(`:speaker: Volume da música setado para \`${Number(args[0])}\``);
    }
}