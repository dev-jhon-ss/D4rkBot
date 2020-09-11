const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lista de todos os comandos ou informações de um comando específico.',
    aliases: ['comandos', 'cmd', 'cmds', 'ajuda', 'ajd', 'cmdlist', 'commandlist'],
    cooldown: 5,
    async execute(client, message, args, prefix) {
        const data = [];
        const Admin = [];
        const Definicoes = [];
        const Desenvolvedor = [];
        const Info = [];
        const Musica = [];
        const Outros = [];
        const { commands } = message.client;

        const res = new MessageEmbed()
            .setTitle('Ajuda')
            .setColor('RANDOM')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        if (!args.length) {
            res.setDescription('Lista de todos os meus comandos:')
            commands.map(command => {
                if (command.category === 'Admin') Admin.push(command.name);
                else if (command.category === 'Definicoes') Definicoes.push(command.name);
                else if (command.category === 'Desenvolvedor') Desenvolvedor.push(command.name);
                else if (command.category === 'Info') Info.push(command.name);
                else if (command.category === 'Musica') Musica.push(command.name);
                else if (command.category === 'Outros') Outros.push(command.name);
                else Info.push(command.name);
            });

            res.addField(':cop: Admin', Admin.join(', '))
               .addField(':gear: Definições', Definicoes.join(', '))
               .addField('<:lang_js:427101545478488076> Desenvolvedor', Desenvolvedor.join(', '))
               .addField(':information_source: Info', Info.join(', '))
               .addField('<a:Labfm:482171966833426432> Musica', Musica.join(', '))
               .addField(':books: Outros', Outros.join(', '))
               .addField(':thinking: Ajuda', `\nFaz \`${prefix}help [nome do comando]\` para obter informação sobre um comando específico`);
            
            const msg = await message.channel.send(res);
            msg.delete({ timeout: 90000 });
            await msg.react('751062867444498432');

            const filter = (r, u) => r.me && (u.id === message.author.id || message.guild.member(u).hasPermission('MANAGE_MESSAGES'));
            const collector = msg.createReactionCollector(filter, { max: 1, time: 90 * 1000 });

            collector.on('collect', async r => {
                switch(r.emoji.name) {
                    case 'x_':
                        msg.delete();
                        break;
                }
            });
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply(`:x: Não tenho nenhum comando com o nome \`${name}\``);
        }

        data.push(`**Nome:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descrição:** ${command.description}`);
        if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`)

        data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

        message.channel.send(data, { split: true });
    }
};