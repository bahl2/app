-- criação da tablespace e do usuário
create tablespace aulaTPTablespace
datafile   'D:\databases\Oracle\aulatptablespace.dbf' 
size 10m autoextend on next 10m maxsize 500m online permanent extent management local autoallocate segment space management auto;

create user aulaTP
identified by aulaTP
default tablespace aulaTPTablespace
temporary tablespace TEMP;

grant create session, connect, resource to aulaTP;

alter user aulaTP quota unlimited on aulaTPTablespace;

-- criação da tabela
CREATE TABLE PESSOA(COD_PESSOA INTEGER NOT NULL,
                        NOME VARCHAR2(50) NOT NULL,
						TELEFONE VARCHAR2(20) NOT NULL);

COMMENT ON COLUMN PESSOA.COD_PESSOA IS 'Código da pessoa.';
COMMENT ON COLUMN PESSOA.NOME IS 'Nome da pessoa.';
COMMENT ON COLUMN PESSOA.TELEFONE IS 'Telefone da pessoa.';

ALTER TABLE PESSOA ADD CONSTRAINT PESSOA_PK PRIMARY KEY(COD_PESSOA);

-- insere pessoas
insert into PESSOA values (1, 'ANA', '(19)1234-5678');
insert into PESSOA values (2, 'AMANDA', '(19)1234-5678');
insert into PESSOA values (3, 'BRUNO', '(19)1234-5678');
insert into PESSOA values (4, 'BRUNA', '(19)1234-5678');
insert into PESSOA values (5, 'CAMILA', '(19)1234-5678');
insert into PESSOA values (6, 'CAMILA SILVA', '(19)1234-5678');
insert into PESSOA values (7, 'FELIPE', '(19)1234-5678');
insert into PESSOA values (8, 'FERNANDO', '(19)1234-5678');
insert into PESSOA values (9, 'GABRIELA', '(19)1234-5678');
commit;