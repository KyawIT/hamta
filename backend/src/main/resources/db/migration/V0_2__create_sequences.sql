-- Hibernate Panache erwartet explizite Sequences für die ID-Generierung
-- (Increment 50 = Hibernate default für SequenceStyleGenerator mit PooledLoOptimizer)

CREATE SEQUENCE IF NOT EXISTS vorspeise_seq   START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS hauptspeise_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE IF NOT EXISTS nachspeise_seq  START WITH 1 INCREMENT BY 50;
