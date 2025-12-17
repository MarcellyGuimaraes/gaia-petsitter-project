# 🌿 Gaia Pet Sitter

Site institucional profissional para serviços de pet sitter em Feira de Santana - BA.

## 📋 Sobre o Projeto

Site desenvolvido para apresentar os serviços de pet sitter da Gaia, incluindo:
- Informações sobre a profissional
- Serviços oferecidos
- Galeria de fotos
- Sistema de agendamento via WhatsApp
- Depoimentos de clientes

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização com variáveis CSS e custom properties
- **JavaScript (ES6+)** - Funcionalidades interativas
- **Tailwind CSS** - Framework CSS utilitário (via CDN)
- **Font Awesome** - Ícones (via CDN)

## 📁 Estrutura do Projeto

```
site_gaia/
├── assets/
│   ├── imagens/          # Imagens do site
│   ├── scripts.js        # JavaScript principal
│   └── styles.css        # Estilos customizados
├── index.html            # Página principal
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Documentação do projeto
```

## 🎨 Características

### Acessibilidade
- ✅ Estrutura semântica HTML5
- ✅ Atributos ARIA para leitores de tela
- ✅ Navegação por teclado
- ✅ Contraste adequado de cores
- ✅ Labels descritivos em formulários

### Performance
- ✅ Lazy loading em imagens
- ✅ Preconnect para recursos externos
- ✅ Otimização de carregamento de fontes
- ✅ Código JavaScript otimizado

### SEO
- ✅ Meta tags completas
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Estrutura semântica
- ✅ Alt text em todas as imagens

### Responsividade
- ✅ Design mobile-first
- ✅ Menu hambúrguer para mobile
- ✅ Grid responsivo
- ✅ Imagens adaptáveis

## 🔧 Configuração

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desenvolvimento)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/site_gaia.git
```

2. Navegue até a pasta do projeto:
```bash
cd site_gaia
```

3. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Com Python
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

## 📝 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `assets/styles.css` através das variáveis CSS:

```css
:root {
    --color-primary: #C395FB;
    --color-primary-dark: #9672c2;
    /* ... outras cores */
}
```

### WhatsApp
O número do WhatsApp pode ser alterado no arquivo `assets/scripts.js`:

```javascript
const CONFIG = {
    whatsappNumber: '5575999652757',
    // ...
};
```

## 🧪 Testes

### Validação HTML
- Use o [W3C Validator](https://validator.w3.org/)

### Validação CSS
- Use o [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

### Testes de Acessibilidade
- Use o [WAVE](https://wave.webaim.org/)
- Use o [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 📱 Compatibilidade

- ✅ Chrome (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Edge (últimas 2 versões)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**Gaia Pet Sitter**
- WhatsApp: (75) 99965-2757
- Localização: Feira de Santana - BA

## 🙏 Agradecimentos

- Tailwind CSS pela framework utilitária
- Font Awesome pelos ícones
- Google Fonts pela fonte Inter

---

Desenvolvido com ❤️ para cuidar dos melhores amigos

