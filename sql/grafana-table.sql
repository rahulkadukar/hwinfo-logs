-- Table: public."<table-name>"

-- DROP TABLE public."<table-name>";

CREATE TABLE public."<table-name>"
(
    "timestamp" timestamp without time zone,
    virtmem_used integer,
    virtmem_avail integer,
    physmem_used integer,
    physmem_avail integer,
    disk0_temp integer,
    disk1_temp integer,
    disk2_temp integer,
    disk3_temp integer,
    disk4_temp integer,
    disk5_temp integer
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."<table-name>"
    OWNER to <some-user>;

GRANT ALL ON TABLE public."<table-name>" TO <some-user>;

GRANT ALL ON TABLE public."<table-name>" TO <some-user>;
