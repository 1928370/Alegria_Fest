// script.js
// Funcionalidades para os botões do site Kiwify Academy

document.addEventListener('DOMContentLoaded', function() {
    // Botão Área do Aluno (desktop e mobile)
    function bindAlunoButtons() {
        document.querySelectorAll('button, .mobile-menu button').forEach(btn => {
            if (btn.textContent.includes('Área do Aluno') && !btn.dataset.bound) {
                btn.dataset.bound = '1';
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    exibirTelaLogin();
                });
            }
        });
    }
    bindAlunoButtons();
    // Re-bind após abrir menu mobile
    const observer = new MutationObserver(bindAlunoButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    // Botão Começar Agora (hero e CTA)
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Começar Agora')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const cursos = document.querySelector('section.bg-white');
                if (cursos) cursos.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // Botão Ver Todos os Cursos
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Ver Todos os Cursos')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const cursos = document.querySelector('section.bg-white');
                if (cursos) cursos.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // Botão Ver Vídeo (abre modal)
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Ver Vídeo')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                abrirModalVideo();
            });
        }
    });

    // Botão Acessar Curso
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Acessar Curso')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const card = btn.closest('.course-card');
                if (card) {
                    const nome = card.querySelector('h3')?.textContent || 'Curso';
                    const preco = card.querySelector('span.font-bold')?.textContent || 'R$ 0,00';
                    exibirTelaLoginCurso(nome, preco);
                }
            });
        }
    });
});

// --- NOVO LOGIN FUNCIONAL E ÁREA DO ALUNO EM NOVA JANELA ---

function exibirTelaLogin() {
    removerModais();
    const modal = document.createElement('div');
    modal.id = 'modal-login';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#fff;padding:2.5rem 2.5rem 2rem 2.5rem;border-radius:18px;max-width:370px;width:100%;position:relative;box-shadow:0 8px 32px #0002;">
        <button id="fechar-modal-login" style="position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#333;z-index:2;cursor:pointer;">&times;</button>
        <h2 style="font-size:1.7rem;font-weight:bold;margin-bottom:1.5rem;text-align:center;color:#6B46C1;">Login do Aluno</h2>
        <form id="form-login">
          <input id="login-email" type="email" required placeholder="E-mail" autocomplete="username" style="width:100%;padding:0.85rem;margin-bottom:1rem;border:1px solid #ccc;border-radius:8px;font-size:1rem;">
          <input id="login-senha" type="password" required placeholder="Senha" autocomplete="current-password" style="width:100%;padding:0.85rem;margin-bottom:1.5rem;border:1px solid #ccc;border-radius:8px;font-size:1rem;">
          <button type="submit" style="width:100%;background:#6B46C1;color:#fff;padding:0.85rem;border:none;border-radius:8px;font-weight:bold;font-size:1.1rem;">Entrar</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-login').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.getElementById('form-login').onsubmit = function(ev) {
        ev.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const senha = document.getElementById('login-senha').value.trim();
        if (validarLoginAluno(email, senha)) {
            modal.remove();
            abrirAreaAlunoNovaAba(email);
        } else {
            alert('E-mail ou senha inválidos!');
        }
    };
}

function validarLoginAluno(email, senha) {
    // Novo cadastro de exemplo
    return email === 'usuario@exemplo.com' && senha === 'senha789';
}

