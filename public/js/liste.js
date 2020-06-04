function effacer(compteur){
    console.log(compteur);
   
   confirm("Etes-vous sûr de vouloir supprimer cette tâche ? ") 

   if(true){
  
 	
 	 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
   
      console.log(this.responseText ) 

      var id = document.getElementById(compteur);
   		id.remove();
    }else{
    	alert("oups, une erreur c'est produite essayer ulterieurement");
    }
  };

  xhttp.open("POST", "../php/remove.php", true);
  xhttp.send();
   
   }else{

   }

} 