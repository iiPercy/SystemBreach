<?php
// php/genera_enigma.php

session_start();
header('Content-Type: application/json');

// 1. VERIFICA SICUREZZA
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Accesso negato. Utente non autenticato.']);
    exit;
}

require_once 'db_config.php';

// 2. SCELTA DOMINIO E CALCOLO
$dominio = rand(1, 3);
$password_corretta = '';
$indizio_1 = [];
$indizio_2 = [];

if ($dominio === 1) {
    // DOMINIO MATEMATICO
    $S = rand(100, 999);
    $O = rand(10, 99);
    $M = rand(2, 5);
    $password_corretta = (string)(($S * $M) - $O);
    
    $indizio_1 = ['id' => 'c1', 'titolo' => 'INFO SERVER', 'testo' => "Server bersaglio: ID {$S}"];
    $indizio_2 = ['id' => 'c2', 'titolo' => 'ALGORITMO OVERRIDE', 'testo' => "Per lo sblocco usare: (ID_SERVER * {$M}) - {$O}"];

} elseif ($dominio === 2) {
    // DOMINIO CRITTOGRAFICO
    $parole = ['ROOT', 'ADMIN', 'KRNL', 'UNIX', 'BASH'];
    $password_corretta = $parole[array_rand($parole)];
    
    $shift = rand(-3, 3);
    if ($shift === 0) $shift = 2;

    $cifrata = '';
    foreach(str_split($password_corretta) as $char) {
        $ascii = ord($char) + $shift;
        if($ascii > 90) $ascii -= 26; // Z -> A
        if($ascii < 65) $ascii += 26; // A -> Z
        $cifrata .= chr($ascii);
    }
    
    $segno = $shift > 0 ? "+{$shift}" : $shift;
    $indizio_1 = ['id' => 'c1', 'titolo' => 'DUMP MEMORIA', 'testo' => "Stringa intercettata: {$cifrata}"];
    $indizio_2 = ['id' => 'c2', 'titolo' => 'PROTOCOLLO SICUREZZA', 'testo' => "Attenzione: Tutte le password odierne hanno subito uno shift Cesare di {$segno}"];

} else {
    // DOMINIO CRONOLOGICO
    $Y = date("Y");
    $M = str_pad(rand(1, 12), 2, '0', STR_PAD_LEFT);
    $N = rand(10, 99);
    $password_corretta = $Y . $M . $N;
    
    $indizio_1 = ['id' => 'c1', 'titolo' => 'LOG BRECCIA', 'testo' => "Data violazione: Anno {$Y}, Mese {$M}"];
    $indizio_2 = ['id' => 'c2', 'titolo' => 'FORMATO RECOVERY', 'testo' => "Il codice di sblocco e' la concatenazione di: ANNO + MESE + ID_INCIDENTE ({$N})"];
}

// SALVATAGGIO IN SESSIONE:
$_SESSION['root_password'] = $password_corretta;
$_SESSION['partita_attiva'] = true;

// 3. GENERAZIONE FILE SYSTEM VIRTUALE E RED HERRINGS
$file_system = [
    'mail' => [
        ['id' => 'm1', 'titolo' => 'Spam: Offerta Toner', 'testo' => 'Acquista subito le nostre cartucce a metà prezzo!'],
        ['id' => 'm2', 'titolo' => 'Riunione spostata', 'testo' => 'Il meeting delle 15:00 è annullato.']
    ],
    'log' => [
        ['id' => 'l1', 'titolo' => 'sys_error_0x99', 'testo' => 'Kernel panic. Riavvio forzato su porta 8080.'],
        ['id' => 'l2', 'titolo' => 'auth_dump', 'testo' => 'Tentativo di accesso fallito (IP: 192.168.1.4)']
    ],
    'appunti' => [
        ['id' => 'a1', 'titolo' => 'Lista Spesa', 'testo' => "- Caffè\n- Zucchero\n- Cavi ethernet CAT6"]
    ],
    'trash' => [
        ['id' => 't1', 'titolo' => 'Bozza licenziamento', 'testo' => 'Caro Marco, la tua condotta recente...']
    ],
    'config' => [
        ['id' => 'cf1', 'titolo' => 'NET_CONF', 'testo' => 'GATEWAY=10.0.0.1\nSUBNET=255.255.255.0']
    ]
];

// DISTRIBUZIONE DEGLI INDIZI
$applicazioni = array_keys($file_system);
shuffle($applicazioni);

$app_indizio_1 = $applicazioni[0];
$app_indizio_2 = $applicazioni[1];

$file_system[$app_indizio_1][] = $indizio_1;
$file_system[$app_indizio_2][] = $indizio_2;

foreach ($file_system as $app => $contenuti) {
    shuffle($file_system[$app]);
}

// 4. TRACCIAMENTO NEL DATABASE
$match_id = null;
try {
    $stmt = $pdo->prepare("INSERT INTO Partite (utente_id, esito, data_ora) VALUES (:uid, 'IN CORSO', NOW())");
    $stmt->execute(['uid' => $_SESSION['user_id']]);
    $match_id = $pdo->lastInsertId();
    $_SESSION['match_id'] = $match_id; 
} catch (PDOException $e) {
    error_log("Errore inserimento partita: " . $e->getMessage());
}

// 5. RISPOSTA JSON
echo json_encode([
    'success' => true,
    'match_id' => $match_id,
    'file_system' => $file_system
]);