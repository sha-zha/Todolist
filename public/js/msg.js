var msg = document.getElementById("messageAction");
message(msg);


function obtenirParametre(sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function message(mesg) {
    switch (mesg.innerHTML) {
        case "KO-conect":
            mesg.innerHTML = "Email ou mot de passe incorrect";
            mesg.classList.remove("invisible");
            mesg.classList.remove('alert-success');
            mesg.classList.add("mt-3");
            mesg.classList.add('alert-danger');
            break;
        case "KO-insc":
            mesg.innerHTML = "Pseudo ou email existant";
            mesg.classList.remove("invisible");
            mesg.classList.remove('alert-success');
            mesg.classList.add("mt-3");
            mesg.classList.add('alert-danger');
            break;
        case "OK-insc":
            mesg.innerHTML = "Inscription réussi ! Connecter vous avec votre email et mot de passe";
            mesg.classList.remove("invisible");
            mesg.classList.remove('alert-danger');
            mesg.classList.add("mt-3");
            mesg.classList.add('alert-success');
            break;

        default:
            break;
    }
}