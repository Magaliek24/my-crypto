<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="description" content="Site de suivi de portefeuilles de cryptomonnaies avec gestion ia alertes en temps réel">
    <meta type="keywords" content="crypto, investissement, portefeuille"


        <meta property="og:url" content="http://localhost:8000">
    <meta property="og:type" content="website"> <!--mettre "blog" si c'est un blog -->
    <meta property="og:title" content="My Crypto">
    <meta property="og:image" content="http://localhost:8000/assets/images/Background_with_octogones.png">
    <meta property="og:description" content="Site de suivi de portefeuilles de cryptomonnaies avec gestion ia alertes en temps réel">


    <link rel="stylesheet" href="./assets/style/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script type="module" src="./assets/js/main.js"></script>
    <title>My Crypto</title>
</head>

<body>
    <header>
        <nav>
            <div id="logo"><a href="/">LOGO</a></div>
            <div id="nav">
                <ul>
                    <li><i class="fab fa-bitcoin"></i><a href="#projet">Le Projet</a></li>
                    <li><i class="fab fa-ethereum"></i><a href="#cryptos">Nos Cryptos</a></li>
                    <li><i class="fab fa-ethereum"></i><a href="#carrousel">Carrousel</a></li>
                    <li><i class="fab fa-contao"></i><a href="#contact">Contact</a></li>
                </ul>
                <i data-theme-toggler class='fas fa-moon'></i>
            </div>
            <i id='toggle-nav' class="fas fa-bars"></i>
        </nav>

    </header>
    <main>
        <section id="hero-header">
            <h1>La crypto pour les nuls</h1>
            <div id="content">
                <p id="p-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    <button class="info">En savoir plus</button>
                </div>
            </div>
        </section>
        <section id="projet">Projet</section>
        <section id="cryptos">Cryptos</section>
        <section id="carrousel">Carrousel
            <div id="carrousel-container">
                <div class="carrousel"></div>
                <div id="carrousel-controls">
                    <button class="prev">&#10094;</button>
                    <button class="next">&#10095;</button>
                </div>
            </div>
            <div id='lightbox'>
                <span class='close'>&times;</span>
                <img src="" alt="" class="lightbox-content" id="lightbox-img" />
            </div>

        </section>
        <section id="contact">Contact</section>
    </main>

    <i id='scroll-to-top' class="fas fa-arrow-up"></i>

    <div id="reseaux">
        <a target="_blank" OnClick="window.open(this.href,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false;" href="https://www.facebook.com/sharer/sharer.php?u=" +encodeURIComponent(window.location.href)+"&t="+document.title;"><i id="facebook" class="fab fa-facebook-square"></i></a>
        <a target="_blank"
            onclick="window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(document.title + ' ' + window.location.href), 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false;">
            <i id="whatsapp" class="fab fa-whatsapp"></i>
        </a>
        <a href=""> <i id="linkedin" class="fab fa-linkedin"></i></a>

    </div>

    <div id="reseaux-mobile">
        <a target="_blank" OnClick="window.open(this.href,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false;" href="https://www.facebook.com/sharer/sharer.php?u=" +encodeURIComponent(window.location.href)+"&t="+document.title;"><i id="facebook" class="fab fa-facebook-square"></i></a>
        <a target="_blank"
            onclick="window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(document.title + ' ' + window.location.href), 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false;">
            <i id="whatsapp" class="fab fa-whatsapp"></i>
        </a>
        <a href=""> <i id="linkedin" class="fab fa-linkedin"></i></a>

    </div>


</body>

</html>