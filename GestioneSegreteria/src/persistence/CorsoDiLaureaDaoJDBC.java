package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import model.Corso;
import model.CorsoDiLaurea;
import persistence.dao.CorsoDiLaureaDao;


public class CorsoDiLaureaDaoJDBC implements CorsoDiLaureaDao {
	private DataSource dataSource;

	public CorsoDiLaureaDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public void save(CorsoDiLaurea corsoDiLaurea) {
		if ( (corsoDiLaurea.getCorsi() == null) 
				|| corsoDiLaurea.getCorsi().isEmpty()){
			throw new PersistenceException("Corso di laurea non memorizzato: un corso di laurea deve avere almeno un corso");
		}
		Connection connection = this.dataSource.getConnection();
		try {
			Long id = IdBroker.getId(connection);
			corsoDiLaurea.setCodice(id); 
			String insert = "insert into corsodilaurea(codice, nome, dipartimento) values (?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, corsoDiLaurea.getCodice());
			statement.setString(2, corsoDiLaurea.getNome());
			statement.setLong(3, corsoDiLaurea.getDipartimento().getCodice());

			//connection.setAutoCommit(false);
			//serve in caso gli studenti non siano stati salvati. Il DAO studente apre e chiude una transazione nuova.
			//connection.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);			
			statement.executeUpdate();
			
			// TODO LAVORARE SULLA TABELLA "AFFERISCE"
//			this.updateStudenti(corso, connection);
			//connection.commit();
		} catch (SQLException e) {
			if (connection != null) {
				try {
					connection.rollback();
				} catch(SQLException excep) {
					throw new PersistenceException(e.getMessage());
				}
			} 
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
	}

	@Override
	public CorsoDiLaurea findByPrimaryKey(Long codice) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CorsoDiLaurea> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void update(CorsoDiLaurea corsoDiLaurea) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(CorsoDiLaurea corsoDiLaurea) {
		// TODO Auto-generated method stub
		
	}  

//	private void updateStudenti(Corso corso, Connection connection) throws SQLException {
//		StudenteDao studenteDao = new StudenteDaoJDBC(dataSource);
//		for (Studente studente : corso.getStudenti()) {
//			if (studenteDao.findByPrimaryKey(studente.getMatricola()) == null){
//				studenteDao.save(studente);
//			}
//			String update = "update studente SET corso_codice = ? WHERE matricola = ?";
//			PreparedStatement statement = connection.prepareStatement(update);
//			statement.setLong(1, corso.getCodice());
//			statement.setString(2, studente.getMatricola());
//			int s=statement.executeUpdate();
//		}
//	}
//
//	private void removeForeignKeyFromStudente(Corso corso, Connection connection) throws SQLException {
//		for (Studente studente : corso.getStudenti()) {
//			String update = "update studente SET corso_codice = NULL WHERE matricola = ?";
//			PreparedStatement statement = connection.prepareStatement(update);
//			statement.setString(1, studente.getMatricola());
//			statement.executeUpdate();
//		}	
//	}
//
//	/* 
//	 * versione con Join
//	 */
//	public Corso findByPrimaryKeyJoin(Long id) {
//		Connection connection = this.dataSource.getConnection();
//		Corso corso = null;
//		try {
//			PreparedStatement statement;
//			String query = "select c.codice as c_codice, c.nome as c_nome, s.matricola as matricola, s.nome as nome, "
//					+ "s.cognome as cognome, s.data_nascita as data_nascita "
//					+ "from corso c left outer join studente s on c.codice=s.corso_codice "
//					+ "where g.nome = ?";
//			statement = connection.prepareStatement(query);
//			statement.setLong(1, id);
//			ResultSet result = statement.executeQuery();
//			boolean primaRiga = true;
//			while (result.next()) {
//				if (primaRiga) {
//					corso = new Corso();
//					corso.setCodice(result.getLong("c_codice"));				
//					corso.setNome(result.getString("c_nome"));
//					primaRiga = false;
//				}
//				if(result.getString("matricola")!=null){
//					Studente studente = new Studente();
//					studente.setMatricola(result.getString("matricola"));
//					studente.setNome(result.getString("nome"));
//					studente.setCognome(result.getString("cognome"));
//					long secs = result.getDate("data_nascita").getTime();
//					studente.setDataNascita(new java.util.Date(secs));
//					corso.addStudente(studente);
//				}
//			}
//		} catch (SQLException e) {
//			throw new PersistenceException(e.getMessage());
//		} finally {
//			try {
//				connection.close();
//			} catch (SQLException e) {
//				throw new PersistenceException(e.getMessage());
//			}
//		}	
//		return corso;
//	}



}
