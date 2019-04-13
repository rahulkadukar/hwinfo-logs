#! /bin/bash
<nodejs> /home/<user>/code/logs/hwinfo-logs/writeToDb.js && PGPASSWORD=<pgpassword> psql -U <pgusername> -d <pgdatabase> -f <pgsqlfile>
