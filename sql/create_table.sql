CREATE SEQUENCE test.ts_task START WITH 1 INCREMENT BY 1;

CREATE TABLE test.tt_task (
	task_id BIGINT NOT NULL DEFAULT nextval('test.ts_task'),
	name VARCHAR(64) NOT NULL,
	description VARCHAR(128),
	CONSTRAINT tr_pk_tas PRIMARY KEY (task_id)
);