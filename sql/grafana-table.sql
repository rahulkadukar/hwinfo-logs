-- Table: public."<table-name>"

-- DROP TABLE public."<table-name>";

CREATE TABLE public."<table-name>"
(
    "timestamp" timestamp without time zone,
    virtmem_used integer,
    virtmem_avail integer,
    physmem_used integer,
    physmem_avail integer,
    cpu0_temp integer,
    cpu1_temp integer,
    disk0_temp integer,
    disk1_temp integer,
    disk2_temp integer,
    disk3_temp integer,
    disk4_temp integer,
    disk5_temp integer,
    "disk0_hostReads" integer,
    "disk0_hostWrites" integer,
    "disk1_hostReads" integer,
    "disk1_hostWrites" integer,
    "disk2_hostReads" integer,
    "disk2_hostWrites" integer,
    "disk3_hostReads" integer,
    "disk3_hostWrites" integer,
    "disk4_hostReads" integer,
    "disk4_hostWrites" integer,
    "disk5_hostReads" integer,
    "disk5_hostWrites" integer,
    "disk0_hostReadMB" double precision,
    "disk0_hostWriteMB" double precision,
    "disk1_hostReadMB" double precision,
    "disk1_hostWriteMB" double precision,
    "disk2_hostReadMB" double precision,
    "disk2_hostWriteMB" double precision,
    "disk3_hostReadMB" double precision,
    "disk3_hostWriteMB" double precision,
    "disk4_hostReadMB" double precision,
    "disk4_hostWriteMB" double precision,
    "disk5_hostReadMB" double precision,
    "disk5_hostWriteMB" double precision

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."<table-name>"
    OWNER to <some-user>;

GRANT ALL ON TABLE public."<table-name>" TO <some-user>;

GRANT ALL ON TABLE public."<table-name>" TO <some-user>;
