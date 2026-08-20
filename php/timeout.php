<?php
// php/timeout.php
session_start();

if (!isset($_SESSION['user_id']) || !isset($_SESSION['partita_attiva'])) {
    exit; 
}

require_once 'db_config.php';

try {
    $stmt = $pdo->prepare("UPDATE Partite SET esito = 'SCONFITTA' WHERE id = :match_id");
    $stmt->execute(['match_id' => $_SESSION['match_id']]);
} catch (PDOException $e) {
    error_log("Errore Timeout: " . $e->getMessage());
}

unset($_SESSION['root_password']);
unset($_SESSION['partita_attiva']);
unset($_SESSION['match_id']);
?>