function abrirAreaAlunoNovaAba(email) {
    const html = `
    <html lang='pt-br'>
    <head>
      <title>Área do Aluno - Kiwify Academy</title>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width,initial-scale=1.0'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        body { font-family:sans-serif;background:linear-gradient(135deg,#6B46C1 0%,#4299E1 100%);margin:0;min-height:100vh; }
        .container { max-width:600px;margin:40px auto 0 auto;background:#fff;border-radius:18px;box-shadow:0 8px 32px #0002;padding:2.5rem 2rem 2rem 2rem; }
        h1 { color:#6B46C1;text-align:center;margin-bottom:1.5rem; }
        .curso-card { background:#f7f7ff;border-radius:12px;padding:1.5rem 1.2rem;margin-bottom:1.5rem;box-shadow:0 2px 8px #0001;display:flex;align-items:center;justify-content:space-between; }
        .curso-info { display:flex;align-items:center;gap:1rem; }
        .curso-icon { font-size:2.2rem;color:#6B46C1;background:#ede9fe;border-radius:50%;padding:0.7rem; }
        .curso-nome { font-size:1.15rem;font-weight:bold;color:#333; }
        .curso-btn { background:#6B46C1;color:#fff;padding:0.7rem 1.2rem;border:none;border-radius:8px;font-weight:bold;font-size:1rem;cursor:pointer;transition:background .2s; }
        .curso-btn:hover { background:#4299E1; }
        .sair { margin-top:2.5rem;display:block;width:100%;background:#e53e3e;color:#fff;padding:0.7rem 0;border:none;border-radius:8px;font-weight:bold;font-size:1rem;cursor:pointer; }
      </style>
    </head>
    <body>
      <div class='container'>
        <h1>Bem-vindo, ${email.split('@')[0]}!</h1>
        <div class='curso-card'>
          <div class='curso-info'>
            <span class='curso-icon'><i class="fas fa-chart-line"></i></span>
            <span class='curso-nome'>Domine o ChatGPT e Ferramentas Essenciais para o Dia a Dia</span>
          </div>
          <button class='curso-btn' id='btn-vendas'>Acessar Material</button>
        </div>
        <div class='curso-card'>
          <div class='curso-info'>
            <span class='curso-icon'><i class="fas fa-funnel-dollar"></i></span>
            <span class='curso-nome'>Copywriting de Alta Conversão</span>
          </div>
          <button class='curso-btn' onclick="alert('Em breve!')">Acessar Material</button>
        </div>
        <div class='curso-card'>
          <div class='curso-info'>
            <span class='curso-icon'><i class="fas fa-users"></i></span>
            <span class='curso-nome'>Tráfego Pago para Iniciantes</span>
          </div>
          <button class='curso-btn' onclick="alert('Em breve!')">Acessar Material</button>
        </div>
        <button class='sair' onclick='window.close()'>Sair</button>
      </div>
      <script>
        document.getElementById('btn-vendas').onclick = function() {
          const senha = prompt('Digite a senha do curso Domine o ChatGPT e Ferramentas Essenciais para o Dia a Dia:');
          if(senha === 'vendas123') {
            const link = document.createElement('a');
            link.href = 'cur/curso.pptx';
            link.download = 'Domine-o-ChatGPT-e-Ferramentas-Essenciais.pptx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else if(senha) {
            alert('Senha incorreta!');
          }
        };
      </script>
    </body>
    </html>
    `;
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
}

// Função para exibir tela de login
function exibirTelaLoginAntigo() {
    removerModais();
    const modal = document.createElement('div');
    modal.id = 'modal-login';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;max-width:350px;width:100%;position:relative;box-shadow:0 8px 32px #0002;">
        <button id="fechar-modal-login" style="position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#333;z-index:2;cursor:pointer;">&times;</button>
        <h2 style="font-size:1.5rem;font-weight:bold;margin-bottom:1.5rem;text-align:center;color:#6B46C1;">Área do Aluno</h2>
        <form id="form-login">
          <input type="email" required placeholder="E-mail" style="width:100%;padding:0.75rem;margin-bottom:1rem;border:1px solid #ccc;border-radius:8px;">
          <input type="password" required placeholder="Senha" style="width:100%;padding:0.75rem;margin-bottom:1.5rem;border:1px solid #ccc;border-radius:8px;">
          <button type="submit" style="width:100%;background:#6B46C1;color:#fff;padding:0.75rem;border:none;border-radius:8px;font-weight:bold;font-size:1rem;">Entrar</button>
        </form>
        <p style="margin-top:1rem;text-align:center;font-size:0.95rem;color:#666;">Esqueceu a senha? <a href="#" style="color:#6B46C1;">Recuperar</a></p>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-login').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.getElementById('form-login').onsubmit = function(ev) {
        ev.preventDefault();
        modal.remove();
        exibirAreaAluno();
    };
}

