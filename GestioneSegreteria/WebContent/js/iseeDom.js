function maschera(studente){
	svuota();
	document.getElementById("selStudente").innerHTML = "<h4>" + studente.matricola + " : " + studente.cognome + " : " + studente.nome + "</h4>";
	var numComponenti = document.getElementById("numComponenti");	
	var calcola = document.getElementById("calcolaISEE");	
	numComponenti.addEventListener("blur", aggiungiRedditoPatrimonio);
	calcola.addEventListener("click", calcolaISEE);
		
}

function aggiungiRedditoPatrimonio(){	
	var countComponenti = document.getElementById("numComponenti");	
	var valori = document.getElementById("valori");
	var parent = countComponenti.parentElement;	
	
	svuota();
	
	for (var i = 0; i < countComponenti.value; i++){		
		var red = document.createElement("div");		
		red.setAttribute("class", "form-group");
		red.innerHTML = "<label>REDDITO del componente:</label> <input class='redditoComponente' type='text' class='form-control' /> ";
		
		var patr = document.createElement("div");
		patr.setAttribute("class", "form-group");
		patr.innerHTML = "<label>PATRIMONIO del componente:</label> <input class='patrimonioComponente' type='text' class='form-control' />";			
				
		valori.appendChild(red);
		valori.insertBefore(patr, red.nextSibling);
	}
}

function calcolaISEE(){		
	var numeroComponenti = parseInt(document.getElementById("numComponenti").value);	
	var redditi = document.getElementsByClassName("redditoComponente");	
	var patrimoni = document.getElementsByClassName("patrimonioComponente");
	
	var redditoComplessivo = 0;
	var patrimonioComplessivo = 0;		
		
	for (var i = 0; i < redditi.length; i++){	
		redditoComplessivo += parseInt(redditi[i].value);				
		patrimonioComplessivo += parseInt(patrimoni[i].value);
	}
	ISR = redditoComplessivo;		
	ISP = patrimonioComplessivo;
	
	ISE = ISR + ISP * 20/100;
	
	scaleEquivalenza = 
	{
		"1" : 1,
		"2" : 1.57,
		"3" : 2.04,
		"4" : 2.46,
		"5" : 2.85
	};
				
	var calcolaSE = function(numeroComponenti){
		var SE;
		if (numeroComponenti <= 5){
			SE = scaleEquivalenza[numeroComponenti];
		}else{
			SE = 2.85 + 0.2 * numeroComponenti;
		}
			
		return SE;
	};
	
		
	SE = calcolaSE(numeroComponenti);
	
	ISEE = ISE / SE;
		
	document.getElementById("ISR").innerHTML = ISR;
	document.getElementById("ISP").innerHTML = ISP;
	document.getElementById("ISE").innerHTML = ISE;
	document.getElementById("scalaEquivalenza").innerHTML = SE;
	document.getElementById("ISEE").innerHTML = ISEE;	
}

function svuota(){
	var valori = document.getElementById("valori");
	while (valori.firstChild) {
		valori.removeChild(valori.firstChild);
	}	
	document.getElementById("ISR").innerHTML = "";
	document.getElementById("ISP").innerHTML = "";
	document.getElementById("ISE").innerHTML = "";
	document.getElementById("scalaEquivalenza").innerHTML = "";
	document.getElementById("ISEE").innerHTML = "";
}