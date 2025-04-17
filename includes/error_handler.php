<?php
// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Définir un gestionnaire d'erreurs personnalisé
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    $error_message = date('Y-m-d H:i:s') . " - Erreur : [$errno] $errstr dans $errfile à la ligne $errline\n";
    
    // Log l'erreur dans un fichier
    error_log($error_message, 3, __DIR__ . '/../logs/error.log');
    
    if (DEBUG_MODE) {
        echo "<div style='color: red; background: #ffebee; padding: 10px; margin: 10px; border: 1px solid #ffcdd2;'>";
        echo "<strong>Erreur :</strong><br>";
        echo "Type : $errno<br>";
        echo "Message : $errstr<br>";
        echo "Fichier : $errfile<br>";
        echo "Ligne : $errline";
        echo "</div>";
    }
    
    return true;
}

// Définir le gestionnaire d'erreurs
set_error_handler('customErrorHandler');
?> 