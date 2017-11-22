function Studente(matricola, nome, cognome, dataNascita){
	this.matricola = matricola;
	this.nome = nome;
	this.cognome = cognome;
	this.dataNascita = dataNascita;
	
	this.info = function(){
		return this.matricola + ", " + this.nome + ", " + this.cognome + ", " + this.dataNascita;
	}
	
}

function proceduraCalcoloISEE(studente){
	alert("Inizio calcolo ISEE per lo studente " + studente.info());
	numeroComponenti = prompt("Inserisci il numero dei componenti del nucleo");
	componentiReddito = new Array();
	componentiPatrimonio = new Array();
	var i;
	for (i = 0; i < numeroComponenti; i++){
		componentiReddito[i] = prompt("Inserire il REDDITO del componente " + (i + 1));
		componentiPatrimonio[i] = prompt("Inserire il PATRIMONIO del componente " + (i + 1));
	}
	
	var redditoComplessivo = 0;
	var patrimonioComplessivo = 0;
	
	for (i = 0; i < numeroComponenti; i++){
		redditoComplessivo += componentiReddito[i];
		patrimonioComplessivo += componentiPatrimonio[i];
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
	
	/*
	var calcolaSE = function(numeroComponenti){
		var SE;
		//numeroComponenti = numeroComponenti * 1;
		switch (parseInt(numeroComponenti)){
		case 1:		
			SE = 1;		
			break;
		case 2:
			SE = 1.57;
			break;
		case 3:
			SE = 2,04;
			break;
		case 4:
			SE = 2.46;
			break;
		case 5:
			SE = 2.85;
			break;
		default:		
			SE = 2.85 + 0.2 * numeroComponenti;
		}
		return SE;
	};*/
	
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
	
	reportISEECalcolato = "Report ISEE calcolato:\n";
	reportISEECalcolato += "Numero componenti nucleo familiare: " + numeroComponenti + "\n";
	reportISEECalcolato += "Reddito complessivo nucleo familiare: " + redditoComplessivo + "\n";
	reportISEECalcolato += "Patrimonio complessivo nucleo familiare: " + patrimonioComplessivo + "\n";
	reportISEECalcolato += "Valore ISE: " + ISE + "\n";
	reportISEECalcolato += "Scala equivalenza applicata: " + SE + "\n";
	reportISEECalcolato += "Valore ISEE: " + ISEE + "\n";
	
	alert(reportISEECalcolato);
}

function ordinaStudenti(ordinaPer){	
	var studenteSection = $("#elencoStudenti");	
	var studentiTag = $("#elencoStudenti .studente");
	
	var studenti = new Array();	
	var lunghezza = studentiTag.length;
	for (var i = 0; i < lunghezza; i++){		
		var elementTd = studentiTag.first();				
		var element = elementTd.find("td").first();
		var matricola = element.text();			
		element = element.next();
		var nome = element.text();		
		element = element.next();
		var cognome = element.text();
		element = element.next();
		var datanascita = element.text();		
				
		var s = new Studente(matricola, nome, cognome, new Date(datanascita));
		
		studenti.push(s);		
		studentiTag = studentiTag.next();
	}
	
	
	//Bubble sort
	for (var i = 0; i < studenti.length - 1; i++){		
		for (var j = i + 1; j < studenti.length; j++){
			var temp;
			var scambia = false;
			switch (ordinaPer){			
			case "nome":
				if (studenti[i].nome > studenti[j].nome){
					scambia = true;
				}
				break;
			case "cognome":
				if (studenti[i].cognome > studenti[j].cognome){
					scambia = true;
				}
				break;
			case "dataNascita":
				if (studenti[i].dataNascita > studenti[j].dataNascita){
					scambia = true;
				}
				break;
			case "matricola":
			default:
				if (studenti[i].matricola > studenti[j].matricola){
					scambia = true;
				}
			}				
			if (scambia){
				temp = studenti[i];
				studenti[i] = studenti[j];
				studenti[j] = temp;
			}
		}
	}	
	studenteSection.empty();
	for (var i = 0; i < studenti.length; i++){			
		var alternate;
		if ((i % 2) == 0){
			alternate = "success";
		}else{
			alternate = "active";
		}		
		
		var riga = $("<tr></tr>");
		studenteSection.append(riga);	
		
		riga.addClass(alternate);
		riga.addClass("studente");				
				
		var col1 = $("<td>" + studenti[i].matricola + "</td>");
		riga.html(col1);		
		
		var col2 = $("<td>" + studenti[i].nome + "</td>");
		col1.after(col2);		
		
		var col3 = $("<td>" + studenti[i].cognome + "</td>");
		col2.after(col3);		
		
		var col4 = $("<td><time>" + studenti[i].dataNascita + "</time></td>");
		col3.after(col4);		 				
	}
}


