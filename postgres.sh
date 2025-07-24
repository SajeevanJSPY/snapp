# initialize a database cluster
initdb -D postgres -U snappadmin -W
# password: snapp

# start the server
pg_ctl start -D postgres -l logfile

# stop the server
pg_ctl stop -D postgres

# create a database
createdb snappdb -O snappadmin -U snappadmin

# interact with the postgres server via psql
psql -U snappadmin -d snappdb 
