<?php
// if(!isset($_SESSION['connect'])){
//     header("location: ../php/deconnexion.php");
//     exit();
// }
?>
<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="https://bootswatch.com/4/solar/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="public/css/style.css">
    <title>Accueil</title>

    <script src="https://kit.fontawesome.com/24e802c015.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>

<body class=" bg-dark">

    <main>
        <!--NAVBAR-->
        <nav class="navbar navbar-info bg-info">
            <p class="navbar-brand text-white">StickyList</p>
            <div class="d-inline">
                <p class="text-right text-white"><a class="badge badge-info" href="index.php?deconnexion"><i class="fas fa-power-off"></a></i></p>
            </div>
        </nav>

        <!-- bouton ajout tâche -->
        <div class="container">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <button type="button" class="btn btn-success mt-5" data-toggle="modal" data-target="#modalAjouter">Ajouter</button>
                </div>
            </div>
        </div>

        <div id="warning" class="alert w-50 mx-auto text-center"></div>

        <!-- Liste -->
        <div class="container mt-3">
            <div class="row">
                <div class="col-sm-8 mx-auto">
                    <div class="card bg-info">
                        <div class="card-header text-white">Liste globale</div>
                        <div class="card-body bg-color">

                            <!--ici position tâche -->
                            <div class="list-group" id="tacheListe">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </main>

    <!--Modal ajouter -->
    <div class="modal fade" id="modalAjouter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content border border-info">
                <div class="modal-header bg-info">
                    <h5 class="modal-title text-white" id="exampleModalLabel">Ajouter une tâche</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" id="closeAdd">&times;</span>
                    </button>
                </div>
                <div class="modal-body bg-white">

                    <div id="warningModal" class="alert w-100 mx-auto text-center invisible"></div>

                    <form id="tacheFormAjout" method="POST" class="card bg-color">
                        <div class="form-group p-4">
                            <!-- champ dynamique suivant l'utilisateur -->
                            <input type="hidden" name="utilisateur" id="utilisateur" value="1">

                            <label for="tacheDescription" class="text-dark">Ajouter une tâche</label>
                            <input type="text" name="tacheDescription" id="tacheDescription" class="form-control tache" placeholder="Description de la tâche">

                            <div class="col text-right mt-3">
                                <input type="submit" class="btn btn-info rounded-pill">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--Modal Modifier -->
    <div class="modal fade" id="modalMod" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title text-white" id="ModalLabel"></h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" id="closeMod">&times;</span>
                    </button>
                </div>
                <div class="modal-body bg-white">

                    <div id="warningModalMod" class="alert w-100 mx-auto text-center invisible"></div>

                    <form id="tacheModifier" method="POST" class="card bg-color tache">
                        <div class="form-group">
                            <div class="container">
                                <label class="text-dark mt-3">Modifer la tâche</label>
                                <input type="text" name="tache2" id="tache2" class="form-control tache">

                                <label id="labelModif" class="text-dark mt-3">Attribuer la tâche</label>
                                <select name="listeUtilisateur" id="listeUtilisateur" class="form-control tache">
                                    <!-- ici se trouvera le nom des users à attribuer -->
                                </select>
                                <div class="col text-right mt-3">
                                    <input type="submit" class="btn btn-info rond" value="Modifier">
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!--fin modal content -->
        </div>
    </div>

    <script src="public/js/taches.js"></script>
</body>

</html>