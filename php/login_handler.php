<?php
// php/login_handler.php

// 1. Setup Iniziale
session_start();
header('Content-Type: application/json');
require_once 'db_config.php';

// 2. Ricezione dei Dati dal JavaScript
$inputJSON = file_get_contents('php://input');
$dati = json_decode($inputJSON, true);
$risposta = [
    'successo' => false,
    'messaggio' => 'Errore generico.'
];
if (!isset($dati['username']) || !isset($dati['password']) || !isset($dati['azione'])) {
    $risposta['messaggio'] = 'Dati mancanti o incompleti.';
    echo json_encode($risposta);
    exit;
}
// Pulizia dei dati di base 
$username = trim($dati['username']);
$password = $dati['password']; 
$azione   = $dati['azione'];

try {
    // 3. Gestione della Logica in base all'Azione 
    if ($azione === 'registrazione') {
        //Controllo se l'username è già preso
        $stmt = $pdo->prepare("SELECT id FROM utenti WHERE username = :username");
        $stmt->execute(['username' => $username]);
        
        if ($stmt->fetch()) {
            $risposta['messaggio'] = "Nome utente già in uso. Scegline un altro.";
        } else {
            //Creazione nuovo utente: Hash della password
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            //Inserimento nel database
            $stmtInsert = $pdo->prepare("INSERT INTO utenti (username, password_hash) VALUES (:username, :password_hash)");
            $stmtInsert->execute([
                'username'      => $username,
                'password_hash' => $passwordHash
            ]);
            
            //Registrazione andata a buon fine, logghiamo l'utente automaticamente
            $_SESSION['user_id'] = $pdo->lastInsertId();
            $_SESSION['username'] = $username;
            
            $risposta['successo'] = true;
            $risposta['messaggio'] = "Registrazione completata con successo.";
        }

    } elseif ($azione === 'login') {
        $stmt = $pdo->prepare("SELECT id, username, password_hash FROM utenti WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $utente = $stmt->fetch();
        if ($utente && password_verify($password, $utente['password_hash'])) {
            $_SESSION['user_id'] = $utente['id'];
            $_SESSION['username'] = $utente['username'];
            $risposta['successo'] = true;
            $risposta['messaggio'] = "Accesso consentito.";
        } else {
            $risposta['messaggio'] = "Credenziali non valide.";
        }
        
    } else {
        $risposta['messaggio'] = "Azione non riconosciuta dal server.";
    }

} catch (PDOException $e) {
    $risposta['messaggio'] = "Errore di connessione al database.";
}

// 4. Risposta Finale
echo json_encode($risposta);
exit;