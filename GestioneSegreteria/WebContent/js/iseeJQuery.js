function maschera(studente){
	svuota();	
	$("#selStudente").html("<h4>" + studente.matricola + " : " + studente.cognome + " : " + studente.nome + "</h4>");
	var numComponenti = $("#numComponenti");	
	var calcola = $("#calcolaISEE");	
	numComponenti.on("blur", aggiungiRedditoPatrimonio);
	calcola.on("click", calcolaISEE);
		
}

function aggiungiRedditoPatrimonio(){		
	var countComponenti = $("#numComponenti");	
	var valori = $("#valori");
	var parent = countComponenti.parent();	
	
	svuota();

	for (var i = 0; i < countComponenti.val(); i++){		
		var red = $("<div></div>");
		red.addClass("form-group");
		//red.attr("class", "form-group");
		red.html("<label>REDDITO del componente:</label> <input class='redditoComponente' type='text' class='form-control' /> ");
		
		var patr = $("<div></div>");
		patr.addClass("form-group");
		//patr.attr("class", "form-group");
		patr.html("<label>PATRIMONIO del componente:</label> <input class='patrimonioComponente' type='text' class='form-control' />");			
				
		valori.append(red);
		red.after(patr);
	}
}

function calcolaISEE(){		
	var numeroComponenti = $("#numComponenti").val();	
	var redditi = $(".redditoComponente");	
	var patrimoni = $(".patrimonioComponente");
	
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
		
	$("#ISR").text(ISR);
	$("#ISP").text(ISP);
	$("#ISE").text(ISE);
	$("#scalaEquivalenza").text(SE);
	$("#ISEE").text(ISEE);
}

function svuota(){
	$("#valori").empty();
	$("#ISR").text("");
	$("#ISP").text("");
	$("#ISE").text("");
	$("#scalaEquivalenza").text("");
	$("#ISEE").text("");	
}