# set up database tables using: ./migrate.sh
flyway -url="jdbc:postgresql://127.0.0.1/sc_database" -user="admin" -password="purplelobstermountain" -locations="filesystem:db/migrations/" migrate