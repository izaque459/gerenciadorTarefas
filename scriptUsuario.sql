create user usuariobanco password '789A$ek' inherit LOGIN;

select * from pg_user;
-- cliquei na database DatabaseEleicao, on estao as tabelas criadas e usei 
-- Grant Wizard para das os privilegios insert, select, delete na tabela
-- e upgrade ao usuariobanco
SELECT  table_schema as schema, table_name as table, privilege_type as privilege
FROM   information_schema.table_privileges
WHERE  grantee = 'usuariobanco';