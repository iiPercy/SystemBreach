<?php
// esito.php

session_start();
require_once 'php/db_config.php';

if (!isset($_SESSION['user_id']) || !isset($_GET['id'])) {
    header("Location: index.php");
    exit;
}

$match_id = intval($_GET['id']);
$user_id = $_SESSION['user_id'];

$stmt = $pdo->prepare("SELECT esito FROM Partite WHERE id = :id AND utente_id = :uid");
$stmt->execute(['id' => $match_id, 'uid' => $user_id]);
$partita = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$partita) {
    header("Location: index.php");
    exit;
}

$is_vittoria = ($partita['esito'] === 'VITTORIA');

$theme_class = $is_vittoria ? 'theme-win' : 'theme-lose';
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esito Operazione</title>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/esito.css">
</head>
<body class="<?php echo $theme_class; ?>">

    <div class="esito-box">
        <?php if ($is_vittoria): ?>
            <h1>Override Riuscito</h1>
            <p>Accesso di root confermato. Il sistema è ora sotto il tuo controllo.</p>
        <?php else: ?>
            <h1>Sistema Bloccato</h1>
            <p>Tempo scaduto o procedura fallita. Tutte le tracce sono state cancellate.</p>
        <?php endif; ?>

        <div class="btn-group">
            <a href="os.php" class="btn-action primary">Riprova</a>
            <a href="profilo.php" class="btn-action">Profilo</a>
            <a href="classifica.php" class="btn-action">Classifica</a>
        </div>
    </div>

</body>
</html>