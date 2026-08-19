<?php
// php/verifica_terminale.php

session_start();
header('Content-Type: application/json');

// 1. CONTROLLI DI SICUREZZA
if (!isset($_SESSION['user_id']) || !isset($_SESSION['partita_attiva'])) {
    echo json_encode(['success' => false, 'error' => 'Nessuna partita attiva o sessione scaduta.']);
    exit;
}

require_once 'db_config.php';

// 2. LETTURA DEL TENTATIVO IN INVIATO DA JS
$input_JSON = file_get_contents('php://input');
$dati = json_decode($input_JSON, true);

$tentativo_utente = isset($dati['password']) ? trim($dati['password']) : '';

// 3. RECUPERO DATI DI SESSIONE
$soluzione_corretta = $_SESSION['root_password'];
$match_id = $_SESSION['match_id'];

// 4. VERIFICA E CALCOLO DELL'ESITO
$esito = 'SCONFITTA';


if ($tentativo_utente === $soluzione_corretta) {
    $esito = 'VITTORIA';
}

// 5. AGGIORNAMENTO DEL DATABASE
try {
    $stmt = $pdo->prepare("UPDATE Partite SET esito = :esito WHERE id = :match_id");
    $stmt->execute([
        'esito' => $esito,
        'match_id' => $match_id
    ]);
} catch (PDOException $e) {
    error_log("Errore aggiornamento esito partita: " . $e->getMessage());
}

// 6. PULIZIA DELLA SESSIONE (Anti-Cheat)
unset($_SESSION['root_password']);
unset($_SESSION['partita_attiva']);
unset($_SESSION['match_id']);

// 7. RISPOSTA AL FRONTEND
echo json_encode([
    'success' => true,
    'esito' => $esito
]);
?>