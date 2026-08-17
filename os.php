<?php
// os.php

session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminale di Root - Accesso d'Emergenza</title>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/desktop.css">
</head>
<body id="os-body">

    <header id="hud-top">
        <div class="warning-text">SYSTEM PURGE INITIATED</div>
        <div id="timer-display">05:00</div>
    </header>

    <main id="desktop-area">
        
        <aside id="icon-dock">

            <button class="os-icon" data-app="mail">
                <span class="icon-symbol">✉</span>
                <span class="icon-label">MAIL.ENC</span>
            </button>
            
            <button class="os-icon" data-app="log">
                <span class="icon-symbol">≡</span>
                <span class="icon-label">SYS_LOG</span>
            </button>
            
            <button class="os-icon" data-app="appunti">
                <span class="icon-symbol">⚿</span>
                <span class="icon-label">NOTES</span>
            </button>
            
            <button class="os-icon terminal-icon" data-app="terminal">
                <span class="icon-symbol">&gt;_</span>
                <span class="icon-label">ROOT_TERM</span>
            </button>
        </aside>

        <div id="windows-container"></div>

    </main>


    <script src="js/timer.js"></script>
    <script src="js/ui_manager.js"></script>
    <script src="js/game_core.js"></script>
    <script src="js/terminal.js"></script>
</body>
</html>