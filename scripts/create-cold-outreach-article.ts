import { db } from '@/lib/db'

async function main() {
  console.log('📝 Atualizando artigo com blocos multimídia...')

  const admin = await db.admin.findUnique({
    where: { email: 'admin@vortek.com' }
  })

  if (!admin) {
    console.error('❌ Admin não encontrado')
    return
  }

  // Deletar artigo existente e recriar
  await db.article.deleteMany({
    where: { slug: 'contato-a-frio-guia-completo' }
  })

  await db.article.create({
    data: {
      slug: 'contato-a-frio-guia-completo',
      title: 'Contato a Frio: O Guia Definitivo para Vender Sem Parecer Vendedor',
      excerpt: 'Aprenda a fazer contato a frio que realmente funciona. Estratégias práticas, templates prontos e um caso real de sucesso com 100% de conversão.',
      category: 'Vendas',
      tags: JSON.stringify(['Vendas', 'Cold Outreach', 'Prospectação', 'Marketing', 'Negócios']),
      published: true,
      featured: true,
      readTime: 15,
      coverImage: '/articles/cold-outreach-cover.png',
      blocks: JSON.stringify([
        {
          id: '1',
          type: 'heading',
          content: { level: 2, text: 'O que é Contato a Frio (e por que você está fazendo errado)' },
          order: 0
        },
        {
          id: '2',
          type: 'text',
          content: { text: 'Contato a frio, ou cold outreach, é a arte de iniciar conversas com potenciais clientes que nunca interagiram com sua empresa antes. É diferente de inbound marketing, onde as pessoas vêm até você. No cold outreach, você vai até elas.' },
          order: 1
        },
        {
          id: '3',
          type: 'text',
          content: { text: 'O problema? A maioria das pessoas faz isso de forma terrível. Elas copiam e colam mensagens genéricas, ignoram o contexto do prospecto, e parecem robôs desesperados por uma venda. O resultado: taxas de resposta de 1-2% e uma reputação destruída.' },
          order: 2
        },
        // IMAGEM ILUSTRATIVA
        {
          id: 'img1',
          type: 'image',
          content: { 
            url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 
            alt: 'Equipe de vendas fazendo prospecção', 
            caption: 'O cold outreach moderno é sobre relevância, não volume.' 
          },
          order: 3
        },
        {
          id: '4',
          type: 'heading',
          content: { level: 2, text: 'A Nova Mentalidade do Cold Outreach' },
          order: 4
        },
        {
          id: '5',
          type: 'text',
          content: { text: 'Esqueça o que você aprendeu sobre "bater metas de ligações" ou "enviar 100 emails por dia". O cold outreach moderno é sobre relevância extrema. É sobre encontrar a pessoa certa, no momento certo, com a mensagem certa.' },
          order: 5
        },
        {
          id: '6',
          type: 'heading',
          content: { level: 3, text: 'Os 3 Pilares do Cold Outreach que Funciona' },
          order: 6
        },
        {
          id: '7',
          type: 'text',
          content: { text: '**1. Contexto Profundo**: Você precisa entender quem é seu prospecto, o que ele faz, quais são suas dores, e onde ele está presente online.\n\n**2. Personalização Real**: Não é só colocar o nome da pessoa na mensagem. É sobre demonstrar que você estudou o caso dela.\n\n**3. Proposta de Valor Imediata**: O que a pessoa ganha respondendo você? Se não estiver claro, ela não vai responder.' },
          order: 7
        },
        // VÍDEO EXPLICATIVO
        {
          id: 'vid1',
          type: 'video',
          content: { 
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
            title: 'Vídeo: Os 3 Pilares do Cold Outreach',
            duration: '8:45'
          },
          order: 8
        },
        {
          id: '8',
          type: 'heading',
          content: { level: 2, text: 'Case Real: Como Converti 100% com uma Abordagem Diferente' },
          order: 9
        },
        {
          id: '9',
          type: 'text',
          content: { text: 'Vou compartilhar um caso real que aconteceu comigo. Eu estava navegando em uma rede social quando vi um comentário em um post que nem era meu. Uma pessoa chamada Silmara comentou que tinha interesse em ter uma loja online para fazer renda extra, mas estava esperando comprar um notebook para começar.' },
          order: 10
        },
        // ÁUDIO - PODCAST DO CASE
        {
          id: 'aud1',
          type: 'audio',
          content: { 
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
            title: 'Podcast: O Case da Silmara - Cold Outreach que Funciona',
            duration: '12:30'
          },
          order: 11
        },
        {
          id: '10',
          type: 'heading',
          content: { level: 3, text: 'O que eu fiz de diferente?' },
          order: 12
        },
        {
          id: '11',
          type: 'text',
          content: { text: '1. **Identifiquei a dor real**: Ela queria renda extra, mas tinha uma barreira (falta de notebook)\n2. **Ofereci solução para a barreira**: Nossa plataforma não precisa de notebook avançado\n3. **Reduzi o risco ao zero**: Teste gratuito por 1 mês, sem compromisso\n4. **Criei urgência sem pressão**: "Sua vitrine pronta em 2 dias"\n5. **Dei escolha**: Ela poderia ver uma demonstração ou já começar' },
          order: 13
        },
        // IMAGEM DO PRINT DA CONVERSA
        {
          id: 'img2',
          type: 'image',
          content: { 
            url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', 
            alt: 'Exemplo de mensagem de cold outreach personalizada', 
            caption: 'Print real da conversa com a Silmara - 100% de conversão' 
          },
          order: 14
        },
        {
          id: '12',
          type: 'heading',
          content: { level: 3, text: 'A Mensagem que Enviei' },
          order: 15
        },
        {
          id: '13',
          type: 'code',
          content: { 
            language: 'text', 
            code: 'Olá Silmara, boa noite..\n\nPercebi que demonstrou interesse em ter uma loja online,\nfazer uma renda extra, e que estava à espera de um notebook\npra iniciar..\n\nSomos a Vortek, e temos uma vitrine. Podemos montar a sua\ntotalmente grátis, te ajudar com produtos, conteúdo, e você\ntesta sem compromisso por um mês.\n\nE caso dê resultados, você pensa em fechar com a gente depois.\n\nO que acha? Quer ter sua vitrine pronta em 2 dias? Sem custos..\n\nSó me responder que passamos uma demonstração de uma vitrine\npronta, ou já partimos pra planejar e montar a sua..' 
          },
          order: 16
        },
        {
          id: '14',
          type: 'heading',
          content: { level: 3, text: 'O Resultado' },
          order: 17
        },
        {
          id: '15',
          type: 'text',
          content: { text: 'Três dias depois, ela respondeu: "Olá, boa noite. Sim, quero."\n\nTaxa de conversão: 100% (1 contato, 1 resposta positiva)\n\nPor que funcionou? Porque a mensagem não parecia um script de vendas. Parecia uma conversa genuína de alguém que leu o comentário dela, entendeu sua situação, e ofereceu uma solução real.' },
          order: 18
        },
        {
          id: '16',
          type: 'heading',
          content: { level: 2, text: 'O Método PASSO para Cold Outreach' },
          order: 19
        },
        {
          id: '17',
          type: 'text',
          content: { text: 'Desenvolvi um método que você pode aplicar em qualquer situação de contato a frio:' },
          order: 20
        },
        // INFOGRÁFICO DO MÉTODO PASSO
        {
          id: 'img3',
          type: 'image',
          content: { 
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 
            alt: 'Infográfico do Método PASSO', 
            caption: 'O método PASSO: Pesquise, Adapte, Simplifique, Seja Específico, Ofereça Valor' 
          },
          order: 21
        },
        {
          id: '18',
          type: 'heading',
          content: { level: 3, text: 'P - Pesquise o Contexto' },
          order: 22
        },
        {
          id: '19',
          type: 'text',
          content: { text: 'Antes de enviar qualquer mensagem, gaste pelo menos 5 minutos pesquisando sobre a pessoa:\n\n• O que ela postou recentemente?\n• Quais problemas ela mencionou publicamente?\n• Onde ela trabalha e o que faz?\n• Quais são os comentários que ela faz em posts?\n\nNo caso da Silmara, eu vi um comentário dela em um post que falava sobre negócios online. Ela mencionou a barreira do notebook. Isso foi ouro.' },
          order: 23
        },
        {
          id: '20',
          type: 'heading',
          content: { level: 3, text: 'A - Adapte sua Oferta' },
          order: 24
        },
        {
          id: '21',
          type: 'text',
          content: { text: 'Não tente encaixar seu produto em qualquer situação. Pergunte-se:\n\n• Minha solução resolve um problema REAL que essa pessoa tem?\n• Exista alguma barreira que eu posso ajudar a remover?\n• O que posso oferecer que seja de valor imediato?\n\nNo exemplo, eu não tentei vender a plataforma. Eu ofereci uma vitrine GRATUITA, com SUPORTE, por UM MÊS. O risco para ela era zero.' },
          order: 25
        },
        {
          id: '22',
          type: 'heading',
          content: { level: 3, text: 'S - Simplifique a Resposta' },
          order: 26
        },
        {
          id: '23',
          type: 'text',
          content: { text: 'A pior coisa que você pode fazer é deixar a pessoa confusa sobre o que fazer depois. No final da minha mensagem, dei duas opções claras:\n\n1. Ver uma demonstração de vitrine pronta\n2. Já planejar e montar a dela\n\nIsso elimina a fricção. Ela só precisa responder "sim" ou escolher uma opção.' },
          order: 27
        },
        {
          id: '24',
          type: 'heading',
          content: { level: 3, text: 'S - Seja Específico' },
          order: 28
        },
        {
          id: '25',
          type: 'text',
          content: { text: 'Detalhes específicos criam credibilidade:\n\n• "Em 2 dias" - não "em breve" ou "rapidinho"\n• "Sem custos" - não "preço acessível"\n• "1 mês de teste" - não "algum tempo"\n\nVagueza mata conversões. Especificidade gera confiança.' },
          order: 29
        },
        {
          id: '26',
          type: 'heading',
          content: { level: 3, text: 'O - Ofereça Valor Antes de Pedir' },
          order: 30
        },
        {
          id: '27',
          type: 'text',
          content: { text: 'A maioria dos cold outreachs pede algo: "Posso marcar uma call?", "Você teria 5 minutos?", "Que tal uma demonstração?"\n\nInverta isso. Ofereça valor PRIMEIRO:\n\n• "Vou te montar uma vitrine grátis"\n• "Te ajudo com os produtos"\n• "Dou suporte sem compromisso"\n\nA venda acontece naturalmente quando você entrega valor primeiro.' },
          order: 31
        },
        {
          id: '28',
          type: 'heading',
          content: { level: 2, text: 'Onde Encontrar Oportunidades de Cold Outreach' },
          order: 32
        },
        {
          id: '29',
          type: 'text',
          content: { text: 'O segredo não é sair mandando mensagens aleatórias. É encontrar sinais de intenção:' },
          order: 33
        },
        {
          id: '30',
          type: 'heading',
          content: { level: 3, text: '1. Comentários em Posts de Nicho' },
          order: 34
        },
        {
          id: '31',
          type: 'text',
          content: { text: 'Vá em posts de influenciadores do seu nicho e leia os comentários. Procure por:\n\n• Pessoas perguntando "como fazer X"\n• Pessoas mencionando problemas específicos\n• Pessoas comparando soluções\n• Pessoas pedindo recomendações\n\nIsso é ouro. Essas pessoas estão pedindo para serem abordadas.' },
          order: 35
        },
        // VÍDEO TUTORIAL
        {
          id: 'vid2',
          type: 'video',
          content: { 
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
            title: 'Tutorial: Como encontrar oportunidades de cold outreach',
            duration: '15:20'
          },
          order: 36
        },
        {
          id: '32',
          type: 'heading',
          content: { level: 3, text: '2. Grupos e Comunidades' },
          order: 37
        },
        {
          id: '33',
          type: 'text',
          content: { text: 'Grupos de Facebook, comunidades no Discord, fóruns de nicho. Onde seu público-alvo conversa, ali existem oportunidades.\n\nA regra: não entre vendendo. Entre contribuindo. Responda dúvidas, ajude pessoas, e quando identificar uma oportunidade real, faça o contato privado.' },
          order: 38
        },
        {
          id: '34',
          type: 'heading',
          content: { level: 3, text: '3. Menções e Tags' },
          order: 39
        },
        {
          id: '35',
          type: 'text',
          content: { text: 'Monitore menções a problemas que sua solução resolve. Se alguém tweetar "odeio ter que fazer X manualmente", e você tem uma ferramenta que automatiza isso, é uma oportunidade perfeita.\n\nFerramentas como Google Alerts, Mention, ou até buscas manuais no Twitter/LinkedIn funcionam.' },
          order: 40
        },
        {
          id: '36',
          type: 'heading',
          content: { level: 2, text: 'Templates Prontos para Usar' },
          order: 41
        },
        {
          id: '37',
          type: 'heading',
          content: { level: 3, text: 'Template 1: Abordagem por Comentário (usado no case)' },
          order: 42
        },
        {
          id: '38',
          type: 'code',
          content: { 
            language: 'text', 
            code: 'Olá [Nome], [saudação]..\n\nPercebi que [mencione o que você viu - comentário/post/ação]\nque demonstrou interesse em [desejo mencionado],\ne que [barreira específica que ela mencionou]..\n\nSomos a [sua empresa], e [o que vocês fazem em uma frase].\nPodemos [oferta de valor específica], te ajudar com [benefício 1],\n[benefício 2], e você [redução de risco].\n\nE caso dê resultados, [condição para fechar negócio].\n\nO que acha? Quer [opção A]? Sem [objeção comum]..\n\nSó me responder que [próximo passo A] ou [próximo passo B]..' 
          },
          order: 43
        },
        {
          id: '39',
          type: 'heading',
          content: { level: 3, text: 'Template 2: Abordagem por Conteúdo Compartilhado' },
          order: 44
        },
        {
          id: '40',
          type: 'code',
          content: { 
            language: 'text', 
            code: 'Oi [Nome], vi que você compartilhou [artigo/post específico]\nsobre [tema]. Excelente escolha!\n\nTrabalho com [área] e notei que o artigo não mencionou\n[ponto importante que você domina].\n\nEscrevi um guia sobre isso - quer que te envie?\nSem custo, só pra ajudar mesmo.' 
          },
          order: 45
        },
        {
          id: '41',
          type: 'heading',
          content: { level: 3, text: 'Template 3: Abordagem por Problema Declarado' },
          order: 46
        },
        {
          id: '42',
          type: 'code',
          content: { 
            language: 'text', 
            code: '[Nome], vi seu post sobre [problema específico].\n\nPasso por isso com vários clientes e descobri que\na causa geralmente é [insight específico].\n\nDesenvolvi um [recurso/ferramenta/método] que ajuda.\nPosso te mostrar como funciona em 5 min?\n\nSe não for útil, sem problemas - só quero ajudar.' 
          },
          order: 47
        },
        // ÁUDIO - DICA EXTRA
        {
          id: 'aud2',
          type: 'audio',
          content: { 
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 
            title: 'Dica de Ouro: Como adaptar cada template para seu nicho',
            duration: '5:15'
          },
          order: 48
        },
        {
          id: '43',
          type: 'heading',
          content: { level: 2, text: 'Os 7 Erros Fatais no Cold Outreach' },
          order: 49
        },
        {
          id: '44',
          type: 'text',
          content: { text: '**1. Parecer um robô**: Mensagens genéricas são ignoradas instantaneamente. Se você não gastou tempo personalizando, a pessoa não vai gastar tempo respondendo.\n\n**2. Falar só de você**: "Nós somos a empresa X, fundada em Y, com Z clientes..." Ninguém se importa. Fale do PROBLEMA da pessoa.\n\n**3. Pedir sem dar**: "Posso te ligar?" "Tem 15 minutos?" "Quer uma demonstração?" O que você está oferecendo em troca?\n\n**4. Ignorar o contexto**: Mandar mensagem sobre email marketing para alguém que postou sobre problemas com vendas. Contexto é tudo.\n\n**5. Ser genérico**: "Tenho uma solução que pode te ajudar." Qual problema? Como ajuda? Seja específico.\n\n**6. Pressionar**: "Só hoje!", "Última chance!", "Não perca!" Isso espanta. Urgência real vem de entender a dor, não de táticas de escassez falsa.\n\n**7. Não ter follow-up**: Se a pessoa não respondeu, você desiste? Um follow-up bem feito pode dobrar suas taxas de resposta.' },
          order: 50
        },
        // IMAGEM DOS ERROS
        {
          id: 'img4',
          type: 'image',
          content: { 
            url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 
            alt: 'Erros comuns em cold outreach', 
            caption: 'Evite estes 7 erros fatais no seu cold outreach' 
          },
          order: 51
        },
        {
          id: '45',
          type: 'heading',
          content: { level: 2, text: 'Métricas que Importam' },
          order: 52
        },
        {
          id: '46',
          type: 'text',
          content: { text: 'Não meça apenas "mensagens enviadas". Isso é vaidade. Meça:' },
          order: 53
        },
        {
          id: '47',
          type: 'heading',
          content: { level: 3, text: 'Métricas Principais' },
          order: 54
        },
        {
          id: '48',
          type: 'text',
          content: { text: '• **Taxa de Resposta**: Quantas pessoas responderam? Meta: 20-40%\n• **Taxa de Interesse**: Das respostas, quantas demostraram interesse real? Meta: 50%+\n• **Taxa de Conversão**: Quantas viraram clientes/reuniões? Meta: 10-20%\n\nSe sua taxa de resposta está abaixo de 10%, sua mensagem está errada. Se está acima de 50% mas não converte, sua oferta está errada.' },
          order: 55
        },
        {
          id: '49',
          type: 'heading',
          content: { level: 3, text: 'Métricas de Qualidade' },
          order: 56
        },
        {
          id: '50',
          type: 'text',
          content: { text: '• **Tempo médio de resposta**: Quanto mais rápido, mais interessada a pessoa\n• **Tamanho das respostas**: Respostas longas indicam interesse genuíno\n• **Perguntas feitas**: Se a pessoa faz perguntas, é sinal de interesse\n• **Marcações**: Se ela marca outras pessoas, você acertou em cheio' },
          order: 57
        },
        {
          id: '51',
          type: 'heading',
          content: { level: 2, text: 'Cold Outreach em Diferentes Canais' },
          order: 58
        },
        {
          id: '52',
          type: 'heading',
          content: { level: 3, text: 'LinkedIn' },
          order: 59
        },
        {
          id: '53',
          type: 'text',
          content: { text: 'O LinkedIn é o reino do cold outreach B2B. Funcione assim:\n\n1. Não mande conexão com mensagem de venda\n2. Aceite que a pessoa pode não aceitar sua conexão\n3. Se aceitar, espere 1-2 dias antes de enviar mensagem\n4. Primeira mensagem: reconhecimento + valor, sem pitch\n5. Segunda mensagem (se responder): proposta específica' },
          order: 60
        },
        // VÍDEO LINKEDIN
        {
          id: 'vid3',
          type: 'video',
          content: { 
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
            title: 'Estratégia de Cold Outreach no LinkedIn',
            duration: '10:30'
          },
          order: 61
        },
        {
          id: '54',
          type: 'heading',
          content: { level: 3, text: 'Instagram/Redes Sociais' },
          order: 62
        },
        {
          id: '55',
          type: 'text',
          content: { text: 'Mais informal, mas os princípios são os mesmos:\n\n1. Siga a pessoa primeiro\n2. Interaja com stories/posts por 2-3 dias\n3. Responda a um story com valor real\n4. Se houver reciprocidade, mande DM personalizada\n\nNunca mande link na primeira mensagem. É spam na certa.' },
          order: 63
        },
        {
          id: '56',
          type: 'heading',
          content: { level: 3, text: 'Email' },
          order: 64
        },
        {
          id: '57',
          type: 'text',
          content: { text: 'Ainda funciona, mas precisa ser hiper-personalizado:\n\n• Assunto: Use algo específico sobre a pessoa\n• Corpo: Máximo 150 palavras\n• CTA: Uma ação clara e simples\n• Assinatura: Mínima, sem badges ou frases motivacionais\n\nDica: responda a um email que a pessoa enviou (newsletter, por exemplo). Taxa de abertura é muito maior.' },
          order: 65
        },
        {
          id: '58',
          type: 'heading',
          content: { level: 2, text: 'Conclusão: Cold Outreach é Sobre Humanidade' },
          order: 66
        },
        {
          id: '59',
          type: 'text',
          content: { text: 'No fim das contas, cold outreach funciona quando você trata pessoas como pessoas, não como leads em um funil.\n\nA Silmara respondeu porque minha mensagem não parecia um script de vendas. Parecia alguém que leu o que ela escreveu, entendeu sua situação, e ofereceu ajuda real.\n\nIsso não é técnica de vendas. É empatia. É prestar atenção. É resolver problemas de verdade.\n\nEntão, antes de enviar sua próxima mensagem de cold outreach, pergunte-se:\n\n• Eu leria essa mensagem até o final se recebesse?\n• Parece que foi escrita para MIM especificamente?\n• Está claro o que eu ganho respondendo?\n\nSe a resposta for "sim" para as três, você está no caminho certo.' },
          order: 67
        },
        // IMAGEM FINAL INSPIRACIONAL
        {
          id: 'img5',
          type: 'image',
          content: { 
            url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', 
            alt: 'Sucesso em vendas através de conexões genuínas', 
            caption: 'Cold outreach é sobre humanidade, não sobre scripts.' 
          },
          order: 68
        },
        {
          id: '60',
          type: 'cta',
          content: { 
            title: 'Quer implementar cold outreach na sua empresa?', 
            description: 'A Vortek ajuda você a criar estratégias de prospecção que realmente funcionam, sem parecer vendedor invasivo.', 
            buttonText: 'Falar com Especialista', 
            buttonLink: '#contato' 
          },
          order: 69
        }
      ]),
      metaTitle: 'Contato a Frio: Guia Definitivo | Vortek Blog',
      metaDescription: 'Aprenda a fazer cold outreach que funciona. Estratégias práticas, templates prontos e um caso real com 100% de conversão.',
      publishedAt: new Date(),
      authorId: admin.id,
    }
  })

  console.log('✅ Artigo atualizado com blocos multimídia!')
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
