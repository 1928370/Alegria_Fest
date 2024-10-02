<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Curso do Yuri Silva</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    header {
        background-color: #333;
        color: #fff;
        text-align: center;
        padding: 10px 0;
    }
    .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    h1 {
        text-align: center;
    }
    p {
        line-height: 1.6;
    }
    .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #04ff4f;
        color: #000000;
        text-decoration: none;
        border-radius: 5px;
    }
    img {
        max-width: 100%;
        height: auto;
        display: center;
        margin: 20px auto;
        border-radius: 20px;
        text-align: center;
    }
</style>
</head>
<body>
<header>
    <h1>Cursos Online</h1>
</header>
<div class="container">
    <h2>Sobre o Curso</h2>
    <p>Este é um curso incrível ministrado por Yuri Silva. Aprenda Novas carreiras, aqui temos todos os tipos de Curso e com orçamento que é pra você.</p>
    <img src="img/pexels-rdne-6517091.jpg" width="200px" class="img" alt="Curso do Yuri Silva">
    <img src="img/pexels-ravikant-4531875.jpg" width="200px" class="img" alt="Curso do Yuri Silva">
    <img src="img/pexels-roman-odintsov-5912280.jpg" width="200px" class="img" alt="Curso do Yuri Silva">
    <h2>Benefícios do Curso</h2>
    <ul>
        <li>Aprenda com um especialista no assunto</li>
        <li>Acesso a materiais exclusivos</li>
        <li>Suporte individualizado</li>
    </ul>
    <h2>Preço do Curso</h2>
    <p>Clique no botão abaixo pra saber mais do Curso.</p>
    <a href="https://api.whatsapp.com/send?phone=5534988302860&text=Ol%C3%A1%20Yuri,%20Eu%20*gostaria*%20de%20Saber%20dos%20*Cursos%20Online*!" class="btn">Contata-me</a>
</div>

<script>
    const comprarBtn = document.getElementById('comprarBtn');
    comprarBtn.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja comprar o curso do Yuri Silva?')) {
            alert('Compra realizada com sucesso! Em breve você receberá mais informações por e-mail.');
        } else {
            alert('Compra cancelada. Se precisar de mais informações, entre em contato conosco.');
        }
    });
</script>

</body>
</html>