// Função para exibir área do aluno após login
function exibirAreaAluno() {
    removerModais();
    const modal = document.createElement('div');
    modal.id = 'modal-area-aluno';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;max-width:400px;width:100%;position:relative;box-shadow:0 8px 32px #0002;">
        <button id="fechar-modal-area-aluno" style="position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#333;z-index:2;cursor:pointer;">&times;</button>
        <h2 style="font-size:1.5rem;font-weight:bold;margin-bottom:1.5rem;text-align:center;color:#6B46C1;">Bem-vindo(a) à Área do Aluno!</h2>
        <p style="text-align:center;margin-bottom:1.5rem;">Aqui você acessa seus cursos adquiridos.</p>
        <ul style="list-style:none;padding:0;margin:0 0 1.5rem 0;">
          <li style="background:#f3f3f3;padding:0.75rem 1rem;border-radius:8px;margin-bottom:0.5rem;">Vendas Automatizadas</li>
          <li style="background:#f3f3f3;padding:0.75rem 1rem;border-radius:8px;margin-bottom:0.5rem;">Copywriting de Alta Conversão</li>
          <li style="background:#f3f3f3;padding:0.75rem 1rem;border-radius:8px;margin-bottom:0.5rem;">Tráfego Pago para Iniciantes</li>
        </ul>
        <button style="width:100%;background:#6B46C1;color:#fff;padding:0.75rem;border:none;border-radius:8px;font-weight:bold;font-size:1rem;" onclick="location.reload()">Sair</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-area-aluno').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Função para exibir tela de compra de curso
function exibirTelaCompra(nome, preco) {
    removerModais();
    const modal = document.createElement('div');
    modal.id = 'modal-compra';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;max-width:400px;width:100%;position:relative;box-shadow:0 8px 32px #0002;">
        <button id="fechar-modal-compra" style="position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#333;z-index:2;cursor:pointer;">&times;</button>
        <h2 style="font-size:1.3rem;font-weight:bold;margin-bottom:1rem;text-align:center;color:#6B46C1;">Comprar Curso</h2>
        <p style="text-align:center;font-size:1.1rem;margin-bottom:0.5rem;"><b>${nome}</b></p>
        <p style="text-align:center;font-size:1.2rem;color:#4299E1;margin-bottom:1.5rem;"><b>${preco}</b></p>
        <form id="form-pagamento">
          <label style="font-weight:bold;">Escolha o método de pagamento:</label>
          <select id="metodo-pagamento" style="width:100%;padding:0.6rem;margin:0.7rem 0 1.2rem 0;border-radius:8px;border:1px solid #ccc;">
            <option value="pix">Pix</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="boleto">Boleto Bancário</option>
          </select>
          <div id="pagamento-detalhes"></div>
          <button type="submit" style="width:100%;background:#6B46C1;color:#fff;padding:0.75rem;border:none;border-radius:8px;font-weight:bold;font-size:1rem;margin-top:1rem;">Finalizar Compra</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-compra').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    const select = document.getElementById('metodo-pagamento');
    const detalhes = document.getElementById('pagamento-detalhes');
    select.onchange = function() { atualizarDetalhesPagamento(select.value, detalhes); };
    atualizarDetalhesPagamento(select.value, detalhes);
    document.getElementById('form-pagamento').onsubmit = function(ev) {
        ev.preventDefault();
        modal.remove();
        exibirTelaSucessoCompra(nome);
    };
}

function atualizarDetalhesPagamento(metodo, container) {
    if (metodo === 'pix') {
        container.innerHTML = `<div style='text-align:center;margin-bottom:1rem;'><img src='https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=Pagamento+Pix+Kiwify' alt='QR Code Pix'><p style='margin-top:0.5rem;font-size:0.95rem;'>Escaneie o QR Code para pagar com Pix.</p></div>`;
    } else if (metodo === 'cartao') {
        container.innerHTML = `<input type='text' required placeholder='Número do Cartão' style='width:100%;padding:0.6rem;margin-bottom:0.7rem;border-radius:8px;border:1px solid #ccc;'>
        <input type='text' required placeholder='Validade (MM/AA)' style='width:100%;padding:0.6rem;margin-bottom:0.7rem;border-radius:8px;border:1px solid #ccc;'>
        <input type='text' required placeholder='CVV' style='width:100%;padding:0.6rem;margin-bottom:0.7rem;border-radius:8px;border:1px solid #ccc;'>`;
    } else if (metodo === 'boleto') {
        container.innerHTML = `<div style='text-align:center;margin-bottom:1rem;'><img src='https://i.imgur.com/4M7IWwP.png' alt='Boleto' style='height:48px;'><p style='margin-top:0.5rem;font-size:0.95rem;'>Boleto gerado! Clique para <a href='#' onclick='alert("Boleto baixado!")' style='color:#6B46C1;'>baixar</a>.</p></div>`;
    }
}

function exibirTelaSucessoCompra(nome) {
    removerModais();
    const modal = document.createElement('div');
    modal.id = 'modal-sucesso';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;max-width:350px;width:100%;position:relative;box-shadow:0 8px 32px #0002;text-align:center;">
        <button id="fechar-modal-sucesso" style="position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#333;z-index:2;cursor:pointer;">&times;</button>
        <h2 style="font-size:1.3rem;font-weight:bold;margin-bottom:1rem;color:#4299E1;">Compra realizada!</h2>
        <p style="margin-bottom:1.5rem;">Parabéns, você adquiriu o curso <b>${nome}</b>.<br>O acesso será liberado em instantes.</p>
        <button style="width:100%;background:#6B46C1;color:#fff;padding:0.75rem;border:none;border-radius:8px;font-weight:bold;font-size:1rem;" onclick="location.reload()">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-sucesso').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Função para remover qualquer modal aberto
function removerModais() {
    ['modal-login','modal-area-aluno','modal-compra','modal-sucesso','modal-video'].forEach(id => {
        const m = document.getElementById(id);
        if (m) m.remove();
    });
}

// Função para abrir modal do vídeo
function abrirModalVideo() {
    if (document.getElementById('modal-video')) return;
    const modal = document.createElement('div');
    modal.id = 'modal-video';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 10000;
    modal.innerHTML = `
        <div style="position:relative;max-width:90vw;width:600px;background:#fff;border-radius:16px;overflow:hidden;">
            <button id="fechar-modal-video" style="position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#333;z-index:2;cursor:pointer;">&times;</button>
            <div style="width:100%;height:0;padding-bottom:56.25%;position:relative;">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%"></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-video').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Função para exibir tela de login do curso
function exibirTelaLoginCurso(nome, preco) {
    removerModais();
    const modal = document.createElement('div');
    modal.id = 'modal-login-curso';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;max-width:350px;width:100%;position:relative;box-shadow:0 8px 32px #0002;">
        <button id="fechar-modal-login-curso" style="position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#333;z-index:2;cursor:pointer;">&times;</button>
        <h2 style="font-size:1.3rem;font-weight:bold;margin-bottom:1.2rem;text-align:center;color:#6B46C1;">Acesso ao Curso</h2>
        <p style="text-align:center;margin-bottom:1rem;font-weight:bold;">${nome}</p>
        <form id="form-login-curso">
          <input type="password" required placeholder="Senha do curso" style="width:100%;padding:0.75rem;margin-bottom:1.5rem;border:1px solid #ccc;border-radius:8px;">
          <button type="submit" style="width:100%;background:#6B46C1;color:#fff;padding:0.75rem;border:none;border-radius:8px;font-weight:bold;font-size:1rem;">Entrar</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-login-curso').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.getElementById('form-login-curso').onsubmit = function(ev) {
        ev.preventDefault();
        const senha = modal.querySelector('input[type="password"]').value;
        if (validarSenhaCurso(nome, senha)) {
            modal.remove();
            exibirTelaCurso(nome, preco);
        } else {
            alert('Senha incorreta!');
        }
    };
}

// Função para validar senha do curso
function validarSenhaCurso(nome, senha) {
    const senhas = {
        'Vendas Automatizadas': 'vendas123',
        'Copywriting de Alta Conversão': 'copy456',
        'Tráfego Pago para Iniciantes': 'trafego789'
    };
    return senhas[nome] && senha === senhas[nome];
}

// Função para exibir tela exclusiva do curso
function exibirTelaCurso(nome, preco) {
    removerModais();
    const modal = document.createElement('div');
    modal.id = 'modal-curso';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:linear-gradient(135deg,#6B46C1 0%,#4299E1 100%);display:flex;align-items:center;justify-content:center;z-index:10000;';
    let conteudo = '';
    if (nome === 'Vendas Automatizadas') {
        conteudo = `<h2 style='color:#fff;font-size:2rem;font-weight:bold;margin-bottom:1rem;'>${nome}</h2><div style='background:#fff3;padding:2rem;border-radius:16px;max-width:500px;width:100%;color:#fff;'><p>Bem-vindo ao curso de Vendas Automatizadas!<br><br>Conteúdo exclusivo liberado para você.<br><br><b>Preço:</b> ${preco}</p></div>`;
    } else if (nome === 'Copywriting de Alta Conversão') {
        conteudo = `<h2 style='color:#fff;font-size:2rem;font-weight:bold;margin-bottom:1rem;'>${nome}</h2><div style='background:#fff3;padding:2rem;border-radius:16px;max-width:500px;width:100%;color:#fff;'><p>Bem-vindo ao curso de Copywriting de Alta Conversão!<br><br>Conteúdo exclusivo liberado para você.<br><br><b>Preço:</b> ${preco}</p></div>`;
    } else if (nome === 'Tráfego Pago para Iniciantes') {
        conteudo = `<h2 style='color:#fff;font-size:2rem;font-weight:bold;margin-bottom:1rem;'>${nome}</h2><div style='background:#fff3;padding:2rem;border-radius:16px;max-width:500px;width:100%;color:#fff;'><p>Bem-vindo ao curso de Tráfego Pago para Iniciantes!<br><br>Conteúdo exclusivo liberado para você.<br><br><b>Preço:</b> ${preco}</p></div>`;
    } else {
        conteudo = `<h2 style='color:#fff;font-size:2rem;font-weight:bold;margin-bottom:1rem;'>${nome}</h2><div style='background:#fff3;padding:2rem;border-radius:16px;max-width:500px;width:100%;color:#fff;'><p>Bem-vindo ao curso!<br><br>Conteúdo exclusivo liberado para você.<br><br><b>Preço:</b> ${preco}</p></div>`;
    }
    modal.innerHTML = `
      <div style='position:relative;max-width:600px;width:100%;text-align:center;'>
        <button id='fechar-modal-curso' style='position:absolute;top:8px;right:12px;font-size:2rem;background:none;border:none;color:#fff;z-index:2;cursor:pointer;'>&times;</button>
        ${conteudo}
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('fechar-modal-curso').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}
