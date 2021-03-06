<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="stylesheet" type="text/css" href="public/css/auth.css">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/solar/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">    
    <title>To Do List Simplon</title>
</head>
<body>
    <div class="container">

        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Authentification</h3>
                   
                    <div id="messageAction"><?php echo $msg;?></div> <!--affiche message-->
                </div>
                <div class="card-body">
                    <form action="index.php" method="POST">
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                            </div>
                            <input type="text" name="email" class="form-control" placeholder="Votre adresse email">
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" name="mdp" class="form-control" placeholder="Votre mot de passe" required>
                        </div>
                        <div class="form-group text-center">
                            <input type="submit" value="Connexion" class="btn login_btn align-middle" required>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center links">
                        Vous n'avez pas encore de compte?<a href="?page=inscription">Inscrivez-vous</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="public/js/msg.js"></script>

</body>
</html>