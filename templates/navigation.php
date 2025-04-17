<header>
    <nav>
        <div class="logo">
            <h1>Club de Kung-Fu</h1>
        </div>
        <ul class="nav-links">
            <li><a href="<?php echo SITE_URL; ?>/" <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'class="active"' : ''; ?>>Accueil</a></li>
            <li><a href="<?php echo SITE_URL; ?>/grades.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'grades.php') ? 'class="active"' : ''; ?>>Grades</a></li>
            <li><a href="<?php echo SITE_URL; ?>/manifestations.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'manifestations.php') ? 'class="active"' : ''; ?>>Manifestations</a></li>
            <li><a href="<?php echo SITE_URL; ?>/documents.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'documents.php') ? 'class="active"' : ''; ?>>Documents</a></li>
            <li><a href="<?php echo SITE_URL; ?>/galerie.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'galerie.php') ? 'class="active"' : ''; ?>>Galerie</a></li>
            <li><a href="<?php echo SITE_URL; ?>/boutique.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'boutique.php') ? 'class="active"' : ''; ?>>Boutique</a></li>
        </ul>
        <div class="auth-buttons">
            <?php if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']): ?>
                <span class="user-name">Bonjour, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <a href="<?php echo SITE_URL; ?>/login.php?logout=true" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
            <?php else: ?>
                <a href="<?php echo SITE_URL; ?>/login.php" class="login-btn"><i class="fas fa-sign-in-alt"></i> Connexion</a>
                <a href="<?php echo SITE_URL; ?>/login.php?register=true" class="register-btn"><i class="fas fa-user-plus"></i> Inscription</a>
            <?php endif; ?>
        </div>
        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>
</header> 