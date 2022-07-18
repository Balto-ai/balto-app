\echo 'Delete and recreate balto database?'
\prompt 'Return for yes or control-C for cancel > ' answer

DROP DATABASE balto;
CREATE DATABASE balto;
\connect balto;

\i balto-schema.sql