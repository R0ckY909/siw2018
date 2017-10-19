package model;

import java.util.Set;

public class CorsoDiLaurea {
	private Long codice;
	private String nome;
	private Dipartimento dipartimento;
	private Set<Corso> corsi;
	
	public CorsoDiLaurea() {
	}
	
	public CorsoDiLaurea(String nome) {
		this.nome = nome;
	}
	
	public Long getCodice() {
		return codice;
	}
	public void setCodice(Long codice) {
		this.codice = codice;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Dipartimento getDipartimento() {
		return dipartimento;
	}
	public void setDipartimento(Dipartimento dipartimento) {
		this.dipartimento = dipartimento;
	}
	public Set<Corso> getCorsi() {
		return corsi;
	}
	public void setCorsi(Set<Corso> corsi) {
		this.corsi = corsi;
	}
	
}
