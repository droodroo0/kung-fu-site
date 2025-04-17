<?php
// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérifier que les constantes nécessaires sont définies
if (!defined('SITE_TITLE') || !defined('SITE_URL')) {
    die('Erreur : Les constantes SITE_TITLE ou SITE_URL ne sont pas définies.');
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) : SITE_TITLE; ?></title>
    
    <!-- Retirer la balise base qui peut causer des problèmes -->
    <!-- <base href="<?php echo SITE_URL; ?>/"> -->
    
    <!-- Utiliser des chemins absolus -->
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <?php 
    // Utiliser ABSPATH pour les chemins
    $nav_path = dirname(__FILE__) . '/navigation.php';
    $footer_path = dirname(__FILE__) . '/footer.php';
    
    if (file_exists($nav_path)) {
        include $nav_path;
    } else {
        echo "<div style='color: red; padding: 10px;'>Erreur : Navigation non trouvée ($nav_path)</div>";
    }
    
    if (!isset($content)) {
        echo "<div style='color: red; padding: 10px;'>Erreur : Variable \$content non définie</div>";
    } else {
        echo $content;
    }
    
    if (file_exists($footer_path)) {
        include $footer_path;
    } else {
        echo "<div style='color: red; padding: 10px;'>Erreur : Footer non trouvé ($footer_path)</div>";
    }
    ?>
    
    <script src="<?php echo SITE_URL; ?>/assets/js/script.js"></script>
</body>
</html> 