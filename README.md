# Nossa História — Convite de casamento

Versão organizada e comentada do site de **Ana Claudia & Gabriel**.

## Estrutura do projeto

```text
convite_organizado/
├── index.html           # Conteúdo do convite (história, fotos e informações)
├── styles.css           # Estilos, cores, responsividade e animações
├── script.js            # Animação dos capítulos, envelope e WhatsApp
└── assets/              # Fotos e vídeos (precisam ser adicionados)
    ├── first.jpg
    ├── maragogi.jpg
    ├── piri.jpg
    ├── niver.jpg
    ├── pernambuco.mp4
    ├── tocantins.mp4
    ├── desafio.jpg
    └── final.jpg
```

## Como usar

1. Extraia o ZIP.
2. Coloque as fotos e os vídeos na pasta `assets/`, com os nomes acima.
3. Abra `index.html` no navegador.
4. Para publicar o site, envie a pasta completa para sua hospedagem, mantendo essa estrutura.

**Atenção:** as imagens e os vídeos não vieram no arquivo de código enviado. Por isso, eles **não estão incluídos neste pacote**. Sem os arquivos originais na pasta `assets/`, as mídias não aparecerão.

## Onde editar

- **Textos, datas, local e nomes:** `index.html`.
- **Cores, fontes, tamanhos e animações:** `styles.css`.
- **Comportamento do envelope e mensagem de confirmação:** `script.js`.

O botão do WhatsApp abre uma mensagem para que o convidado escolha um destinatário e a envie manualmente. Ele não confirma presença em um banco de dados e não tem um número de telefone pré-configurado.
